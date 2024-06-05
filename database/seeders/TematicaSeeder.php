<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TematicaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tematicas = [
            ['tematica' => 'Literatura'],
            ['tematica' => 'Consulta'],
            ['tematica' => 'Artística'],
            ['tematica' => 'Divulgativa'],
            ['tematica' => 'De texto'],
            ['tematica' => 'Técnica'],
            ['tematica' => 'Práctica'],
            ['tematica' => 'Religiosa'],
            ['tematica' => 'Autoayuda'],
            ['tematica' => 'Infantil'],
        ];

        DB::table('tematicas')->insert($tematicas);
    }
}
