import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get(route('profile.userPosts'));
                setPosts(response.data);
            } catch (error) {
                setError('Error al obtener los posts');
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto px-4">
            <ul>
                {posts.slice(-5).map((post) => (
                    <div key={post.id} className='bg-gray-200 w-full md:w-11/12 rounded-lg p-6 my-4 mx-auto'>
                        <article className='bg-white p-4 rounded-lg flex flex-col md:flex-row space-y-10'>
                            <img className='w-full md:w-24 h-36 object-cover m-4' src="https://www.cervantesvirtual.com/images/qbi/grande/0020108394.jpg" alt="" />
                            <div className='flex flex-col justify-between'>
                                <h3 className='font-bold text-lg pb-4'>{post.titulo}</h3>
                                <p className='text-sm pb-4'>{post.contenido}</p>
                            </div>
                        </article>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export { UserPosts };
