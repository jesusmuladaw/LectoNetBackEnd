<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categorias = [
            ['categoria' => 'Aventura'],
            ['categoria' => 'Ciencia ficción'],
            ['categoria' => 'Romance'],
            ['categoria' => 'Misterio'],
            ['categoria' => 'Fantasía'],
            ['categoria' => 'Cómic/manga'],
            ['categoria' => 'Acción'],
            ['categoria' => 'Comedia'],
            ['categoria' => 'Suspense'],
            ['categoria' => 'Terror'],
        ];

        DB::table('categorias')->insert($categorias);
    }
}
