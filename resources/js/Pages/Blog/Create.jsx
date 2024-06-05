import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'POST',
        titulo: '',
        contenido: '',
        foto: null
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('blog.store'), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Crear publicación" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-center md:text-left">Crear nueva publicación</h1>
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
                    <div className="text-center md:text-left">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
