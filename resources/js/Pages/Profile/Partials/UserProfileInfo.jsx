import React from 'react';
import { Link } from '@inertiajs/react';
import FotoPerfil from './FotoPerfil';

export default function UserProfileInfo({ user, mustVerifyEmail, status }) {
    return (
        <div className=" m-auto">
            <h3 className=" font-bold text-xl">{user.name} {user.apellidos}</h3>
            {user.edad !== null && (
                <p>{user.edad} Años</p>
            )}
            <p>{user.descripcion}</p>
            <p>{user.pais_id}</p>
            <p>{user.ciudad_id}</p>

            <Link href={route('profile.edit')}
                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] underline"
            >
                Editar
            </Link>

            <Link href={route('profile.index')}
                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] underline"
            >
                Enviar mensaje
            </Link>
        </div>
    );
}
