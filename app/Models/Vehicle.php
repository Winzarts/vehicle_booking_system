<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $table = 'kendaraan';
    protected $primaryKey = 'id_kendaraan';
    public $timestamps = false;

    protected $fillable = [
        'nama_kendaraan',
        'tipe_kendaraan',
        'pemilik',
        'plat_nomor',
        'status',
        'lokasi',
        'milik_perusahaan',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'pemilik', 'id_user');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'id_kendaraan', 'id_kendaraan');
    }

    public function fuelLogs()
    {
        return $this->hasMany(FuelLog::class, 'id_kendaraan', 'id_kendaraan');
    }

    public function serviceLogs()
    {
        return $this->hasMany(ServiceLog::class, 'id_kendaraan', 'id_kendaraan');
    }
}
