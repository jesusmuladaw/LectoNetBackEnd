import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from '@inertiajs/react';
import UserPostsGeneric from "./Partials/UserPostsGeneric"
import { BooksToShareGeneric, WishListGeneric } from './Partials/BibliotecaYDeseosGenerico';
import FotoPerfil from './Partials/FotoPerfil';
 
export default function Show({ auth, usuario }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`${usuario.name} ${usuario.apellidos}`} />
            <div>
                <div className="w-5/6 flex m-auto">
                    <div className="m-auto rounded-full overflow-hidden w-48 h-48 text-center my-5">
                        <FotoPerfil fotoId={usuario.foto} />
                    </div>
                    <div className="m-auto">
                        <h3 className="font-bold text-xl">{usuario.name} {usuario.apellidos}</h3>
                        {usuario.edad !== null && (
                            <p>{usuario.edad} Años</p>
                        )}
                        <p>{usuario.pais?.nombre}</p>
                        <p>{usuario.ciudad?.nombre}</p>
                        
                        {(auth.user && auth.user.id !== usuario.id) ? (
                            <>
                                <Link href={'http://127.0.0.1:8000/'}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] underline"
                                >
                                    Enviar mensaje 
                                </Link>
                            </>
                        ) : (
                            <>
                            
                                <Link href={route('profile.edit')}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] underline"
                                >
                                    Editar
                                </Link>
                            
                            </>
                            
                        )}
                    </div>
                </div>
                <div className="text-center w-auto bg-gray-300 p-3">
                    <p className="text-center w-3/6 m-auto font-serif ">{usuario.descripcion}</p>
                </div>
                <div className="w-10/12 flex m-auto">
                    <div className="m-auto">
                        <h4 className="font-bold text-lg">Mi biblioteca</h4>
                        <BooksToShareGeneric userId={usuario.id} />
                    </div>
                    <div className="m-auto">
                        <h4 className="font-bold text-lg">Lista de deseos</h4>
                        <WishListGeneric userId={usuario.id} />
                    </div>
                </div>
                <h3 className="text-lg font-bold text-center pt-5">Últimos post realizados</h3>
                <div className="w-10/12 flex m-auto">
                    <div className="m-auto">
                        <div className='bg-gray-200 w-10/12 max-w-10/12 rounded-lg p-2 m-auto my-4'>
                            <UserPostsGeneric userId={usuario.id} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
