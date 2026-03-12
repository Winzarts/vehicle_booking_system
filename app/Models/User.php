<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'id_user';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'email',
        'username',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'dipesan_oleh', 'id_user');
    }

    public function approvals()
    {
        return $this->hasMany(Approval::class, 'id_penyetuju', 'id_user');
    }

    public function vehicles()
    {
        return $this->hasMany(Vehicle::class, 'pemilik', 'id_user');
    }

    public function driverProfile()
    {
        return $this->hasOne(Driver::class, 'pengemudi', 'id_user');
    }

    public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class, 'id_user', 'id_user');
    }
}
