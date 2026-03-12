<?php

use App\Models\User;
use App\Models\Vehicle;
use App\Models\Driver;
use Illuminate\Support\Facades\Hash;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "Starting safe seed..." . PHP_EOL;

// Ensure users exist
$users = [
    ['username' => 'admin', 'email' => 'admin@vehicle.com', 'role' => 'admin'],
    ['username' => 'manager_ops', 'email' => 'manager@vehicle.com', 'role' => 'approver'],
    ['username' => 'head_pool', 'email' => 'head@vehicle.com', 'role' => 'approver'],
    ['username' => 'agus_driver', 'email' => 'agus@vehicle.com', 'role' => 'driver'],
];

foreach ($users as $u) {
    User::updateOrCreate(
        ['username' => $u['username']],
        [
            'email' => $u['email'],
            'password' => Hash::make('password'),
            'role' => $u['role']
        ]
    );
}

// Seed Vehicles if empty
if (Vehicle::count() == 0) {
    $vehicles = [
        ['nama_kendaraan' => 'Toyota Hiace', 'tipe_kendaraan' => 'Angkutan Orang', 'plat_nomor' => 'B 1234 ABC', 'milik_perusahaan' => 1, 'pemilik' => 'Perusahaan Utama', 'lokasi' => 'Kantor Pusat'],
        ['nama_kendaraan' => 'Isuzu Elf', 'tipe_kendaraan' => 'Angkutan Orang', 'plat_nomor' => 'B 5678 DEF', 'milik_perusahaan' => 1, 'pemilik' => 'Perusahaan Utama', 'lokasi' => 'Kantor Cabang'],
        ['nama_kendaraan' => 'Mitsubishi Fuso', 'tipe_kendaraan' => 'Angkutan Barang', 'plat_nomor' => 'B 9012 GHI', 'milik_perusahaan' => 1, 'pemilik' => 'Perusahaan Utama', 'lokasi' => 'Tambang Nickel - Site A'],
        ['nama_kendaraan' => 'Hino Ranger', 'tipe_kendaraan' => 'Angkutan Barang', 'plat_nomor' => 'B 3456 JKL', 'milik_perusahaan' => 0, 'pemilik' => 'Vendor Sewa Maju', 'lokasi' => 'Tambang Nickel - Site B'],
    ];

    foreach ($vehicles as $v) {
        Vehicle::create(array_merge($v, ['status' => 'baik']));
    }
    echo "Vehicles seeded." . PHP_EOL;
} else {
    echo "Vehicles already exist." . PHP_EOL;
}

// Ensure driver profile for agus_driver
$driverUser = User::where('username', 'agus_driver')->first();
if ($driverUser && Driver::where('pengemudi', $driverUser->id_user)->count() == 0) {
    Driver::create([
        'nama_driver' => 'Agus Supriatna',
        'nomor_hp' => '08123456789',
        'status' => 'ready',
        'pengemudi' => $driverUser->id_user
    ]);
    echo "Driver profile created." . PHP_EOL;
}

echo "Safe seed complete." . PHP_EOL;
