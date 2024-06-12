<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('books')->insert([
            'titulo' => 'libro1',
            'autor' => 'autor1',
            'foto' => 'descarta (1).jfif',
            'descripcion' => 'descripción',
        ]);
        DB::table('books')->insert([
            'titulo' => 'libro2',
            'autor' => 'autor2',
            'foto' => 'descarta (2).jfif',
            'descripcion' => 'descripción',
        ]);
        DB::table('books')->insert([
            'titulo' => 'libro3',
            'autor' => 'autor3',
            'foto' => 'descarta (3).jfif',
            'descripcion' => 'descripción',
        ]);
        DB::table('books')->insert([
            'titulo' => 'libro4',
            'autor' => 'autor4',
            'foto' => 'descarta.jfif',
            'descripcion' => 'descripción',
        ]);
        DB::table('books')->insert([
            'titulo' => 'libro5',
            'autor' => 'autor5',
            'foto' => 'descarta.png',
            'descripcion' => 'descripción',
        ]);
        DB::table('books')->insert([
            'titulo' => 'libro6',
            'autor' => 'autor6',
            'foto' => 'images (1).jfif',
            'descripcion' => 'descripción',
        ]);
        DB::table('books')->insert([
            'titulo' => 'libro7',
            'autor' => 'autor7',
            'foto' => 'images (2).jfif',
            'descripcion' => 'descripción',
        ]);
        DB::table('books')->insert([
            'titulo' => 'libro8',
            'autor' => 'autor8',
            'foto' => 'images (3).jfif',
            'descripcion' => 'descripción',
        ]);
        DB::table('books')->insert([
            'titulo' => 'libro9',
            'autor' => 'autor9',
            'foto' => 'images (4).jfif',
            'descripcion' => 'descripción',
        ]);
        DB::table('books')->insert([
            'titulo' => 'libro10',
            'autor' => 'autor10',
            'foto' => 'images (5).jfif',
            'descripcion' => 'descripción',
        ]);
        DB::table('books')->insert([
            'titulo' => 'libro11',
            'autor' => 'autor11',
            'foto' => 'images (6).jfif',
            'descripcion' => 'descripción',
        ]);
        DB::table('books')->insert([
            'titulo' => 'libro12',
            'autor' => 'autor12',
            'foto' => 'images (7).jfif',
            'descripcion' => 'descripción',
        ]);
        DB::table('books')->insert([
            'titulo' => 'libro13',
            'autor' => 'autor13',
            'foto' => 'images (8).jfif',
            'descripcion' => 'descripción',
        ]);
        DB::table('books')->insert([
            'titulo' => 'libro14',
            'autor' => 'autor14',
            'foto' => 'images (9).jfif',
            'descripcion' => 'descripción',
        ]);
        DB::table('books')->insert([
            'titulo' => 'libro15',
            'autor' => 'autor15',
            'foto' => 'images (10).jfif',
            'descripcion' => 'descripción',
        ]);
        DB::table('books')->insert([
            'titulo' => 'libro16',
            'autor' => 'autor16',
            'foto' => 'images (11).jfif',
            'descripcion' => 'descripción',
        ]);
        DB::table('books')->insert([
            'titulo' => 'libro17',
            'autor' => 'autor17',
            'foto' => 'images.jfif',
            'descripcion' => 'descripción',
        ]);
        DB::table('books')->insert([
            'titulo' => 'libro18',
            'autor' => 'autor18',
            'foto' => 'images.png',
            'descripcion' => 'descripción',
        ]);

        Book::factory(50)->create();
    }
}
