import FotoLibro from '@/Components/FotoLibro';
import axios from 'axios';


async function fetchReadingBooks(userId) {
    try {
        const response = await axios.get(`/api/user/${userId}/reading-books`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching reading books:', error);
        return [];
    }
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-alice-carousel';


const ReadingBooks = ({ userId }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const booksData = await fetchReadingBooks(userId);
            setBooks(booksData);
        };

        fetchBooks();
    }, [userId]);

    return (
        <div className=''>
            <h2>Libros que está leyendo</h2>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <Link href={route('books.show', book.id)} className="text-black hover:text-gray-600 flex">
                            <div>
                                <h5 className='font-bold text-xs mt-2'>{book.titulo}</h5>
                                <p className='text-xs'>{book.autor}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReadingBooks;