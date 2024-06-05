<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tematica extends Model
{
    use HasFactory;

    protected $fillable = ['tematica'];

    public function books()
    {
        return $this->belongsToMany(Book::class, 'book_tematica');
    }
}
