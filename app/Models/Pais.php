<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pais extends Model
{
    use HasFactory;

    protected $table = 'pais';

    protected $fillable = [
        'nombre',
    ];

    public function ciudades()
    {
        return $this->hasMany(Ciudad::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
