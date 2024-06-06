import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const LoanIndex = ({auth}) => {
    const { loans } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold mb-6">Préstamos</h1>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <ul className="divide-y divide-gray-200">
                        {loans.map((loan) => (
                            <li key={loan.id} className="px-4 py-4 sm:px-6">
                                <Link href={route('loans.show', loan.id)} className="text-blue-500 hover:underline">
                                    Préstamo de {loan.book.titulo} por {loan.lender.name} a {loan.borrower.name} {loan.is_confirmed ? '(Confirmado)' : '(Pendiente de confirmación)'}
                                </Link>
                                {!loan.is_confirmed && loan.lender_id === auth.user.id && (
                                    <form onSubmit={(e) => { e.preventDefault(); Inertia.post(route('loans.confirm', loan.id)); }}>
                                        <button type="submit" className="ml-4 px-4 py-2 bg-green-500 text-white rounded">Confirmar Préstamo</button>
                                    </form>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default LoanIndex;
