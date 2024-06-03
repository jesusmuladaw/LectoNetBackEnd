<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    //
    public function search(Request $request)
    {
        $query = $request->input('query');

        $users = User::where('name', 'LIKE', "%{$query}%")
            ->orWhere('apellidos', 'LIKE', "%{$query}%")
            ->get();

        $books = Book::where('titulo', 'LIKE', "%{$query}%")
            ->orWhere('autor', 'LIKE', "%{$query}%")
            ->get();

        return inertia('Search/Results', [
            'query' => $query,
            'users' => $users,
            'books' => $books,
        ]);
    }
}
