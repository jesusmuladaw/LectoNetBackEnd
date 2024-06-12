import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FotoPerfil = ({ fotoId }) => {
    const [fotoUrl, setFotoUrl] = useState('');

    useEffect(() => {
        const fetchFotoUrl = async () => {
            if (fotoId) {
                const url = `https://3.93.228.85/images/profilePictures/${fotoId}`;
                setFotoUrl(url);
            }
        };

        fetchFotoUrl();

        return () => {
            fotoUrl;
        };
    }, [fotoId]);

    return (
        <div>
            {fotoUrl ? <img src={fotoUrl} alt="Imagen de perfil" /> : <p>Cargando...</p>}
        </div>
    );
};

export default FotoPerfil;