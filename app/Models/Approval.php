<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Approval extends Model
{
    protected $table = 'persetujuan';
    protected $primaryKey = 'id_persetujuan';
    public $timestamps = false;

    protected $fillable = [
        'id_booking',
        'id_penyetuju',
        'level',
        'status',
        'approved_at',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'id_booking', 'id_pemesanan');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'id_penyetuju', 'id_user');
    }
}
