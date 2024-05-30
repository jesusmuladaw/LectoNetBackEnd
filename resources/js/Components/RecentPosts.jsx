import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RecentPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts/recent');
                setPosts(response.data);
            } catch (error) {
                setError('Error al cargar los posts.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="bg-gray-200 w-full max-w-3xl rounded-lg p-6 my-4">
            <h2 className="bg-white font-bold p-4 rounded-lg mb-4">Posts Recientes</h2>
            {posts.map((post) => (
                <div key={post.id} className="bg-white w-full rounded-lg p-6 mb-4">
                    <article className='flex flex-col md:flex-row'>
                        <img className='w-full md:w-24 h-36 object-cover mb-4 md:mb-0 md:mr-4' src="https://www.cervantesvirtual.com/images/qbi/grande/0020108394.jpg" alt="" />
                        <div className='flex flex-col justify-between'>
                            <h3 className='font-bold text-lg'>{post.titulo}</h3>
                            <p className='text-sm'>{post.contenido}</p>
                            <p className="text-sm text-gray-600">Publicado por {post.user.name} el {new Date(post.created_at).toLocaleDateString()}</p>
                        </div>
                    </article>
                </div>
            ))}
        </div>
    );
}
