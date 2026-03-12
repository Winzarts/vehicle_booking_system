<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FuelLog extends Model
{
    protected $table = 'fuel_logs';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'id_kendaraan',
        'tanggal',
        'fuel_amount',
        'cost',
    ];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'id_kendaraan', 'id_kendaraan');
    }
}
