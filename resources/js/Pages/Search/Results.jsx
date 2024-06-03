import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Results({ auth, query, users, books }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Resultados de búsqueda para "${query}"`} />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Resultados de búsqueda para "{query}"</h1>
                
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Usuarios</h2>
                    {users.length > 0 ? (
                        <ul>
                            {users.map(user => (
                                <li key={user.id} className="mb-2">
                                    <Link href={route('profile.show', user.id)} className="text-blue-500 hover:underline">
                                        {user.name} {user.apellidos}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No se encontraron usuarios.</p>
                    )}
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Libros</h2>
                    {books.length > 0 ? (
                        <ul>
                            {books.map(book => (
                                <li key={book.id} className="mb-2">
                                    <Link href={route('books.show', book.id)} className="text-blue-500 hover:underline">
                                        {book.titulo} por {book.autor}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No se encontraron libros.</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
