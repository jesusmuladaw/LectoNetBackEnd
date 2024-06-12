<?php

namespace Database\Factories;

use App\Models\Ciudad;
use App\Models\Direccion;
use App\Models\Idioma;
use App\Models\Pais;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $pais = Pais::inRandomOrder()->first();
        $ciudad = Ciudad::where('pais_id', $pais->id)->inRandomOrder()->first();

        return [
            'name' => fake()->firstName(),
            'apellidos' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'edad' => fake()->numberBetween(18, 90),
            'descripcion' => Str::limit(fake()->text(), 150),
            'foto' => '_ea1a1366-6dd7-48e0-90cf-414229ef58e2.jfif',
            'pais_id' => $pais->id,
            'ciudad_id' => $ciudad ? $ciudad->id : null, 
            'created_at' => now(),
            'updated_at' => now(),
        ];

    }


    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
