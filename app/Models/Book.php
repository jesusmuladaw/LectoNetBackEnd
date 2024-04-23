<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    public function idioma()
    {
        return $this->hasOne(Idioma::class);
    }

    public function tematica()
    {
        return $this->hasOne(Tematica::class);
    }

    public function genero()
    {
        return $this->hasOne(Genero::class);
    }

    public function categoria()
    {
        return $this->hasOne(Categoria::class);
    }
}
