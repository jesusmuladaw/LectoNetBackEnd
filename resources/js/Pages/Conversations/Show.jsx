import React, { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

export default function Show({ messages, receiver }) {
    const { auth } = usePage().props;
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState(messages);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.Pusher = Pusher;

        window.Echo = new Echo({
            broadcaster: 'pusher',
            key: import.meta.env.VITE_PUSHER_APP_KEY,
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            forceTLS: true
        });

        window.Echo.private(`messages.${auth.user.id}`)
            .listen('MessageSent', (e) => {
                setMessageList((prevMessages) => [...prevMessages, e.message]);
            });

        return () => {
            window.Echo.leave(`messages.${auth.user.id}`);
        };
    }, [auth.user.id]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/messages', { receiver_id: receiver.id, message });
            setMessage('');
            setMessageList((prevMessages) => [...prevMessages, response.data]);
            setLoading(false);
        } catch (error) {
            console.error("There was an error sending the message!", error);
            setError("There was an error sending the message!");
            setLoading(false);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold mb-6">Conversación con {receiver.name}</h1>
                <div className="w-full bg-white rounded shadow p-4 mb-4">
                    {messageList.length === 0 ? (
                        <div>No messages yet.</div>
                    ) : (
                        messageList.map((msg) => (
                            <div key={msg.id} className={`mb-2 p-2 rounded ${msg.sender_id === auth.user.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                <strong>{msg.sender_id === auth.user.id ? 'You' : receiver.name}</strong>: {msg.message}
                            </div>
                        ))
                    )}
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSendMessage} className="w-full flex">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2 border rounded-l"
                        required
                        disabled={loading}
                    />
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded-r" disabled={loading}>
                        {loading ? 'Enviando...' : 'Enviar'}
                    </button>
                </form>
                <button
                    onClick={() => window.history.back()}
                    className="mt-4 p-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                    Volver
                </button>
            </div>
        </AuthenticatedLayout>
    );
}
