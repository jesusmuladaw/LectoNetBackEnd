<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::orderBy('created_at', 'desc')->take(10)->get();
        $hasMore = Post::count() > 10;

        return Inertia::render('Blog/Index', [
            'initialPosts' => $posts,
            'hasMore' => $hasMore,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Blog/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        //
        {
            $request->validate([
                'titulo' => 'required|string|max:255',
                'contenido' => 'required|string',
                'imagen' => 'nullable|image|max:5120',
            ], [
                'titulo.required' => 'El título es obligatorio.',
                'contenido.required' => 'El contenido es obligatorio.',
                'imagen.image' => 'El archivo debe ser una imagen.',
                'imagen.max' => 'La imagen no debe ser mayor a 5 MB.'
            ]);
    
            $post = new Post();
            $post->titulo = $request->titulo;
            $post->contenido = $request->contenido;
            $post->user_id = Auth::id();
    
            if ($request->hasFile('foto')) {
                $imagen = $request->file('foto');
                $path = ('images/postImages');
                $filename = time() . '-' . $imagen->getClientOriginalName();
    
                Storage::disk('public')->putFileAs($path, $imagen, $filename);
                $post->foto = $filename;
            }
    
            $post->save();
    
            return Redirect::route('blog.index');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
        $post = Post::with('comments.user')->findOrFail($post->id);
        return inertia('Blog/Show', ['post' => $post]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
        return Inertia::render('Blog/Edit', ['post1' => $post]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
            'foto' => 'nullable|image|max:5120',
            'remove_image' => 'boolean'
        ], [
            'titulo.required' => 'El título es obligatorio.',
            'contenido.required' => 'El contenido es obligatorio.',
            'foto.image' => 'El archivo debe ser una imagen.',
            'foto.max' => 'La imagen no debe ser mayor a 5 MB.'
        ]);

        $post->titulo = $request->titulo;
        $post->contenido = $request->contenido;

        if ($request->remove_image) {
            if ($post->foto && file_exists(public_path('images/postImages/' . $post->foto))) {
                unlink(public_path('images/postImages/' . $post->foto));
            }
            $post->foto = null;
        } elseif ($request->hasFile('foto')) {
            
            $imagen = $request->file('foto');
            $path = 'images/postImages';
            $filename = time() . '-' . $imagen->getClientOriginalName();

            Storage::disk('public')->putFileAs($path, $imagen, $filename);

            $post->foto = $filename;
        }

        $post->save();

        return Redirect::route('blog.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
        $post->delete();
        return redirect()->route('blog.index');
    }

    public function getRecentPosts()
    {
        $posts = Post::with('user')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        return response()->json($posts);
    }

    public function getPosts(Request $request)
    {
        $offset = $request->query('offset', 0);
        $limit = 10;
    
        $posts = Post::orderBy('created_at', 'desc')
            ->skip($offset)
            ->take($limit)
            ->get();
    
        $hasMore = Post::count() > $offset + $limit;
    
        return response()->json([
            'posts' => $posts,
            'hasMore' => $hasMore,
        ]);
    }

    public function storeComment(Request $request, $postId)
    {
        $request->validate([
            'contenido' => 'required|string|max:1000',
        ]);

        $comment = new Comment();
        $comment->contenido = $request->contenido;
        $comment->user_id = Auth::id();
        $comment->post_id = $postId;
        $comment->save();

        return Redirect::back();
    }
}
