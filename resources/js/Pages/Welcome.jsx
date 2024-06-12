import { Link, Head } from '@inertiajs/react';
import logoSVG from '../../img/LogoLectoNet.png';
import imagen from '../../img/LogoLectoNet.png'
import CarouselBooks from './ComponentesWelcome/CarouselBooks';
import CarouselUsers from './ComponentesWelcome/CarouselUsers';
import CodigoPostal from './ComponentesWelcome/CodigoPostal';

export default function Welcome({ auth, laravelVersion, phpVersion }) {

    return (
        <>
            <Head title="LectoNet" />
            <Head link rel="stylesheet" type="text/css" href="slick/slick.css"/>
            <Head link rel="stylesheet" type="text/css" href="slick/slick-theme.css"/>
            <div className="bg-blue-50 text-black/50 ">
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#af9392] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex flex-col lg:justify-center lg:col-start-2">
                                <img className='h-32 w-32 m-auto' src={logoSVG} alt="Logo" />
                                <h1 className=' text-center font-bold text-gray-600 text-5xl font-serif pt-3'>LectoNet</h1>
                            </div>
                            
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('explorar')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                    >
                                        Explorar
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] "
                                        >
                                            Iniciar Sesion
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] "
                                        >
                                            Registro
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>
                        <main className="mt-6">
                            <div className=' justify-center items-center'>
                                <CarouselBooks apiUrl='/api/books/top-rated'/>
                                <CarouselUsers apiUrl='/api/users/welcome' />
                            </div>
                        </main>
                        <footer className="py-16 text-center text-sm text-black">
                            LectoNet Created By Jesús Mula
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
