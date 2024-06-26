<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookUser>
 */
class BookUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'user_id' => User::all()->random()->id,
            'book_id' => Book::all()->random()->id,
            'reading_status_id' => $this->faker->numberBetween(1, 3), 
            'ownership_status_id' => $this->faker->numberBetween(1, 3), 
        ];
    }
}
