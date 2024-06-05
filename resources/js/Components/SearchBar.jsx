import React from 'react';
import { useForm } from '@inertiajs/react';

export default function SearchBar() {
    const { data, setData, get } = useForm({ query: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route('search'));
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center w-full md:max-w-md lg:max-w-lg">
            <input
                type="text"
                value={data.query}
                onChange={(e) => setData('query', e.target.value)}
                placeholder="Buscar..."
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
        </form>
    );
}
