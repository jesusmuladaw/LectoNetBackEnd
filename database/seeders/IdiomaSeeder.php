<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IdiomaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $idiomas = [
            ['idioma' => 'Español'],
            ['idioma' => 'Inglés'],
            ['idioma' => 'Francés'],
            ['idioma' => 'Alemán'],
            ['idioma' => 'Chino'],
            ['idioma' => 'Hindi'],
            ['idioma' => 'Árabe'],
            ['idioma' => 'Bengalí'],
            ['idioma' => 'Ruso'],
            ['idioma' => 'Portugués'],
            ['idioma' => 'Japonés'],
            ['idioma' => 'Turco'],
            ['idioma' => 'Coreano'],
            ['idioma' => 'Italiano'],
            ['idioma' => 'Neerlandés'],
            ['idioma' => 'Sueco'],
            ['idioma' => 'Noruego'],
            ['idioma' => 'Danés'],
            ['idioma' => 'Finlandés'],
            ['idioma' => 'Polaco'],
            ['idioma' => 'Checo'],
            ['idioma' => 'Húngaro'],
            ['idioma' => 'Griego'],
            ['idioma' => 'Hebreo'],
            ['idioma' => 'Vietnamita'],
            ['idioma' => 'Tailandés'],
            ['idioma' => 'Indonesio'],
            ['idioma' => 'Malayo'],
            ['idioma' => 'Filipino'],
            ['idioma' => 'Suajili'],
            ['idioma' => 'Afrikáans'],
            ['idioma' => 'Zulu'],
            ['idioma' => 'Xhosa'],
            ['idioma' => 'Igbo'],
            ['idioma' => 'Yoruba'],
            ['idioma' => 'Tagalo'],
            ['idioma' => 'Maorí'],
            ['idioma' => 'Samoano'],
            ['idioma' => 'Hawaiano'],
            ['idioma' => 'Gaélico Escocés'],
            ['idioma' => 'Irlandés'],
            ['idioma' => 'Galés'],
            ['idioma' => 'Bretón'],
            ['idioma' => 'Catalán'],
            ['idioma' => 'Vasco'],
            ['idioma' => 'Gallego'],
            ['idioma' => 'Ucraniano'],
            ['idioma' => 'Búlgaro'],
            ['idioma' => 'Serbio'],
            ['idioma' => 'Croata'],
            ['idioma' => 'Bosnio'],
            ['idioma' => 'Esloveno'],
            ['idioma' => 'Eslovaco'],
            ['idioma' => 'Estonio'],
            ['idioma' => 'Letón'],
            ['idioma' => 'Lituano'],
            ['idioma' => 'Macedonio'],
            ['idioma' => 'Albanés'],
            ['idioma' => 'Maltés'],
            ['idioma' => 'Luxemburgués'],
            ['idioma' => 'Islandés'],
            ['idioma' => 'Georgiano'],
            ['idioma' => 'Armenio'],
            ['idioma' => 'Kazajo'],
            ['idioma' => 'Uzbeco'],
            ['idioma' => 'Tayiko'],
            ['idioma' => 'Kirguís'],
            ['idioma' => 'Turcomano'],
            ['idioma' => 'Mongol'],
            ['idioma' => 'Nepalí'],
            ['idioma' => 'Sinhala'],
            ['idioma' => 'Tamil'],
            ['idioma' => 'Bengalí'],
            ['idioma' => 'Panjabí'],
            ['idioma' => 'Gujarātī'],
            ['idioma' => 'Maratí'],
            ['idioma' => 'Kannada'],
            ['idioma' => 'Malayalam'],
            ['idioma' => 'Telugú'],
            ['idioma' => 'Urdu'],
            ['idioma' => 'Pashto'],
            ['idioma' => 'Persa'],
            ['idioma' => 'Kurdo'],
            ['idioma' => 'Azerí'],
            ['idioma' => 'Tártara'],
            ['idioma' => 'Chechén'],
            ['idioma' => 'Bashkir'],
            ['idioma' => 'Udmurt'],
            ['idioma' => 'Mari'],
            ['idioma' => 'Komi'],
            ['idioma' => 'Chuvash'],
            ['idioma' => 'Yakut'],
            ['idioma' => 'Tuvano'],
            ['idioma' => 'Buriat'],
            ['idioma' => 'Kalmuk'],
            ['idioma' => 'Chino Cantonés'],
            ['idioma' => 'Tibetano'],
            ['idioma' => 'Birmano'],
            ['idioma' => 'Lao'],
            ['idioma' => 'Jemer'],
            ['idioma' => 'Hmong'],
            ['idioma' => 'Balochi'],
            ['idioma' => 'Sindhi'],
            ['idioma' => 'Saraiki'],
            ['idioma' => 'Saraiki'],
            ['idioma' => 'Malagasy'],
            ['idioma' => 'Haitiano Creole'],
        ];
        DB::table('idiomas')->insert($idiomas);
    }
}
