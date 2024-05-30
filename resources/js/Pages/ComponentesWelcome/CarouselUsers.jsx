import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import FotoPerfil from '../Profile/Partials/FotoPerfil';


export default function CarouselUsers({ apiUrl }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const handleDragStart = (e) => e.preventDefault();
    const responsive = {
        0: { items: 3 },
        568: { items: 4 },
        1024: { items: 5 },
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(apiUrl);
                setUsers(response.data);
            } catch (error) {
                setError('Error al cargar los usuarios.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [apiUrl]);

    const handleMouseDown = (e) => {
        setIsDragging(false);
        setStartPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
        const distance = Math.sqrt(Math.pow(e.clientX - startPos.x, 2) + Math.pow(e.clientY - startPos.y, 2));
        if (distance > 5) {
            setIsDragging(true);
        }
    };

    const handleClick = (e, userId) => {
        if (!isDragging) {
            window.location.href = `/profile/${userId}`;
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const items = users.map((user) => (
        <div key={user.id} className="p-2 relative" 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={(e) => handleClick(e, user.id)}
        >
            <div className=" p-4 rounded-lg text-center">

                <div className='m-auto rounded-full overflow-hidden text-center my-5 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36' onDragStart={handleDragStart} role="presentation">
                    <FotoPerfil fotoId={user.foto}/>
                </div>
                <h3 className="font-bold">{user.name}</h3>
            </div>
        </div>
        
    ));

    return <AliceCarousel mouseTracking items={items} responsive={responsive} animationType="fadeout" disableButtonsControls disableDotsControls infinite="true" />;
}