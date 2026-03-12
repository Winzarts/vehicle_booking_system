<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceLog extends Model
{
    protected $table = 'log_service';
    protected $primaryKey = 'id_log';
    public $timestamps = false;

    protected $fillable = [
        'id_kendaraan',
        'tanggal_service',
        'description',
        'cost',
    ];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'id_kendaraan', 'id_kendaraan');
    }
}
