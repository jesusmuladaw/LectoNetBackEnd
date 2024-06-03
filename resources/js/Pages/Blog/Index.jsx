import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InfiniteScroll from 'react-infinite-scroll-component';
import FotoPost from '@/Components/FotoPost';

export default function Index({ auth, initialPosts, hasMore }) {
    const [posts, setPosts] = useState(initialPosts);
    const [hasMorePosts, setHasMorePosts] = useState(hasMore);

    const fetchMorePosts = async () => {
        const response = await fetch(`/api/posts?offset=${posts.length}`);
        const data = await response.json();
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setHasMorePosts(data.hasMore);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Blog" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-center md:text-left">Blog</h1>
                <div className="flex justify-center md:justify-start bg-white p-4 rounded-lg shadow-md">
                    <Link href={route('blog.create')} className="text-blue-500">Crear nueva publicación</Link>
                </div>
                <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchMorePosts}
                    hasMore={hasMorePosts}
                    loader={<h4>Cargando más publicaciones...</h4>}
                    endMessage={<p className="text-center">No hay más publicaciones.</p>}
                >
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white w-full p-4 m-auto rounded-lg shadow-md mt-4 flex flex-col md:flex-row">
                            {post.foto && (
                                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                                    <FotoPost fotoId={post.foto} />
                                </div>
                            )}
                            <div className={`w-full ${post.foto ? 'md:w-2/3' : ''} flex flex-col justify-between`}>
                                <h2 className="text-xl font-semibold mb-2 p-4">{post.titulo}</h2>
                                <p className="flex-1 mb-4 px-4">{post.contenido.substring(0, 150)}...</p>
                                <div className="flex justify-end px-4">
                                    <Link href={route('blog.show', post.id)} className="text-blue-500 hover:underline">Leer más</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </AuthenticatedLayout>
    );
}
