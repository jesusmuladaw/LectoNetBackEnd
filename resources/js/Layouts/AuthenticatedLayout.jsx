import { useState, useEffect } from 'react';
import logoSVG from '../../img/LogoLectoNet.png';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import FotoPerfil from '@/Pages/Profile/Partials/FotoPerfil';
import SearchBar from '@/Components/SearchBar';
import axios from 'axios';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [hasNewMessages, setHasNewMessages] = useState(false);

    useEffect(() => {
        const checkForNewMessages = async () => {
            try {
                const response = await axios.get('/messages/check-new');
                setHasNewMessages(response.data.hasNewMessages);
            } catch (error) {
                console.error('Error checking for new messages', error);
            }
        };

        checkForNewMessages();
        const interval = setInterval(checkForNewMessages, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-blue-50">
            <nav className="bg-gray-200 border-b border-gray-400">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <img className='h-14' src={logoSVG} alt="Logo" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('explorar')} active={route().current('explorar')}>
                                    Explorar
                                </NavLink>
                                <NavLink href={route('books.index')} active={route().current('books.index')}>
                                    Libros
                                </NavLink>
                                <NavLink href={route('profile.personas')} active={route().current('profile.personas')}>
                                    Personas
                                </NavLink>
                                <NavLink href={route('blog.index')} active={route().current('blog.index')}>
                                    Blog
                                </NavLink>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 w-full max-w-42 md:max-w-md lg:max-w-lg">
                            <SearchBar />
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center p-1 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150 relative"
                                            >
                                                {hasNewMessages && (
                                                    <span className="absolute bottom-0 right-0 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                                                )}
                                                <div className='m-auto rounded-full overflow-hidden w-8 h-8'>
                                                    <FotoPerfil fotoId={user.foto}/>
                                                </div>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.show', user.id)}>Perfil</Dropdown.Link>
                                        <Dropdown.Link href={route('conversations.index')}>Mensajes</Dropdown.Link>
                                        <Dropdown.Link href={route('loan-requests')}>Préstamos</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Cerrar sesión
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('explorar')} active={route().current('explorar')}>
                            Explorar
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('books.index')} active={route().current('books.index')}>
                            Libros
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('profile.personas')} active={route().current('profile.personas')}>
                            Personas
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('blog.index')} active={route().current('blog.index')}>
                            Blog
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.show', user.id)}>Perfil</ResponsiveNavLink>
                            <ResponsiveNavLink href={route('conversations.index')}>Mensajes</ResponsiveNavLink>
                            <Dropdown.Link href={route('loan-requests')}>Préstamos</Dropdown.Link>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Cerrar sesión
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
            <footer className="py-16 text-center text-sm text-black">
                LectoNet Created By Jesús Mula
            </footer>
        </div>
    );
}
