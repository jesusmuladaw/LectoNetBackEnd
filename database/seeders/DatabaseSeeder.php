<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            PaisSeeder::class,
            CiudadSeeder::class,
            UserSeeder::class,
            IdiomaSeeder::class,
            CategoriaSeeder::class,
            GeneroSeeder::class,
            TematicaSeeder::class,
            PostSeeder::class,
            
            BookSeeder::class,
            ReadingStatusSeeder::class,
            OwnershipStatusSeeder::class,
            BookUserSeeder::class,
            LikeSeeder::class,

        ]);
    }
}
