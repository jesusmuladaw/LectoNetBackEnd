<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $fillable = [
        'titulo',
        'autor',
        'descripcion',
        'foto',
    ];
        
    public function idiomas()
    {
        return $this->belongsToMany(Idioma::class, 'book_idioma');
    }

    public function tematicas()
    {
        return $this->belongsToMany(Tematica::class, 'book_tematica');
    }

    public function generos()
    {
        return $this->belongsToMany(Genero::class, 'book_genero');
    }

    public function categorias()
    {
        return $this->belongsToMany(Categoria::class, 'book_categoria');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'book_user')->withPivot(['reading_status_id', 'ownership_status_id'])->withTimestamps();
    }

    public function loans()
    {
        return $this->hasMany(Loan::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

 
    public function likes()
    {
        return $this->belongsToMany(User::class, 'likes')->withTimestamps();
    }

}
