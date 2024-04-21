<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'apellidos',
        'email',
        'password',
        'edad',
        'descripcion',
        'direccion_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    //Relación 1:1 con la tabla dirección.
    public function direccion()
    {
        return $this->hasOne(Direccion::class);
    }

    //Relación 1:N de Usuarios y Publicaciones (un usuario tiene muchas publicaciones).
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function idiomas(): BelongsToMany
    {
        return $this->belongsToMany(Idioma::class);
    }
}
