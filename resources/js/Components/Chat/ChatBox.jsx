import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const ChatBox = ({ receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchMessages();

//        const interval = setInterval(fetchMessages, 5000); // Consider removing this if using WebSockets
        return () => clearInterval(interval);
    }, [receiverId]);

    useEffect(() => {
        const echo = new Echo({
            broadcaster: 'pusher',
            key: process.env.REACT_APP_PUSHER_KEY,
            cluster: process.env.REACT_APP_PUSHER_CLUSTER,
            forceTLS: true,
        });

        echo.private(`chat.${receiverId}`)
            .listen('MessageSent', (e) => {
                setMessages((prevMessages) => [...prevMessages, e.message]);
                scrollToBottom();
            });

        return () => {
            echo.disconnect();
        };
    }, [receiverId]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`/messages?receiver_id=${receiverId}`);
            setMessages(response.data);
            scrollToBottom();
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === '' || !receiverId) return;

        try {
            const response = await axios.post('/messages', {
                receiver_id: receiverId,
                message: newMessage,
            });
            setMessages([...messages, response.data]);
            setNewMessage('');
            scrollToBottom();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message) => (
                    <div key={message.id} className={`mb-2 ${message.sender_id === auth.user.id ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-2 rounded ${message.sender_id === auth.user.id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                            {message.message}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef}></div>
            </div>
            <div className="p-4">
                <textarea
                    className="w-full p-2 border rounded"
                    rows="3"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleSendMessage}
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
