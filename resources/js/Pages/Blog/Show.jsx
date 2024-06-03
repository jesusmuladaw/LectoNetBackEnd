import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FotoPost from '@/Components/FotoPost';

export default function Show({ auth, post }) {
    const { data, setData, post: storeComment, processing, errors, reset } = useForm({
        contenido: ''
    });

    const [showCommentForm, setShowCommentForm] = useState(false);

    const submitComment = (e) => {
        e.preventDefault();
        storeComment(route('comments.store', post.id), {
            onSuccess: () => {
                reset('contenido');
                setShowCommentForm(false);
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={post.titulo} />
            <div className="container mx-auto p-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4 text-center md:text-left">{post.titulo}</h1>
                    {post.foto && (
                        <div className="w-full md:w-8/12 mx-auto mb-4">
                            <FotoPost fotoId={post.foto} />
                        </div>
                    )}
                    <p className="mb-4">{post.contenido}</p>
                    <div className="text-center md:text-left flex flex-col space-y-2">
                        <Link href={route('blog.index')} className="text-blue-500 hover:underline">Volver al blog</Link>
                        {auth.user.id === post.user_id && (
                            <Link href={route('blog.edit', post.id)} className="text-blue-500 hover:underline">Editar</Link>
                        )}
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h2 className="text-xl font-bold mb-4">Comentarios</h2>
                    <div className="text-right mb-4">
                        <button
                            onClick={() => setShowCommentForm(!showCommentForm)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            {showCommentForm ? 'Cancelar' : 'Comentar'}
                        </button>
                    </div>
                    {showCommentForm && (
                        <form onSubmit={submitComment} className="mb-4">
                            <textarea
                                id="contenido"
                                value={data.contenido}
                                onChange={(e) => setData('contenido', e.target.value)}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                                rows="4"
                                placeholder="Deja tu comentario aquí..."
                            ></textarea>
                            {errors.contenido && <span className="text-red-600">{errors.contenido}</span>}
                            <div className="text-right">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Comentar
                                </button>
                            </div>
                        </form>
                    )}
                    {post.comments.map((comment) => (
                        <div key={comment.id} className="mb-4">
                            <div className="bg-gray-100 p-4 rounded-md">
                                <div className="flex items-center mb-2">
                                    <div className="font-bold">{comment.user.name}</div>
                                    <div className="ml-2 text-sm text-gray-600">{new Date(comment.created_at).toLocaleString()}</div>
                                </div>
                                <p>{comment.contenido}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
