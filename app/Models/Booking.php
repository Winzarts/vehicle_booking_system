<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $table = 'pemesanan';
    protected $primaryKey = 'id_pemesanan';
    public $timestamps = false;

    protected $fillable = [
        'id_kendaraan',
        'id_driver',
        'dipesan_oleh',
        'tanggal_keberangkatan',
        'tanggal_selesai',
        'destinasi',
        'status',
        'tanggal_pemesanan',
        'driver_status',
    ];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'id_kendaraan', 'id_kendaraan');
    }

    public function driver()
    {
        return $this->belongsTo(Driver::class, 'id_driver', 'id_driver');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'dipesan_oleh', 'id_user');
    }

    public function approvals()
    {
        return $this->hasMany(Approval::class, 'id_booking', 'id_pemesanan');
    }
}
