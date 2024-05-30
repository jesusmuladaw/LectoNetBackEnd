import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('/messages');
                setMessages(response.data);
            } catch (error) {
                setError('Error al cargar los mensajes.');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="max-h-60 overflow-y-auto">
            {messages.length === 0 ? (
                <p>No tienes mensajes.</p>
            ) : (
                <ul>
                    {messages.map((message) => (
                        <li key={message.id} className="p-2 border-b">
                            <strong>{message.sender.name}:</strong>
                            <p>{message.message}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MessageList;