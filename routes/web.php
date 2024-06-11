<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\FotoController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
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
Route::get('/api/users/welcome', [ProfileController::class, 'getUsersWelcome'])->name('users.welcome');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.index');
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
    Route::get('/api/users/with-books-of-interest', [ProfileController::class, 'getUsersWithBooksOfInterest'])->name('users.withBooksOfInterest');


    Route::get('/user/{id}/books-to-share', [ProfileController::class, 'booksToShare'])->name('users.booksToShare');
    Route::get('/user/{id}/wish-list', [ProfileController::class, 'wishList'])->name('users.wishList');
    Route::get('/user/{id}/posts', [ProfileController::class, 'userPosts'])->name('users.posts');

    Route::get('/books', [BookController::class, 'index'])->name('books.index');
    Route::get('/books/create', [BookController::class, 'create'])->name('books.create');
    Route::get('/books/{id}/edit', [BookController::class, 'edit'])->name('books.edit');
    Route::get('/books/{id}', [BookController::class, 'show'])->name('books.show');
    Route::post('/books', [BookController::class, 'store'])->name('books.store');
    Route::put('/books/{id}', [BookController::class, 'update'])->name('books.update');



    Route::get('/api/posts/recent', [PostController::class, 'getRecentPosts'])->name('posts.recent');
    Route::get('/api/books/near-you', [BookController::class, 'booksNearYou'])->name('books.nearYou');
    Route::get('/api/books/recommended', [BookController::class, 'recommendedBooks'])->name('books.recommended');
    Route::get('/books/top-rated', [BookController::class, 'topLikedBooks']);
    Route::get('/api/books/wish-list', [BookController::class, 'wishListBooks'])->name('books.wishList');
    Route::get('/api/user/{id}/reading-books', [ProfileController::class, 'getReadingBooks'])->name('user.readingBooks');
    Route::get('/api/users/{id}/currently-reading', [BookController::class, 'currentlyReading']);


    Route::post('/books/{book}/like', [LikeController::class, 'like'])->name('books.like');
    Route::post('/books/{book}/unlike', [LikeController::class, 'unlike'])->name('books.unlike');
    Route::post('/books/{book}/share', [BookController::class, 'share'])->name('books.share');
    Route::post('/books/{book}/wish', [BookController::class, 'wish'])->name('books.wish');
    Route::post('/books/{book}/reading-status/{estado}', [BookController::class, 'changeReadingStatus'])->name('books.changeReadingStatus');
    Route::post('/books/{book}/ownership-status/{estado}', [BookController::class, 'changeOwnershipStatus'])->name('books.changeOwnershipStatus');
    Route::get('/books/{id}/users-sharing', [BookController::class, 'getUsersSharingBook'])->name('books.users-sharing');


    Route::get('/blog', [PostController::class, 'index'])->name('blog.index');
    Route::get('/blog/create', [PostController::class, 'create'])->name('blog.create');
    Route::post('/blog', [PostController::class, 'store'])->name('blog.store');
    Route::post('/posts/{post}/comments', [PostController::class, 'storeComment'])->name('comments.store');
    Route::get('/blog/{post}', [PostController::class, 'show'])->name('blog.show');
    Route::get('/blog/{post}/edit', [PostController::class, 'edit'])->name('blog.edit');
    Route::post('/blog/{post}', [PostController::class, 'update'])->name('blog.update');
    Route::delete('/blog/{post}', [PostController::class, 'destroy'])->name('blog.destroy');

    Route::get('/api/posts', [PostController::class, 'getPosts'])->name('api.posts');
    Route::get('/api/most-wished-book', [BookController::class, 'mostWishedBookOfMonth'])->name('books.mostWishedBook');

    Route::get('/search', [SearchController::class, 'search'])->name('search');

    Route::get('/messages', [MessageController::class, 'index'])->name('messages.index');
    Route::post('/messages', [MessageController::class, 'store'])->name('messages.store');
    
    Route::get('/conversations', [MessageController::class, 'conversations'])->name('conversations.index');
    Route::get('/messages/{userId}', [MessageController::class, 'showMessages'])->name('messages.show');


    Route::get('/users-with-shared-books', function () {
        return inertia('UsersWithSharedBooks');
    })->name('users.compartenLibros');

    Route::get('/loan-requests', [LoanController::class, 'loanRequests'])->name('loan-requests');

    Route::post('/books/{book}/request-loan', [LoanController::class, 'requestLoan'])->name('request-loan');
    Route::get('/loans', [LoanController::class, 'index'])->name('loans.index');
    Route::get('/loans/{id}', [LoanController::class, 'show'])->name('loans.show');
    Route::post('/loans/{id}/confirm', [LoanController::class, 'confirmLoan'])->name('loans.confirm');
    Route::post('/loans/{loan}/approve', [LoanController::class, 'approveLoan'])->name('loan-approve');
    Route::post('/loans/{loan}/reject', [LoanController::class, 'rejectLoan'])->name('loan-reject');
    Route::post('/loans/{loan}/return', [LoanController::class, 'returnLoan'])->name('loan-return');
    Route::post('/loans/{id}/return', [LoanController::class, 'returnBook'])->name('loans.return');
    Route::get('/loan-requests/approved', [LoanController::class, 'approvedRequests'])->name('loan-approved-requests');
    Route::get('/loan-requests/rejected', [LoanController::class, 'rejectedRequests'])->name('loan-rejected-requests');


});

require __DIR__.'/auth.php';
