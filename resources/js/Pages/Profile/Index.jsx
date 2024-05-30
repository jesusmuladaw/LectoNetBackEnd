import ArticlesCollection from "@/Components/ArticlesCollection";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from '@inertiajs/react';
import FotoPerfil from "./Partials/FotoPerfil";
import { BooksToShareGeneric , WishListGeneric } from "./Partials/BibliotecaYDeseosGenerico";
import UserPostsGeneric from "./Partials/UserPostsGeneric";


export default function Index({ auth, mustVerifyEmail, user }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Perfil"/>
            <div>
                <div className=" w-5/6 flex m-auto">
                    
                    <div className=" m-auto rounded-full overflow-hidden w-48 h-48 text-center my-5" >
                        <FotoPerfil fotoId={auth.user.foto}/>
                    </div>
                    <div className=" m-auto">
                        <h3 className=" font-bold text-xl">{user.name} {user.apellidos}</h3>
                        {auth.user.edad !== null && (
                            <p>{auth.user.edad} Años</p>
                        )}
                        <p>{auth.user.pais?.nombre}</p>
                        <p>{auth.user.ciudad?.nombre}</p>
                        
                        
                        
                        {auth.user &&
                            <Link href={'/profile/edit'}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] underline"
                            >
                                Editar
                            </Link>
                        }
                        
                        <Link href={route('profile.index')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] underline"
                        >
                            Enviar mensaje 
                        </Link>
                    </div>
                    
                    {/* <div className=" m-auto">
                        <p>A 27 Km de ti:</p>
                        <p>Cafeterías cerca</p>
                        <p>El Pony Pisador</p>

                    </div> */}
                </div>
                <div className=" text-center w-auto bg-gray-300 p-3">
                    <p className=" text-center w-3/6 m-auto font-serif ">{auth.user.descripcion}</p>
                </div>
                <div className="w-10/12 flex m-auto">
                    <div className="m-auto">
                        <h4 className=" font-bold text-lg">Mi biblioteca</h4>
                        <BooksToShareGeneric userId={user.id}/>
                    </div>
                    <div className="m-auto">
                        <h4 className=" font-bold text-lg">Lista de deseos</h4>
                        <WishListGeneric userId={user.id} />
                    </div>
                </div>
                <h3 className=" text-lg font-bold text-center pt-5">Últimos post realizados</h3>
                <div className="w-10/12 flex m-auto">
                    <div className="m-auto">
                        <div className='bg-gray-200 w-10/12 max-w-10/12 rounded-lg p-2 m-auto my-4'>
                            <UserPostsGeneric userId={user.id}/>
                        </div>
                        
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
