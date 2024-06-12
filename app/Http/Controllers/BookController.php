<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Models\Categoria;
use App\Models\Foto;
use App\Models\Genero;
use App\Models\Idioma;
use App\Models\Loan;
use App\Models\ReadingStatus;
use App\Models\OwnershipStatus;
use App\Models\Tematica;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        /** @var \App\Models\User */
        $user = Auth::user();
        /** @var \App\Models\Book */
        $books = Book::with('tematicas', 'categorias', 'generos', 'idiomas', 'likes')->get();

        $books = $books->map(function ($book) use ($user) {
            $book->likes_count = $book->likes->count();
            $book->liked = $user->likedBooks && $user->likedBooks->contains($book->id);
            $book->isSharing = $user->books()->wherePivot('ownership_status_id', OwnershipStatus::where('estado', 'compartir')->first()->id)->get()->contains($book->id);
            $book->isOnWishList = $user->books()->wherePivot('reading_status_id', ReadingStatus::where('estado', 'leer')->first()->id)->get()->contains($book->id);
            return $book;
        });

        return Inertia::render('Books/Index', ['books' => $books]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Books/Create', [
            'idiomas' => Idioma::all(),
            'categorias' => Categoria::all(),
            'generos' => Genero::all(),
            'tematicas' => Tematica::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequest $request)
    {
        //
        {
            $book = new Book();
            $book->titulo = $request->titulo;
            $book->autor = $request->autor;
            $book->descripcion = $request->descripcion;

            if ($request->hasFile('foto')) {
                $file = $request->file('foto');
                $filename = time() . '-' . $file->getClientOriginalName();
                $path = ('images/books');
                Storage::disk('public')->putFileAs($path, $file, $filename);
                $book->foto = $filename;
            }

            $book->save();

            $book->idiomas()->attach($request->idioma_id);
            $book->categorias()->attach($request->categoria_id);
            $book->generos()->attach($request->genero_id);
            $book->tematicas()->attach($request->tematica_id);

            return redirect()->route('books.index')->with('status', 'Book created successfully!');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        /** @var \App\Models\User */
        $user = auth()->user();
        $book = Book::with('tematicas', 'categorias', 'generos', 'idiomas')->findOrFail($id);
        $book->likes_count = $book->likes->count();

        $book->liked = $user->likedBooks && $user->likedBooks->contains($book->id);
        $book->isSharing = $user->books()->wherePivot('ownership_status_id', OwnershipStatus::where('estado', 'compartir')->first()->id)->get()->contains($book->id);
        $book->isOnWishList = $user->books()->wherePivot('reading_status_id', ReadingStatus::where('estado', 'leer')->first()->id)->get()->contains($book->id);
        $readingStatus = $user->books()->where('book_id', $book->id)->first()->pivot->reading_status_id ?? null;
        $readingStatusValue = ReadingStatus::find($readingStatus)->estado ?? null;

        $ownershipStatus = $user->books()->where('book_id', $book->id)->first()->pivot->ownership_status_id ?? null;
        $ownershipStatusValue = OwnershipStatus::find($ownershipStatus)->estado ?? null;

        return inertia::render('Books/Show', [
            'book' => $book,
            'reading_status' => $readingStatusValue,
            'ownership_status' => $ownershipStatusValue,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        //
        $book->load('idiomas', 'categorias', 'generos', 'tematicas');

        return Inertia::render('Books/Edit', [
            'book' => $book,
            'idiomas' => Idioma::all(),
            'categorias' => Categoria::all(),
            'generos' => Genero::all(),
            'tematicas' => Tematica::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        //
        $book->update($request->only('titulo', 'autor', 'descripcion'));

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $filename = time() . '-' . $file->getClientOriginalName();
            $path = ('images/books');
            Storage::disk('public')->putFileAs($path, $file, $filename);
            $book->foto = $filename;
        }

        $book->idiomas()->sync($request->idioma_id);
        $book->categorias()->sync($request->categoria_id);
        $book->generos()->sync($request->genero_id);
        $book->tematicas()->sync($request->tematica_id);

        return redirect()->route('books.index')->with('status', 'Book updated successfully!');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        //
    }

    public function share(Book $book)
    {
        /** @var \App\Models\User */
        $user = Auth::user();
        $status = OwnershipStatus::where('estado', 'compartir')->first();

        if (!$user->books()->where('status_id', $status->id)->exists()) {
            $user->books()->attach($book->id, ['status_id' => $status->id]);
        } else {
            $user->books()->updateExistingPivot($book->id, ['status_id' => $status->id]);
        }

        return back();
    }

    public function booksNearYou()
    {
        $user = Auth::user();
        $books = Book::whereHas('users', function($query) use ($user) {
            $query->where('pais_id', $user->pais_id)
                  ->where('ciudad_id', $user->ciudad_id)
                  ->where('book_user.ownership_status_id', 2);
        })->get();

        $books = $books->map(function ($book) use ($user) {
            $book->liked = $user->likedBooks->contains($book->id);
            return $book;
        });

        return response()->json($books);
    }

    public function recommendedBooks()
    {
        $user = Auth::user();

        $likedBooks = $user->likedBooks;

        $categoryIds = $likedBooks->pluck('categorias.*.id')->flatten()->unique();
        $genreIds = $likedBooks->pluck('generos.*.id')->flatten()->unique();
        $tematicIds = $likedBooks->pluck('tematicas.*.id')->flatten()->unique();

        $excludedBookIds = $user->books->pluck('id')
            ->merge($user->wishListBooks->pluck('id'))
            ->merge($user->booksToShare->pluck('id'))
            ->merge($user->loansAsLender->pluck('book_id'))
            ->merge($user->loansAsBorrower->pluck('book_id'))
            ->unique();

        $recommendedBooks = Book::where(function($query) use ($categoryIds, $genreIds, $tematicIds) {
                $query->whereHas('categorias', function ($query) use ($categoryIds) {
                    $query->whereIn('categorias.id', $categoryIds);
                })
                ->orWhereHas('generos', function ($query) use ($genreIds) {
                    $query->whereIn('generos.id', $genreIds);
                })
                ->orWhereHas('tematicas', function ($query) use ($tematicIds) {
                    $query->whereIn('tematicas.id', $tematicIds);
                });
            })
            ->whereNotIn('books.id', $excludedBookIds)
            ->get();

        return response()->json($recommendedBooks);
    }

    public function topRatedBooks()
    {
        $topLikedBooks = Book::withCount('likes')
            ->orderBy('likes_count', 'desc')
            ->take(10)
            ->get();

        return response()->json($topLikedBooks);
    }

    public function wishListBooks()
    {
        $user = Auth::user();
        $books = $user->wishListBooks;
        return response()->json($books);
    }

    public function changeReadingStatus(Book $book, $estado)
    {
        /** @var \App\Models\User */
        $user = auth()->user();
        $readingStatus = ReadingStatus::where('estado', $estado)->firstOrFail();
        $user->books()->syncWithoutDetaching([$book->id => ['reading_status_id' => $readingStatus->id]]);

        return response()->json(['message' => 'Reading status updated successfully'], 200);
    }

    public function changeOwnershipStatus(Book $book, $estado)
    {
        /** @var \App\Models\User */
        $user = auth()->user();
        $ownershipStatus = OwnershipStatus::where('estado', $estado)->firstOrFail();

        $user->books()->syncWithoutDetaching([$book->id => ['ownership_status_id' => $ownershipStatus->id]]);

        return response()->json(['message' => 'Ownership status updated successfully'], 200);
        
    }

    public function currentlyReading($id)
    {
        $user = User::findOrFail($id);
        $currentlyReadingBook = $user->books()->wherePivot('reading_status_id', ReadingStatus::where('estado', 'leyendo')->first()->id)->first();
        
        if ($currentlyReadingBook) {
            $wishCount = $currentlyReadingBook->users()->wherePivot('reading_status_id', ReadingStatus::where('estado', 'leer')->first()->id)->count();
            return response()->json(['book' => $currentlyReadingBook, 'wishCount' => $wishCount]);
        }

        return response()->json(['book' => null, 'wishCount' => 0]);
    }

    public function mostWishedBookOfMonth()
    {
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;

        $desiredStatus = ReadingStatus::where('estado', 'leer')->first();

        if (!$desiredStatus) {
            return response()->json(['book' => null, 'wishCount' => 0]);
        }

        $mostWishedBook = DB::table('book_user')
            ->select('book_id', DB::raw('count(*) as wish_count'))
            ->where('reading_status_id', $desiredStatus->id)
            ->whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->groupBy('book_id')
            ->orderByDesc('wish_count')
            ->first();

        if (!$mostWishedBook) {
            return response()->json(['book' => null, 'wishCount' => 0]);
        }

        $book = Book::find($mostWishedBook->book_id);

        return response()->json(['book' => $book, 'wishCount' => $mostWishedBook->wish_count]);
    }

    public function getUsersSharingBook($id)
    {
        $sharedStatus = OwnershipStatus::where('estado', 'compartir')->first();

        $book = Book::findOrFail($id);

        $usersSharingBook = $book->users()->wherePivot('ownership_status_id', $sharedStatus->id)->get();

        return response()->json($usersSharingBook);
    }

    public function requestLoan(Request $request, $id)
    {
        try {
            $request->validate([
                'lender_id' => 'required|exists:users,id',
            ]);

            $book = Book::findOrFail($id);
            $borrower = Auth::user();
            $lender = User::findOrFail($request->lender_id);

            Loan::create([
                'book_id' => $book->id,
                'user_id' => $id,
                'status' => 'solicitado',
            ]);

            return response()->json(['message' => 'La solicitud de préstamo ha sido enviada.'], 200);
        
        } catch (\Exception $e) {
            Log::error('Error requesting book loan: ' . $e->getMessage());
            return response()->json(['message' => 'Error al solicitar el libro'], 500);
        }
    }

}
