<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\BookUser;
use App\Models\Ciudad;
use App\Models\Direccion;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Foto;
use App\Models\Idioma;
use App\Models\Loan;
use App\Models\OwnershipStatus;
use App\Models\Pais;
use App\Models\ReadingStatus;
use App\Models\Status;
use App\Models\User;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $user->load('pais', 'ciudad');
        return Inertia::render('Profile/Index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'user' => $request->user(),
        ]);
    }

    public function personas(Request $request)
    {
        $user = $request->user();
        $user->load('pais', 'ciudad');
        return Inertia::render('Profile/Personas', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'user' => $request->user(),
        ]);
    }

    public function show($id)
    {
        $user = User::with('pais', 'ciudad', 'idiomas', 'likedBooks', 'books', 'wishListBooks', 'booksToShare', 'posts', 'librosPrestados', 'librosRecibidos')->findOrFail($id);
        $prestadoStatusId  = OwnershipStatus::where('estado', 'prestado')->first()->id;
        $recibidoStatusId  = OwnershipStatus::where('estado', 'recibido')->first()->id;

        $librosPrestados = BookUser::where('user_id', $id)
        ->where('ownership_status_id', $prestadoStatusId )
        ->with('book')
        ->get();

        $librosRecibidos = BookUser::where('user_id', $id)
        ->where('ownership_status_id', $recibidoStatusId )
        ->with('book')
        ->get();

        return Inertia::render('Profile/Show', [
            'usuario' => $user,

        ]);
    }

    public function edit(Request $request)
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => $request->user(),
            'paises' => Pais::all(),
            'ciudades' => Ciudad::all(),
            'idiomas' => Idioma::all(),
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        /** @var \App\Models\User */
        $user = Auth::user();
        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        if($request->hasFile('foto')){
            $f = $request->file('foto');
            $path = ('storage\images\profilePictures');
            $filename = time() . '-' . $f->getClientOriginalName();

            Storage::disk('public')->putFileAs($path, $f, $filename);
            $user->foto = $filename;
        }

        $user->pais_id = $request->input('pais_id');
        $user->ciudad_id = $request->input('ciudad_id');
        $user->idiomas()->sync(collect($request->input('idiomas'))->pluck('value'));

        $user->save();

        return Redirect::route('profile.index')->with('status', 'Profile updated successfully!');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function getBooksToShare(Request $request)
    {
        $user = $request->user();
        $booksToShare = $user->booksToShare()->get();
        return response()->json($booksToShare);
    }

    public function getWishList(Request $request)
    {
        $user = $request->user();
        $wishListBooks = $user->wishListBooks()->get();
        return response()->json($wishListBooks);
    }

    public function getUserPosts(Request $request)
    {
        $user = $request->user();
        $posts = $user->posts()->latest()->get();
        return response()->json($posts);
    }

    public function booksToShare($id)
    {
        $user = User::findOrFail($id);
        $booksToShare = $user->booksToShare()->get();
        return response()->json($booksToShare);
    }

    public function wishList($id)
    {
        $user = User::findOrFail($id);
        $wishListBooks = $user->wishListBooks()->get();
        return response()->json($wishListBooks);
    }

    public function userPosts($id)
    {
        $user = User::findOrFail($id);
        $posts = $user->posts()->orderBy('created_at', 'desc')->get();
        return response()->json($posts);
    }

    public function getUsersWithSharedBooks(Request $request)
    {
        $user = Auth::user();

        $likedBooks = $user->likedBooks;

        $categoryIds = $likedBooks->pluck('categorias.*.id')->flatten()->unique();
        $genreIds = $likedBooks->pluck('generos.*.id')->flatten()->unique();
        $tematicIds = $likedBooks->pluck('tematicas.*.id')->flatten()->unique();

        $sharedStatus = OwnershipStatus::where('estado', 'compartir')->first();

        $usersWithSharedBooks = User::where('ciudad_id', $user->ciudad_id)
            ->where('id', '!=', $user->id)
            ->whereHas('books', function ($query) use ($sharedStatus, $categoryIds, $genreIds, $tematicIds) {
                $query->where('book_user.ownership_status_id', $sharedStatus->id)
                    ->where(function ($query) use ($categoryIds, $genreIds, $tematicIds) {
                        $query->whereHas('categorias', function ($query) use ($categoryIds) {
                            $query->whereIn('categorias.id', $categoryIds);
                        })
                        ->orWhereHas('generos', function ($query) use ($genreIds) {
                            $query->whereIn('generos.id', $genreIds);
                        })
                        ->orWhereHas('tematicas', function ($query) use ($tematicIds) {
                            $query->whereIn('tematicas.id', $tematicIds);
                        });
                    });
            })
            ->count();

        return response()->json(['user_count' => $usersWithSharedBooks]);
    }

    public function getUsuariosCerca(Request $request)
    {
        $user = Auth::user();

        $likedBooks = $user->likedBooks;

        $categoryIds = $likedBooks->pluck('categorias.*.id')->flatten()->unique();
        $genreIds = $likedBooks->pluck('generos.*.id')->flatten()->unique();
        $tematicIds = $likedBooks->pluck('tematicas.*.id')->flatten()->unique();

        $sharedStatus = OwnershipStatus::where('estado', 'compartir')->first();

        $usersWithSharedBooks = User::where('ciudad_id', $user->ciudad_id)
            ->where('id', '!=', $user->id)
            ->whereHas('books', function ($query) use ($sharedStatus, $categoryIds, $genreIds, $tematicIds) {
                $query->where('book_user.ownership_status_id', $sharedStatus->id)
                    ->where(function ($query) use ($categoryIds, $genreIds, $tematicIds) {
                        $query->whereHas('categorias', function ($query) use ($categoryIds) {
                            $query->whereIn('categorias.id', $categoryIds);
                        })
                        ->orWhereHas('generos', function ($query) use ($genreIds) {
                            $query->whereIn('generos.id', $genreIds);
                        })
                        ->orWhereHas('tematicas', function ($query) use ($tematicIds) {
                            $query->whereIn('tematicas.id', $tematicIds);
                        });
                    });
            })
            ->get();

        return response()->json($usersWithSharedBooks);
    }


    public function getUsuariosGustosSimilares(Request $request)
    {
        $user = Auth::user();

        $likedBooks = $user->likedBooks;

        $categoryIds = $likedBooks->pluck('categorias.*.id')->flatten()->unique();
        $genreIds = $likedBooks->pluck('generos.*.id')->flatten()->unique();
        $tematicIds = $likedBooks->pluck('tematicas.*.id')->flatten()->unique();

        $similarUsers = User::where('id', '!=', $user->id)
            ->whereHas('likedBooks', function ($query) use ($categoryIds, $genreIds, $tematicIds) {
                $query->where(function ($query) use ($categoryIds, $genreIds, $tematicIds) {
                    $query->whereHas('categorias', function ($query) use ($categoryIds) {
                        $query->whereIn('categorias.id', $categoryIds);
                    })
                    ->orWhereHas('generos', function ($query) use ($genreIds) {
                        $query->whereIn('generos.id', $genreIds);
                    })
                    ->orWhereHas('tematicas', function ($query) use ($tematicIds) {
                        $query->whereIn('tematicas.id', $tematicIds);
                    });
                });
            })
            ->get();

        return response()->json($similarUsers);
    }

    public function getUsuariosInteresados(Request $request)
    {
        /** @var \App\Models\User */
        $user = Auth::user();

        $sharedStatus = OwnershipStatus::where('estado', 'compartir')->first();

        $sharedBooks = $user->books()
            ->wherePivot('ownership_status_id', $sharedStatus->id)
            ->get();

        $sharedBookIds = $sharedBooks->pluck('id');

        $readStatus = ReadingStatus::where('estado', 'leer')->first();

        $interestedUsers = User::whereHas('books', function ($query) use ($sharedBookIds, $readStatus) {
            $query->whereIn('books.id', $sharedBookIds)
                  ->where('book_user.reading_status_id', $readStatus->id);
        })
        ->where('id', '!=', Auth::id())
        ->get();

        return response()->json($interestedUsers);
    }

    public function getUsersWithBooksOfInterest(Request $request)
    {
        /** @var \App\Models\User */
        $user = Auth::user();

        $interestedBooks = $user->books()
            ->wherePivot('reading_status_id', ReadingStatus::where('estado', 'leer')->first()->id)
            ->get();

        $interestedBookIds = $interestedBooks->pluck('id');

        $sharedStatus = OwnershipStatus::where('estado', 'compartir')->first();
        $usersWithSharedBooks = User::whereHas('books', function ($query) use ($interestedBookIds, $sharedStatus) {
            $query->whereIn('books.id', $interestedBookIds)
                ->where('book_user.ownership_status_id', $sharedStatus->id);
        })
        ->where('id', '!=', Auth::id())
        ->get();

        return response()->json($usersWithSharedBooks);
    }


    public function getReadingBooks($userId)
    {
        $readingStatus = ReadingStatus::where('estado', 'leyendo')->first();

        if (!$readingStatus) {
            return response()->json(['error' => 'Reading status not found.'], 404);
        }

        $user = User::findOrFail($userId);

        $readingBooks = $user->books()->wherePivot('reading_status_id', $readingStatus->id)->get();

        return response()->json($readingBooks);
    }


    public function getUsersWelcome()
    {
        $users = User::whereBetween('edad', [20, 40])
            ->take(20)
            ->get(['id', 'name', 'foto']);
        
        return response()->json($users);
    }


}


