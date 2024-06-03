import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ auth, book, idiomas, categorias, generos, tematicas }) {
    const { data, setData, put, processing, errors } = useForm({
        titulo: book?.titulo || '',
        autor: book?.autor || '',
        descripcion: book?.descripcion || '',
        foto: null,
        idioma_id: book?.idiomas?.[0]?.id || '',
        categoria_id: book?.categorias?.[0]?.id || '',
        genero_id: book?.generos?.[0]?.id || '',
        tematica_id: book?.tematicas?.[0]?.id || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('books.update', book.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Editar Libro" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Editar libro</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md" encType="multipart/form-data">
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
                        <label htmlFor="autor" className="block text-gray-700">Autor</label>
                        <input
                            id="autor"
                            type="text"
                            value={data.autor}
                            onChange={(e) => setData('autor', e.target.value)}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                        />
                        {errors.autor && <span className="text-red-600">{errors.autor}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="descripcion" className="block text-gray-700">Descripción</label>
                        <textarea
                            id="descripcion"
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                            rows="5"
                        ></textarea>
                        {errors.descripcion && <span className="text-red-600">{errors.descripcion}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="foto" className="block text-gray-700">Foto</label>
                        <input
                            id="foto"
                            type="file"
                            onChange={(e) => setData('foto', e.target.files[0] || null)}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                        />
                                                {errors.foto && <span className="text-red-600">{errors.foto}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="idioma_id" className="block text-gray-700">Idioma</label>
                        <select
                            id="idioma_id"
                            value={data.idioma_id}
                            onChange={(e) => setData('idioma_id', e.target.value)}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Selecciona un idioma</option>
                            {idiomas.map((idioma) => (
                                <option key={idioma.id} value={idioma.id}>{idioma.idioma}</option>
                            ))}
                        </select>
                        {errors.idioma_id && <span className="text-red-600">{errors.idioma_id}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="categoria_id" className="block text-gray-700">Categoría</label>
                        <select
                            id="categoria_id"
                            value={data.categoria_id}
                            onChange={(e) => setData('categoria_id', e.target.value)}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Selecciona una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>{categoria.categoria}</option>
                            ))}
                        </select>
                        {errors.categoria_id && <span className="text-red-600">{errors.categoria_id}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="genero_id" className="block text-gray-700">Género</label>
                        <select
                            id="genero_id"
                            value={data.genero_id}
                            onChange={(e) => setData('genero_id', e.target.value)}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Selecciona un género</option>
                            {generos.map((genero) => (
                                <option key={genero.id} value={genero.id}>{genero.genero}</option>
                            ))}
                        </select>
                        {errors.genero_id && <span className="text-red-600">{errors.genero_id}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="tematica_id" className="block text-gray-700">Temática</label>
                        <select
                            id="tematica_id"
                            value={data.tematica_id}
                            onChange={(e) => setData('tematica_id', e.target.value)}
                            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Selecciona una temática</option>
                            {tematicas.map((tematica) => (
                                <option key={tematica.id} value={tematica.id}>{tematica.tematica}</option>
                            ))}
                        </select>
                        {errors.tematica_id && <span className="text-red-600">{errors.tematica_id}</span>}
                    </div>
                    <div className="text-right">
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

