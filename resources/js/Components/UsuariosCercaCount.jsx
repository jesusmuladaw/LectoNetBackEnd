import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UsuariosCercaCount() {
    const [userCount, setUserCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const response = await axios.get('/api/users-with-shared-books');
                setUserCount(response.data.user_count);
            } catch (error) {
                setError('Error al cargar el número de usuarios.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserCount();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="bg-white p-4 rounded-lg flex">
            <h2>Hay {userCount} personas con libros que te interesan ¡Contacta con ellas!</h2>
        </div>
    );
}
