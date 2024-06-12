<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\Categoria;
use App\Models\Genero;
use App\Models\Idioma;
use App\Models\Tematica;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'titulo' => $this->faker->sentence(3),
            'autor' => $this->faker->name,
            'foto' => '1718102336-El señor de los anillos.jpg',
            'descripcion' => implode(' ', $this->faker->paragraphs()),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Book $book) {
            $idioma = Idioma::inRandomOrder()->first();
            $tematica = Tematica::inRandomOrder()->first();
            $categoria = Categoria::inRandomOrder()->first();
            $genero = Genero::inRandomOrder()->first();

            $book->idiomas()->attach($idioma);
            $book->tematicas()->attach($tematica);
            $book->categorias()->attach($categoria);
            $book->generos()->attach($genero);
        });
    }
}
