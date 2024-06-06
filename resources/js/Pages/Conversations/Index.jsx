import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Conversations({ conversations }) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold mb-6">Mis Conversaciones</h1>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <ul className="divide-y divide-gray-200">
                        {Object.keys(conversations).map((key) => (
                            <li key={key} className="px-4 py-4 sm:px-6">
                                <Link href={`/messages/${key}`} className="text-blue-500 hover:underline">
                                    Conversación con {conversations[key][0].sender_id === auth.user.id ? conversations[key][0].receiver.name : conversations[key][0].sender.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
