import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FotoLibro = ({ fotoId }) => {
    const [fotoUrl, setFotoUrl] = useState('');

    useEffect(() => {
        const fetchFotoUrl = async () => {
            try {
                setFotoUrl(`https://lectonet.mooo.com/images/books/${fotoId}`);
            } catch (error) {
                console.error('Error al obtener la foto:', error);
            }
        };

        fetchFotoUrl();

        return () => {
            fotoUrl;
        };
    }, [fotoId]);

    return (
        <div>
            {<img src={fotoUrl} alt="Imagen" />}
        </div>
    );
};

export default FotoLibro;