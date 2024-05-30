import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { confCarruselPaginaLibros } from "../Configuration/conf";
import CarouselUsers from "../ComponentesWelcome/CarouselUsers";

export default function Index ({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Perfil"/>
            <div>
                <div className={confCarruselPaginaLibros}>
                    <h2 className="py-4">Personas cerca de ti</h2>
                    <div className=" rounded-xl shadow-lg m-auto h-60 overflow-hidden">
                        <CarouselUsers apiUrl='/api/users/near-you' />
                    </div>
                </div>
                <div className={confCarruselPaginaLibros}>
                    <h2 className="py-4">Personas con gustos similares</h2>
                    <div className=" rounded-xl shadow-lg m-auto h-60 overflow-hidden">
                        <CarouselUsers apiUrl='/api/users/similar-tastes' />
                    </div>
                </div>
                <div className={confCarruselPaginaLibros}>
                    <h2 className="py-4">Personas que quieren leer tus libros</h2>
                    <div className=" rounded-xl shadow-lg m-auto h-60 overflow-hidden">
                        <CarouselUsers apiUrl='/api/users/interested' />
                    </div>
                </div>
                
            </div>
        </AuthenticatedLayout>
    );
}
