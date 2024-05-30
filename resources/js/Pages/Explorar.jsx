import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import RecentPosts from '@/Components/RecentPosts';
import UsuariosCercaCount from '@/Components/UsuariosCercaCount';

export default function Explorar({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Explorar" />

            <div className='flex w-full'>
                <div className='container mx-auto px-4 flex flex-col items-center'>
                    <div className='bg-gray-200 w-full max-w-3xl rounded-lg p-6 my-4'>
                        <div className='bg-white p-4 rounded-lg flex'>
                            <UsuariosCercaCount /> 
                        </div>
                    </div>
                    <div className='w-full max-w-3xl'>
                        <RecentPosts />
                    </div>
                </div>
                <div className='bg-gray-200 max-w-xs rounded-lg p-6 m-8'>
                    lateral
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
