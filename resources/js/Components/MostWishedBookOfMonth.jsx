import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FotoLibro from './FotoLibro';
import { Link } from '@inertiajs/react';

const MostWishedBookOfMonth = () => {
    const [book, setBook] = useState(null);
    const [wishCount, setWishCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMostWishedBook = async () => {
            try {
                const response = await axios.get('/api/most-wished-book');
                setBook(response.data.book);
                setWishCount(response.data.wishCount);
            } catch (error) {
                setError('Error al cargar los datos del libro más deseado.');
            } finally {
                setLoading(false);
            }
        };

        fetchMostWishedBook();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-sm font-bold mb-2">Libro más deseado del mes</h2>
            {book ? (
                <>
                    <div className='flex'>
                        {book.foto ? (
                                <div className=' w-20 h-auto'>
                                    <Link href={route('books.show', book.id)}><FotoLibro fotoId={book.foto}/></Link>
                                </div>
                            ) : (
                                <>
                                    <Link href={route('books.show', book.id)}><h3 className="text-sm font-semibold">{book.titulo}</h3></Link>
                                    <p className='text-sm'>{book.autor}</p>
                                </>
                            )}
                        <p className="mt-2 text-sm">¡Hay {wishCount} personas deseando leerlo!</p>
                    </div>
                    <Link href={route('blog.create')} className='text-sm text-blue-500 hover:underline'>¿Lo conocías? ¡Cuéntanos!</Link>
                </>
                
            ) : (
                <p>No hay datos disponibles.</p>
            )}
        </div>
    );
};

export default MostWishedBookOfMonth;
