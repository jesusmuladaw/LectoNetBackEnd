import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import Heart from 'react-animated-heart';
import FotoLibro from "@/Components/FotoLibro";

export default function Show({ auth, mustVerifyEmail, status, book, reading_status, ownership_status }) {
    const [isLiked, setIsLiked] = useState(book.liked);
    const [readingStatus, setReadingStatus] = useState(reading_status);
    const [ownershipStatus, setOwnershipStatus] = useState(ownership_status);
    const [usersSharing, setUsersSharing] = useState([]);

    useEffect(() => {
        axios.get(`/books/${book.id}/users-sharing`)
            .then((response) => {
                setUsersSharing(response.data);
            })
            .catch((error) => {
                console.error('Error fetching users sharing the book', error);
            });
    }, [book.id]);

    const handleLike = async () => {
        try {
            if (isLiked) {
                await axios.post(`/books/${book.id}/unlike`);
            } else {
                await axios.post(`/books/${book.id}/like`);
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.error('Error liking/unliking the book', error);
        }
    };

    const handleReadingStatusChange = async (estado) => {
        try {
            await axios.post(`/books/${book.id}/reading-status/${estado}`);
            setReadingStatus(estado);
        } catch (error) {
            console.error(`Error changing reading status to ${estado}`, error);
        }
    };

    const handleOwnershipStatusChange = async (estado) => {
        try {
            await axios.post(`/books/${book.id}/ownership-status/${estado}`);
            setOwnershipStatus(estado);
        } catch (error) {
            console.error(`Error changing ownership status to ${estado}`, error);
        }
    };

    const handleButtonClick = () => {
        if (ownershipStatus === 'compartir') {
            handleOwnershipStatusChange('none');
        } else {
            handleOwnershipStatusChange('compartir');
        }
    };

    const handleRequestBook = async (lenderId) => {
        try {
            await axios.post(`/books/${book.id}/request-loan`, { lender_id: lenderId });
            alert('La solicitud de préstamo ha sido enviada.');
        } catch (error) {
            console.error('Error requesting the book', error);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={book.titulo} />
            <div className="container mx-auto px-4 pt-10">
                <div className="bg-white rounded-lg shadow p-6 flex flex-wrap md:flex-nowrap">
                    <div className="w-full md:w-1/3 flex flex-col items-center">
                        <div className="rounded-lg overflow-hidden w-48 h-auto my-5">
                            <FotoLibro fotoId={book.foto}/>
                        </div>
                        <div className="text-center">
                            <Heart isClick={isLiked} onClick={handleLike} />
                            <p className="mt-2 mb-4">{book.likes_count} {book.likes_count === 1 ? 'persona le gusta este libro' : 'personas les gusta este libro'}</p>
                            <button onClick={() => window.history.back()} className="text-blue-500 hover:text-blue-900">Volver</button>
                        </div>
                    </div>
                    <div className="w-full md:w-2/3 md:pl-6 mt-6 md:mt-0">
                        <h1 className="font-bold text-xl mb-4">{book.titulo}</h1>
                        <p className="mb-2"><strong>Autor:</strong> {book.autor}</p>
                        <p className="mb-4"><strong>Descripción:</strong> {book.descripcion}</p>
                        <div className="flex gap-6 flex-wrap">
                            <div className="mb-4">
                                <p><strong>Idioma:</strong></p>
                                <ul>
                                    {book.idiomas?.length > 0 ? (
                                        book.idiomas.map((idioma) => (
                                            <li key={idioma.id}>{idioma.idioma}</li>
                                        ))
                                    ) : (
                                        <li>No hay idiomas disponibles</li>
                                    )}
                                </ul>
                            </div>
                            <div className="mb-4">
                                <p><strong>Temáticas:</strong></p>
                                <ul>
                                    {book.tematicas?.length > 0 ? (
                                        book.tematicas.map((tematica) => (
                                            <li key={tematica.id}>{tematica.tematica}</li>
                                        ))
                                    ) : (
                                        <li>No hay temáticas disponibles</li>
                                    )}
                                </ul>
                            </div>
                            <div className="mb-4">
                                <p><strong>Categorías:</strong></p>
                                <ul>
                                    {book.categorias?.length > 0 ? (
                                        book.categorias.map((categoria) => (
                                            <li key={categoria.id}>{categoria.categoria}</li>
                                        ))
                                    ) : (
                                        <li>No hay categorías disponibles</li>
                                    )}
                                </ul>
                            </div>
                            <div className="mb-4">
                                <p><strong>Géneros:</strong></p>
                                <ul>
                                    {book.generos?.length > 0 ? (
                                        book.generos.map((genero) => (
                                            <li key={genero.id}>{genero.genero}</li>
                                        ))
                                    ) : (
                                        <li>No hay géneros disponibles</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        
                        <div className="mt-4">
                            <select value={readingStatus} onChange={(e) => handleReadingStatusChange(e.target.value)} className="text-blue-500 hover:text-blue-900 mr-2">
                                <option value="">Seleccionar estado</option>
                                <option value="leido">Leído</option>
                                <option value="leyendo">Leyendo</option>
                                <option value="leer">Añadir a deseos</option>
                            </select>
                            
                            <button
                                onClick={handleButtonClick}
                                className={`text-white px-4 py-2 rounded ${ownershipStatus === 'compartir' ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'}`}
                            >
                                {ownershipStatus === 'compartir' ? 'Quitar de mi biblioteca' : 'Añadir a mi biblioteca'}
                            </button>
                            
                        </div>
                        
                        <div className="mt-4">
                            <h2 className="font-bold text-lg">Usuarios que comparten este libro:</h2>
                            <ul>
                                {usersSharing.length > 0 ? (
                                    usersSharing.map((user) => (
                                        <li key={user.id} className="flex items-center justify-between mb-2">
                                            <Link href={`/profile/${user.id}`} className="text-blue-500 hover:underline mr-2">{user.name}</Link>
                                            <button onClick={() => handleRequestBook(user.id)} className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700">Pedir libro</button>
                                        </li>
                                    ))
                                ) : (
                                    <li>No hay usuarios compartiendo este libro</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
