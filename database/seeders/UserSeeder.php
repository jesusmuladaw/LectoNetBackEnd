<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        
        DB::table('users')->insert([
            
            'name' => 'Yisus',
            'apellidos' => 'Mula',
            'email' => 'yisus@yisus.com',
            'email_verified_at' => now(),
            'password' => Hash::make('asdfñlkj'),
            'edad' => 33,
            'descripcion' => 'Me encanta leer un buen libro mientras tomo café',
            'pais_id' => 28,
            'ciudad_id' => 641,
            'foto' => 'Foto rrss.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('users')->insert([
            
            'name' => 'Alguien',
            'apellidos' => 'Alguien',
            'email' => 'alguien@alguien.com',
            'email_verified_at' => now(),
            'password' => Hash::make('asdfñlkj'),
            'edad' => 25,
            'descripcion' => 'Me encanta leer un buen libro mientras tomo café',
            'pais_id' => 28,
            'ciudad_id' => 641,
            'foto' => '1717679962-Conejito.png',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        User::factory(600)->create();
            

    }
}
