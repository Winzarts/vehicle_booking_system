<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    protected $table = 'log_aktivitas';
    protected $primaryKey = 'id_aktivitas';
    public $timestamps = false; // created_at exists but managed by DB default

    protected $fillable = [
        'id_user',
        'aksi',
        'description',
        'created_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }
}
