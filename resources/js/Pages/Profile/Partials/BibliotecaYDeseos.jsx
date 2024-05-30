import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react';
import FotoPerfil from './FotoPerfil';


const BooksToShare = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`/profile/books-to-share`);
                setBooks(response.data);
            } catch (error) {
                setError('No se han encontrado libros.');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="max-h-40 overflow-y-auto">
            {books.length === 0 ? (
                <p>No tienes libros registrados para compartir.</p>
            ) : (
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            
                            <Link href={route('books.show', book.id)} className="text-black hover:text-gray-600 flex">
                                <div className=' w-6 m-2'>
                                    <FotoPerfil fotoId={book.foto}/>
                                </div>
                                <div>
                                    <h5 className='font-bold text-sm mt-2'>{book.titulo}</h5>
                                    <p className='text-xs'>{book.autor}</p>
                                </div>
                                
                            </Link>
                            
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const WishList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWishList = async () => {
            try {
                const response = await axios.get(`/profile/wish-list`);
                setBooks(response.data);
            } catch (error) {
                setError('No tienes libros en tu lista de deseos.');
            } finally {
                setLoading(false);
            }
        };

        fetchWishList();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="max-h-40 overflow-y-auto">
            {books.length === 0 ? (
                <p>No tienes libros en tu lista de deseos.</p>
            ) : (
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            <Link href={route('books.show', book.id)} className="text-black hover:text-gray-600 flex">
                                <div className=' w-6 m-2'>
                                    <FotoPerfil fotoId={book.foto}/>
                                </div>
                                <div>
                                    <h5 className='font-bold text-sm mt-2'>{book.titulo}</h5>
                                    <p className='text-xs'>{book.autor}</p>
                                </div>
                                
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export {BooksToShare, WishList};
