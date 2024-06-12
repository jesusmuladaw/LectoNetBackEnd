import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import RecentPosts from '@/Components/RecentPosts';
import UsuariosCercaCount from '@/Components/UsuariosCercaCount';
import CurrentlyReadingBook from '@/Components/CurrentlyReadingBook';
import MostWishedBookOfMonth from '@/Components/MostWishedBookOfMonth';

export default function Explorar({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Explorar" />
            <div className=' max-w-screen-lg m-auto'>
                <h1 className=' mt-4 text-start font-bold text-gray-600 text-3xl font-serif'>LectoNet</h1>
            </div>
            <div className='flex flex-col lg:flex-row w-full'>
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
                <div className="lg:sticky top-4 bg-gray-200 w-full max-w-xs lg:max-w-xs lg:w-1/4 rounded-lg p-4 m-4 lg:h-full">
                    <div className='mb-4'>
                        <CurrentlyReadingBook userId={auth.user.id} />
                    </div>
                    <div>
                        <MostWishedBookOfMonth />
                    </div>
                    
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
