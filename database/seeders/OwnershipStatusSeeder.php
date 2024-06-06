<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OwnershipStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $statuses = [
            ['estado' => 'compartir'],
            ['estado' => 'prestado'],
            ['estado' => 'recibido'],
            ['estado' => 'solicitado'],
        ];

        DB::table('ownership_statuses')->insert($statuses);
    }
}
