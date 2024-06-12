<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
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
            'titulo' => $this->faker->sentence,
            'foto' => ('1717095447-luca-bravo-VowIFDxogG4-unsplash.jpg'),
            'contenido' => $this->faker->paragraph,
        ];
    }
}
