<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    //
    public function like(Book $book)
    {
        /** @var \App\Models\User */
        $user = Auth::user();
        if ($user->likedBooks()->where('book_id', $book->id)->exists()) {
            return response()->json(['message' => 'Already liked'], 200);
        }

        $user->likedBooks()->attach($book->id);
        return response()->json(['message' => 'Liked successfully'], 200);
    }

    public function unlike(Book $book)
    {
        /** @var \App\Models\User */
        $user = Auth::user();
        $user->likedBooks()->detach($book->id);
        return response()->json(['message' => 'Unliked successfully'], 200);
    }
}
