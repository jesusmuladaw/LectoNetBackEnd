import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FotoPost from '@/Components/FotoPost';
import { Link } from '@inertiajs/react';

const UserPostsGeneric = ({ userId }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`/user/${userId}/posts`);
                setPosts(response.data);
            } catch (error) {
                setError('No se han encontrado posts.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [userId]);

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
                        {post.foto && (
                            <div className="w-full md:w-1/3 mb-4 md:mb-0">
                                <FotoPost fotoId={post.foto} />
                            </div>
                        )}
                        <div className=' w-full flex flex-col justify-between'>
                            <h3 className='font-bold text-lg'>{post.titulo}</h3>
                            <p className='text-sm'>{post.contenido}</p>
                            <p className="text-sm text-gray-600">Publicado por {post.user.name} el {new Date(post.created_at).toLocaleDateString()}</p>
                            <div className="flex justify-end px-4">
                                <Link href={route('blog.show', post.id)} className="text-blue-500 hover:underline">Leer más</Link>
                            </div>
                        </div>
                    </article>
                </div>
            ))}
        </div>
    );
};

export default UserPostsGeneric;
