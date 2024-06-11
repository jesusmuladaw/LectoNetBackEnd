import React from 'react';

export default function LibrosPrestados({ librosPrestados }) {
    return (
        <div>
            {librosPrestados.length > 0 ? (
                <ul>
                    {librosPrestados.map((book) => (
                        <li key={book.id}>{book.titulo}</li>
                    ))}
                </ul>
            ) : (
                <p>No tienes libros prestados.</p>
            )}
        </div>
    );
}
