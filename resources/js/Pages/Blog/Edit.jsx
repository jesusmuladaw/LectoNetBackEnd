import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import FotoPost from '@/Components/FotoPost';


export default function Edit({ auth, post }) {
    const { data, setData, put, processing, errors } = useForm({
        titulo: post.titulo,
        contenido: post.contenido,
        foto: null,
        remove_image: false
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('blog.update', post.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Editar publicación" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-center md:text-left">Editar publicación</h1>
                <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow-md" encType="multipart/form-data">
                    <div className="mb-4">
                        <label htmlFor="titulo" className="block text-gray-700">Título</label>
                        <input
                            id="titulo"
                            type="text"
                            value={data.titulo}
                            onChange={(e) => setData('titulo', e.target.value)}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                        />
                        {errors.titulo && <span className="text-red-600">{errors.titulo}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contenido" className="block text-gray-700">Contenido</label>
                        <textarea
                            id="contenido"
                            value={data.contenido}
                            onChange={(e) => setData('contenido', e.target.value)}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                            rows="10"
                        ></textarea>
                        {errors.contenido && <span className="text-red-600">{errors.contenido}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="foto" className="block text-gray-700">Imagen</label>
                        <input
                            id="foto"
                            type="file"
                            onChange={(e) => setData('foto', e.target.files[0])}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                        />
                        {errors.foto && <span className="text-red-600">{errors.foto}</span>}
                    </div>
                    {post.foto && (
                        <div className="mb-4">
                            <div className="w-full md:w-8/12 h-auto mb-4">
                                <FotoPost fotoId={post.foto}/>
                            </div>
                            
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.remove_image}
                                    onChange={(e) => setData('remove_image', e.target.checked)}
                                />
                                <span className="ml-2">Eliminar imagen actual</span>
                            </label>
                        </div>
                    )}
                    <div className="text-center md:text-left">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Actualizar
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
