import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head, usePage } from '@inertiajs/react';
import UserPostsGeneric from "./Partials/UserPostsGeneric";
import { BooksToShareGeneric, WishListGeneric } from './Partials/BibliotecaYDeseosGenerico';
import FotoPerfil from './Partials/FotoPerfil';
import ReadingBooks from './Partials/LibrosLeyendoActualmente';
import Messages from '@/Components/Messages/Message';

export default function Show({ auth, usuario }) {
    const [showMessages, setShowMessages] = React.useState(false);

    const handleSendMessageClick = () => {
        setShowMessages(true);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`${usuario.name} ${usuario.apellidos}`} />
            <div className="">
                <div className="flex flex-col md:flex-row w-full md:w-5/6 m-auto p-4">
                    <div className="flex justify-center md:justify-start md:w-1/3 mb-4 md:mb-0">
                        <div className="rounded-full overflow-hidden w-24 h-24 md:w-48 md:h-48">
                            <FotoPerfil fotoId={usuario.foto} />
                        </div>
                    </div>
                    <div className="md:w-1/3 text-center md:text-left">
                        <h3 className="font-bold text-xl">{usuario.name} {usuario.apellidos}</h3>
                        {usuario.edad !== null && (
                            <p>{usuario.edad} Años</p>
                        )}
                        <p>{usuario.pais?.nombre}</p>
                        <p>{usuario.ciudad?.nombre}</p>
                        <p>Idiomas:</p>
                        <p className='flex gap-2'>
                            {usuario.idiomas.map((idioma) => (
                                <p key={idioma.id}>{idioma.idioma}</p>
                            ))}
                        </p>

                        {(auth.user && auth.user.id !== usuario.id) ? (
                            <button onClick={handleSendMessageClick}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] underline"
                            >
                                Enviar mensaje 
                            </button>
                        ) : (
                            <Link href={route('profile.index')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] underline"
                            >
                                Editar
                            </Link>
                        )}
                    </div>
                    <div className="md:w-1/3 mt-4 md:mt-0">
                        <ReadingBooks userId={usuario.id}/>
                    </div>
                </div>
                <div className="text-center w-full bg-gray-300 p-3 mt-4">
                    <p className="font-serif">{usuario.descripcion}</p>
                </div>
                <div className="w-full p-4 md:w-10/12 flex flex-col md:flex-row m-auto mt-4">
                    <div className="w-full md:w-1/2 text-center md:text-left mb-4 md:mb-0">
                        <h4 className="font-bold text-lg">Mi biblioteca</h4>
                        <BooksToShareGeneric userId={usuario.id} />
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h4 className="font-bold text-lg">Lista de deseos</h4>
                        <WishListGeneric userId={usuario.id} />
                    </div>
                </div>
                <h3 className="text-lg font-bold text-center pt-5">Últimos post realizados</h3>
                <div className="w-full md:w-10/12 flex m-auto">
                    <div className="bg-gray-200 w-full rounded-lg p-2 m-auto my-4">
                        <UserPostsGeneric userId={usuario.id} />
                    </div>
                </div>
                {showMessages && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg shadow-lg p-4 w-full md:w-1/2">
                            <Messages auth={auth} receiverId={usuario.id} receiverName={usuario.name} />
                            <button onClick={() => setShowMessages(false)} className="mt-4 bg-red-500 text-white rounded px-4 py-2">Cerrar</button>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}