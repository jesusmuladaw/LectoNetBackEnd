import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Approved({ auth, approvedLoans }) {
    const { post } = useForm();

    const handleConfirmReturn = (loanId) => {
        post(route('loan-confirm-return', { loan: loanId }));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Solicitudes de Préstamo Aprobadas" />
            <div className="container mx-auto px-4 pt-10">
                <h1 className="text-2xl font-bold mb-6">Solicitudes de Préstamo Aprobadas</h1>
                {approvedLoans.length > 0 ? (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <ul className="divide-y divide-gray-200">
                            {approvedLoans.map((loan) => (
                                <li key={loan.id} className="px-4 py-4 sm:px-6 flex justify-between items-center">
                                    <div>
                                        <p className="text-lg font-medium text-gray-900">{loan.book.titulo}</p>
                                        <p className="text-sm text-gray-600">Solicitante: {loan.borrower.name}</p>
                                        <p className="text-sm text-gray-600">Fecha de aprobación: {loan.approved_at}</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleConfirmReturn(loan.id)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Confirmar Devolución
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No hay solicitudes de préstamo aprobadas.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
