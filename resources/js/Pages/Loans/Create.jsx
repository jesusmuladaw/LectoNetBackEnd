import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function LoanForm({auth}) {
    const { books, users } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        book_id: '',
        due_date: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('loans.request'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold mb-6">Solicitar Préstamo</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded">
                    <div className="mb-4">
                        <label className="block text-gray-700">Libro</label>
                        <select
                            value={data.book_id}
                            onChange={(e) => setData('book_id', e.target.value)}
                            className="form-select mt-1 block w-full"
                        >
                            <option value="">Seleccione un libro</option>
                            {books.map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.titulo}
                                </option>
                            ))}
                        </select>
                        {errors.book_id && <div className="text-red-500">{errors.book_id}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Fecha de Devolución</label>
                        <input
                            type="date"
                            value={data.due_date}
                            onChange={(e) => setData('due_date', e.target.value)}
                            className="form-input mt-1 block w-full"
                        />
                        {errors.due_date && <div className="text-red-500">{errors.due_date}</div>}
                    </div>

                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            disabled={processing}
                        >
                            Solicitar Préstamo
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
