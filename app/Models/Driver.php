<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    protected $table = 'driver';
    protected $primaryKey = 'id_driver';
    public $timestamps = false;

    protected $fillable = [
        'nama_driver',
        'nomor_hp',
        'status',
        'pengemudi',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'pengemudi', 'id_user');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'id_driver', 'id_driver');
    }
}
