import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FotoPost = ({ fotoId }) => {
    const [fotoUrl, setFotoUrl] = useState('');

    useEffect(() => {
        const fetchFotoUrl = async () => {
            try {
                setFotoUrl(`https://3.93.228.85/images/postImages/${fotoId}`);
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
            {<img className=' max-h-52' src={fotoUrl} alt="Imagen" />}
        </div>
    );
};

export default FotoPost;