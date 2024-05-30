<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GeneroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $generos = [
            ['genero' => 'Narrativo'],
            ['genero' => 'Lírico'],
            ['genero' => 'Poético'],
            ['genero' => 'Dramático'],
            ['genero' => 'Didáctico'],
        ];

        DB::table('generos')->insert($generos);
    }
}
