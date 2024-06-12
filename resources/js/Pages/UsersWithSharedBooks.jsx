
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function UsersWithSharedBooks({ auth }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users/near-you');
                setUsers(response.data);
            } catch (error) {
                setError('Error al cargar los usuarios.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Usuarios con libros que te interesan" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Usuarios con libros que te interesan</h1>
                {users.length > 0 ? (
                    <ul className="space-y-4">
                        {users.map(user => (
                            <li key={user.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold">{user.name} {user.apellidos}</h2>
                                </div>
                                <Link href={route('profile.show', user.id)} className="text-blue-500 hover:underline">Ver perfil</Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay usuarios compartiendo libros que te interesen.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
