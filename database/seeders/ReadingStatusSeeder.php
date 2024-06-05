<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReadingStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $statuses = [
            ['estado' => 'leer'],
            ['estado' => 'leyendo'],
            ['estado' => 'leido'],
        ];

        DB::table('reading_statuses')->insert($statuses);
    }
}
