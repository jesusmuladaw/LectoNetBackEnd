<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Like;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LikeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $users = User::all();
        $books = Book::all();

        $likes = collect();

        foreach ($users as $user) {
            $likedBooks = $books->random(rand(1, 5));
            foreach ($likedBooks as $book) {
                $existingLike = $likes->firstWhere('user_id', $user->id, 'book_id', $book->id);

                if (!$existingLike) {
                    $likes->push([
                        'user_id' => $user->id,
                        'book_id' => $book->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }

        Like::insert($likes->toArray());
    }
}
