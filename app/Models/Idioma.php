<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Idioma extends Model
{
    use HasFactory;

    protected $fillable = ['idioma'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'idioma_user');
    }

    public function books()
    {
        return $this->belongsToMany(Book::class, 'book_idioma');
    }
}
