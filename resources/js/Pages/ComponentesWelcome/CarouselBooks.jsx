import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import Heart from 'react-animated-heart';

export default function CarouselBooks({ apiUrl }) {
    const [books, setBooks] = useState([]);
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

    const confCarruselLibros = 'object-cover w-28 h-40 overflow-hidden m-auto items-center justify-center rounded-lg';

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(apiUrl);
                setBooks(response.data);
            } catch (error) {
                setError('Error al cargar los libros.');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
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

    const handleClick = (e, bookId) => {
        if (!isDragging) {
            window.location.href = `/books/${bookId}`;
        }
    };

    const handleLike = async (e, book) => {
        try {
            if (book.liked) {
                await axios.post(`/books/${book.id}/unlike`);
            } else {
                await axios.post(`/books/${book.id}/like`);
            }
            setBooks(books.map(b => b.id === book.id ? { ...b, liked: !b.liked } : b));
        } catch (error) {
            console.error('Error al dar/quitar like al libro', error);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const items = books.map((book) => (
        <div
            key={book.id}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={(e) => handleClick(e, book.id)}
            className="relative"
        >
            <div className=" p-4 rounded-lg text-center">
                <img className={confCarruselLibros} src={book.foto} alt={book.titulo} onDragStart={handleDragStart} role="presentation" />
                <div className=" m-auto rounded-full overflow-hidden text-center w-20 sm:w-24md:w-28 lg:w-32 xl:w-36">
                    <div className='-mt-2 '>
                        <Heart isClick={book.liked} onClick={(e) => handleLike(e, book)} />
                    </div>
                </div>
            </div>
            
        </div>
    ));

    return <AliceCarousel mouseTracking items={items} responsive={responsive} animationType="fadeout" disableButtonsControls disableDotsControls infinite="true" />;
}
