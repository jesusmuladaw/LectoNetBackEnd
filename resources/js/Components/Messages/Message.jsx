import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Messages = ({ receiverId, receiverName }) => {
    const { auth } = usePage().props;
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`/messages?receiver_id=${receiverId}`)
            .then((response) => {
                setMessageList(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.response ? error.response.data.error : "Error loading messages");
                setLoading(false);
            });

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
    }, [receiverId, auth.user.id]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        axios.post('/messages', { receiver_id: receiverId, message })
            .then((response) => {
                setMessage('');
                setMessageList((prevMessages) => [...prevMessages, response.data]);
            })
            .catch((error) => {
                console.error("There was an error sending the message!", error);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full p-4">
                <h2 className="text-2xl font-bold mb-4">Conversación con {receiverName}</h2>
                <div className="w-full bg-white rounded shadow p-4 mb-4">
                    {messageList.length === 0 ? (
                        <div>No messages yet.</div>
                    ) : (
                        messageList.map((msg) => (
                            <div key={msg.id} className={`mb-2 p-2 rounded ${msg.sender_id === auth.user.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                <strong>{msg.sender_id === auth.user.id ? 'You' : receiverName}</strong>: {msg.message}
                            </div>
                        ))
                    )}
                </div>
                <form onSubmit={handleSendMessage} className="w-full flex">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2 border rounded-l"
                        required
                    />
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded-r">Enviar</button>
                </form>
                
            </div>
        </>
    );
};

export default Messages;
