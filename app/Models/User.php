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
        'idioma_id',
        'foto',
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


    public function direccion()
    {
        return $this->hasOne(Direccion::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function idiomas()
    {
        return $this->belongsToMany(Idioma::class, 'idioma_user');
    }

    public function books()
    {
        return $this->belongsToMany(Book::class, 'book_user')->withPivot('reading_status_id', 'ownership_status_id')->withTimestamps();
    }

    public function loansAsLender()
    {
        return $this->hasMany(Loan::class, 'lender_id');
    }

    public function loansAsBorrower()
    {
        return $this->hasMany(Loan::class, 'borrower_id');
    }
    public function pais()
    {
        return $this->belongsTo(Pais::class, 'pais_id');
    }

    public function ciudad()
    {
        return $this->belongsTo(Ciudad::class, 'ciudad_id');
    }

    public function wishListBooks()
    {
        return $this->belongsToMany(Book::class, 'book_user')
                    ->withPivot('reading_status_id')
                    ->wherePivot('reading_status_id', ReadingStatus::where('estado', 'leer')->first()->id);
    }

    public function booksToShare()
    {
        return $this->belongsToMany(Book::class, 'book_user')
                    ->withPivot('ownership_status_id')
                    ->wherePivot('ownership_status_id', OwnershipStatus::where('estado', 'compartir')->first()->id);
    }

    public function likedBooks()
    {
        return $this->belongsToMany(Book::class, 'likes')->withTimestamps();
    }
}
