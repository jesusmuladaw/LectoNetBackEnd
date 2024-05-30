import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CarouselBooks from "../ComponentesWelcome/CarouselBooks";
import { confCarruselPaginaLibros } from "../Configuration/conf";

export default function Index ({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Perfil"/>
            <div>
                <div className={confCarruselPaginaLibros}>
                    <h2 className="py-4">Libros cerca de ti</h2>
                    <div className=" rounded-xl shadow-lg m-auto h-60 overflow-hidden">
                        <CarouselBooks apiUrl='/api/books/near-you' />
                    </div>
                </div>
                <div className={confCarruselPaginaLibros}>
                    <h2 className="py-4">Creemos que te gustarán</h2>
                    <div className=" rounded-xl shadow-lg m-auto h-60 overflow-hidden">
                        <CarouselBooks apiUrl='/api/books/recommended'/>
                    </div>
                </div>
                <div className={confCarruselPaginaLibros}>
                    <h2 className="py-4">Mejor valorados</h2>
                    <div className=" rounded-xl shadow-lg m-auto h-60 overflow-hidden">
                        <CarouselBooks apiUrl='/api/books/top-rated'/>
                    </div>
                </div>
                <div className={confCarruselPaginaLibros}>
                    <h2 className="py-4">Tu lista de deseos</h2>
                    <div className=" rounded-xl shadow-lg m-auto h-60 overflow-hidden">
                        <CarouselBooks apiUrl='/api/books/wish-list'/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
