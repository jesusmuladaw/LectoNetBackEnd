import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Requests({ auth, loanRequests }) {
    const { post } = useForm();

    const handleApprove = (loanId) => {
        post(route('loan-approve', { loan: loanId }));
    };

    const handleReject = (loanId) => {
        post(route('loan-reject', { loan: loanId }));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Solicitudes de Préstamo" />
            <div className="container mx-auto px-4 pt-10">
                <h1 className="text-2xl font-bold mb-6">Solicitudes de Préstamo</h1>
                {loanRequests.length > 0 ? (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <ul className="divide-y divide-gray-200">
                            {loanRequests.map((loan) => (
                                <li key={loan.id} className="px-4 py-4 sm:px-6 flex justify-between items-center">
                                    <div>
                                        <p className="text-lg font-medium text-gray-900">{loan.book.titulo}</p>
                                        <p className="text-sm text-gray-600">Solicitante: {loan.borrower.name}</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleApprove(loan.id)}
                                            className="text-green-600 hover:text-green-900"
                                        >
                                            Aprobar
                                        </button>
                                        <button
                                            onClick={() => handleReject(loan.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Rechazar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No tienes solicitudes de préstamo pendientes.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
