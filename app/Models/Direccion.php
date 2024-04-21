<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Direccion extends Model
{
    use HasFactory;

    protected $fillable = [
        'calle',
        'ciudad',
        'user_id',
    ];


    //Relación 1 a 1 con la tabla Users.
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
