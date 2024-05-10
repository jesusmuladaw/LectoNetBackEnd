import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Explorar({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Explorar" />

            <div className="py-5">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-200 border-b border-gray-400 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Hay X personas con libros que te interesan ¡Contacta con ellas!</div>
                    </div>
                    <div className="flex justify-center items-center h-screen">
                        <div className="w-full md:w-3/4 lg:w-1/2 xl:w-2/3 px-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-200 p-4 rounded-lg">
                                    Contenido 1
                                </div>
                                <div className="bg-gray-200 p-4 rounded-lg">
                                    Contenido 2
                                </div>
                                <div className="bg-gray-200 p-4 rounded-lg">
                                    Contenido 3
                                </div>
                                <div className="bg-gray-200 p-4 rounded-lg">
                                    Contenido 4
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
