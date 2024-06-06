import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Rejected({ auth, rejectedLoans }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Solicitudes de Préstamo Rechazadas" />
            <div className="container mx-auto px-4 pt-10">
                <h1 className="text-2xl font-bold mb-6">Solicitudes de Préstamo Rechazadas</h1>
                {rejectedLoans.length > 0 ? (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <ul className="divide-y divide-gray-200">
                            {rejectedLoans.map((loan) => (
                                <li key={loan.id} className="px-4 py-4 sm:px-6">
                                    <div>
                                        <p className="text-lg font-medium text-gray-900">{loan.book.titulo}</p>
                                        <p className="text-sm text-gray-600">Solicitante: {loan.borrower.name}</p>
                                        <p className="text-sm text-gray-600">Fecha de rechazo: {loan.rejected_at}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No hay solicitudes de préstamo rechazadas.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
