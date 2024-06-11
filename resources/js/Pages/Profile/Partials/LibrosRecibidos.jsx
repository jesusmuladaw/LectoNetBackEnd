import React from 'react';
import { usePage } from '@inertiajs/react';

export default function LibrosRecibidos({ userId }) {
    const { librosRecibidos } = usePage().props;

    return (
        <div>
            {librosRecibidos.length > 0 ? (
                <ul>
                    {librosRecibidos.map((book) => (
                        <li key={book.id}>{book.titulo}</li>
                    ))}
                </ul>
            ) : (
                <p>No has recibido libros.</p>
            )}
        </div>
    );
}