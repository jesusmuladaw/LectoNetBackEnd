import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Select from 'react-select';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const { auth, paises, ciudades, idiomas } = usePage().props;
    const user = auth.user;

    const sortedPaises = [...paises].sort((a, b) => a.nombre.localeCompare(b.nombre));
    const sortedCiudades = [...ciudades].sort((a, b) => a.nombre.localeCompare(b.nombre));
    const sortedIdiomas = [...idiomas].sort((a, b) => a.idioma.localeCompare(b.idioma));

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        _method: 'POST',
        name: user.name,
        apellidos: user.apellidos,
        email: user.email,
        edad: user.edad,
        descripcion: user.descripcion,
        pais_id: user.pais_id || '',
        ciudad_id: user.ciudad_id || '',
        idiomas: (user.idiomas || []).map(idioma => ({ value: idioma.id, label: idioma.idioma })),
        foto: null,
    });

    const handleFileChange = (e) => {
        setData('foto', e.target.files[0]);
    };

    const handlePaisChange = (e) => {
        setData({
            ...data,
            pais_id: e.target.value,
            ciudad_id: '',
        });
    };

    const handleIdiomaChange = (selectedOptions) => {
        setData('idiomas', selectedOptions);
    };

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        post(route('profile.update'), {
            data: formData,
            headers: {
                'Content-type': 'multipart/form-data',
            },
            onSuccess: () => {
                setData('foto', null);
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Información de Perfil</h2>
                <p className="mt-1 text-sm text-gray-600">Actualiza la información de tu perfil de usuario.</p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="apellidos" value="Apellidos" />
                    <TextInput
                        id="apellidos"
                        className="mt-1 block w-full"
                        value={data.apellidos}
                        onChange={(e) => setData('apellidos', e.target.value)}
                        autoComplete="apellidos"
                    />
                    <InputError className="mt-2" message={errors.apellidos} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="edad" value="Edad" />
                    <TextInput
                        id="edad"
                        className="mt-1 block w-full"
                        value={data.edad}
                        onChange={(e) => setData('edad', e.target.value)}
                        autoComplete="edad"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="descripcion" value="Descripción" />
                    <TextInput
                        id="descripcion"
                        className="mt-1 block w-full"
                        value={data.descripcion}
                        onChange={(e) => setData('descripcion', e.target.value)}
                        autoComplete="descripcion"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="pais_id" value="País" />
                    <select
                        id="pais_id"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.pais_id}
                        onChange={handlePaisChange}
                    >
                        <option value="">Selecciona un país</option>
                        {sortedPaises.map((pais) => (
                            <option key={pais.id} value={pais.id}>
                                {pais.nombre}
                            </option>
                        ))}
                    </select>
                    <InputError className="mt-2" message={errors.pais_id} />
                </div>

                <div>
                    <InputLabel htmlFor="ciudad_id" value="Ciudad" />
                    <select
                        id="ciudad_id"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.ciudad_id}
                        onChange={(e) => setData('ciudad_id', e.target.value)}
                    >
                        <option value="">Selecciona una ciudad</option>
                        {sortedCiudades
                            .filter((ciudad) => ciudad.pais_id === parseInt(data.pais_id))
                            .map((ciudad) => (
                                <option key={ciudad.id} value={ciudad.id}>
                                    {ciudad.nombre}
                                </option>
                            ))}
                    </select>
                    <InputError className="mt-2" message={errors.ciudad_id} />
                </div>

                <div>
                    <InputLabel htmlFor="idiomas" value="Idiomas" />
                    <Select
                        isMulti
                        name="idiomas"
                        options={sortedIdiomas.map(idioma => ({ value: idioma.id, label: idioma.idioma }))}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={data.idiomas}
                        onChange={handleIdiomaChange}
                    />
                    <InputError className="mt-2" message={errors.idiomas} />
                </div>

                <div>
                    <InputLabel htmlFor="foto" value="Subir nueva foto" />
                    <div className='flex'>
                        <input
                            id="foto"
                            type="file"
                            className="mt-1 block w-full"
                            onChange={handleFileChange}
                        />
                    </div>
                    <InputError className="mt-2" message={errors.foto} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Tu email todavía no ha sido verificado.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Haz click aquí para reenviar el email de verificación.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                Un nuevo link de verificación ha sido enviado a tu dirección de email.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Guardar</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Guardado.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
