<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'contenido',
        'user_id',
    ];


    //Relación 1:N con usuarios.
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
