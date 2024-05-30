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
            'edad' => 30,
            'descripcion' => 'Me encanta leer un buen libro mientras tomo café',
            'foto' => '1716626677-_8d751e2e-edb8-4a94-b304-2ac3092896db.jfif',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        User::factory(20)->create();
            

    }
}
