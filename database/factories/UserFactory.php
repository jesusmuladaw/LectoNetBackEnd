<?php

namespace Database\Factories;

use App\Models\Direccion;
use App\Models\Idioma;
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
        return [
            'name' => fake()->firstName(),
            'apellidos' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'edad' => fake()->numberBetween(18,90),
            'descripcion' => Str::limit(fake()->text(), 150),
            'foto' => '_ea1a1366-6dd7-48e0-90cf-414229ef58e2.jfif',
            'created_at' => now(),
            'updated_at' => now(),
        ];

    }

    public function withDireccion(){
        return $this->state(function (array $datos){
            return [
                'direccion_id' => Direccion::factory()->create()->id,
            ];
        });
    }

    public function withIdiomas($cantidad = 1){
        return $this->state(function(array $datos) use ($cantidad) {
            $languageId = Idioma::inRandomOrder()->limit($cantidad)->pluck('id')->toArray();
            return ['idioma_id' => $languageId];  
        });
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
