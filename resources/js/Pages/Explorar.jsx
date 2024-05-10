import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import libro from '../../Books/el arte de vender mierda.jpg'

export default function Explorar({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Explorar" />

            <div className='flex w-full'>
                <div>
                    <div className='bg-gray-200 w-4/5 rounded-lg p-6 m-8'>
                        <div className='bg-white p-4 rounded-lg flex'>
                            <h2>Hay X personas con libros que te interesan ¡Contacta con ellas!</h2> 
                        </div>
                    </div>

                    <div className='bg-gray-200 w-4/5 h-auto rounded-lg p-6 m-8'>
                        <article className='bg-white p-4 rounded-lg flex'>
                            <img className='w-24 m-2' src={libro} alt="El arte de vender mierda" /> 
                            <h2>¡Uno de los mejores libros que he leído!</h2>
                        </article>
                    </div>
                </div>
                <div className='bg-gray-200 max-w-2/4 rounded-lg p-6 m-8'>
                    lateral
                </div>
            </div>
            
            
        </AuthenticatedLayout>
    );
}
