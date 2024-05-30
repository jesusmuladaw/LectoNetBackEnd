<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\FotoController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/explorar', function () {
    return Inertia::render('Explorar');
})->middleware(['auth', 'verified'])->name('explorar');

Route::get('/api/books/top-rated', [BookController::class, 'topRatedBooks'])->name('books.topRated');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profiles', [ProfileController::class, 'personas'])->name('profile.personas');
    Route::get('/profile/{id}', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/profile/books-to-share', [ProfileController::class, 'getBooksToShare'])->name('profile.booksToShare');
    Route::get('/profile/wish-list', [ProfileController::class, 'getWishList'])->name('profile.wishList');
    Route::get('/profile/posts', [ProfileController::class, 'getUserPosts'])->name('profile.userPosts');

    Route::get('/api/users-with-shared-books', [ProfileController::class, 'getUsersWithSharedBooks'])->name('users.withSharedBooks');
    Route::get('/api/users/near-you', [ProfileController::class, 'getUsuariosCerca'])->name('users.nearYou');
    Route::get('/api/users/similar-tastes', [ProfileController::class, 'getUsuariosGustosSimilares'])->name('users.similarTastes');
    Route::get('/api/users/interested', [ProfileController::class, 'getUsuariosInteresados'])->name('users.interested');

    Route::get('/user/{id}/books-to-share', [ProfileController::class, 'booksToShare'])->name('users.booksToShare');
    Route::get('/user/{id}/wish-list', [ProfileController::class, 'wishList'])->name('users.wishList');
    Route::get('/user/{id}/posts', [ProfileController::class, 'userPosts'])->name('users.posts');

    Route::get('/books', [BookController::class, 'index'])->name('books.index');
    Route::get('/books/{id}', [BookController::class, 'show'])->name('books.show');


    Route::get('/messages', [MessageController::class, 'index'])->name('messages.index');
    Route::post('/messages', [MessageController::class, 'store'])->name('messages.store');
    Route::get('/api/posts/recent', [PostController::class, 'getRecentPosts'])->name('posts.recent');
    Route::get('/api/books/near-you', [BookController::class, 'booksNearYou'])->name('books.nearYou');
    Route::get('/api/books/recommended', [BookController::class, 'recommendedBooks'])->name('books.recommended');
    Route::get('/books/top-rated', [BookController::class, 'topLikedBooks']);
    Route::get('/api/books/wish-list', [BookController::class, 'wishListBooks'])->name('books.wishList');
    Route::post('/books/{book}/like', [LikeController::class, 'like'])->name('books.like');
    Route::post('/books/{book}/unlike', [LikeController::class, 'unlike'])->name('books.unlike');
    Route::post('/books/{book}/share', [BookController::class, 'share'])->name('books.share');
    Route::post('/books/{book}/wish', [BookController::class, 'wish'])->name('books.wish');
    Route::post('/books/{book}/reading-status/{estado}', [BookController::class, 'changeReadingStatus'])->name('books.changeReadingStatus');
    Route::post('/books/{book}/ownership-status/{estado}', [BookController::class, 'changeOwnershipStatus'])->name('books.changeOwnershipStatus');

});

require __DIR__.'/auth.php';
