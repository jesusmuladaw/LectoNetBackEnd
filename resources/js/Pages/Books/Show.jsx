import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import Heart from 'react-animated-heart';
import FotoLibro from "@/Components/FotoLibro";

export default function Show({ auth, mustVerifyEmail, status, book, reading_status, ownership_status }) {
    const [isLiked, setIsLiked] = useState(book.liked);
    const [readingStatus, setReadingStatus] = useState(reading_status);
    const [ownershipStatus, setOwnershipStatus] = useState(ownership_status);

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
                            <select value={ownershipStatus} onChange={(e) => handleOwnershipStatusChange(e.target.value)} className="text-blue-500 hover:text-blue-900">
                                <option value="">Seleccionar estado de propiedad</option>
                                <option value="compartir">Compartir</option>
                                <option value="prestado">Prestado</option>
                                <option value="recibido">Recibido</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
