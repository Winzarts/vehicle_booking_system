<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\Driver;
use Illuminate\Support\Facades\Hash;

class InitialDataSeeder extends Seeder
{
    public function run(): void
    {
        // Users
        $admin = User::create([
            'username' => 'admin',
            'email' => 'admin@mining.com',
            'password' => 'password', // hashed via model casts if using Laravel 11/12 default or manual hashing
            'role' => 'admin',
        ]);

        $approver1 = User::create([
            'username' => 'manager1',
            'email' => 'manager1@mining.com',
            'password' => 'password',
            'role' => 'approver',
        ]);

        $approver2 = User::create([
            'username' => 'headofpool',
            'email' => 'head@mining.com',
            'password' => 'password',
            'role' => 'approver',
        ]);

        $driverUser = User::create([
            'username' => 'driver1',
            'email' => 'driver1@mining.com',
            'password' => 'password',
            'role' => 'driver',
        ]);

        // Drivers
        Driver::create([
            'nama_driver' => 'Budi Santoso',
            'nomor_hp' => '081234567890',
            'status' => 'ready',
            'pengemudi' => $driverUser->id_user,
        ]);

        // Vehicles
        $locations = ['Kantor Pusat', 'Kantor Cabang', 'Tambang 1', 'Tambang 2', 'Tambang 3', 'Tambang 4', 'Tambang 5', 'Tambang 6'];
        
        $vehicles = [
            ['nama' => 'Toyota HiAce', 'tipe' => 'Angkutan Orang', 'plat' => 'B 1234 XY', 'milik' => true],
            ['nama' => 'Mitsubishi Triton', 'tipe' => 'Angkutan Barang', 'plat' => 'B 5678 ZA', 'milik' => true],
            ['nama' => 'Isuzu ELF', 'tipe' => 'Angkutan Orang', 'plat' => 'B 9012 BC', 'milik' => false],
            ['nama' => 'Hino Ranger', 'tipe' => 'Angkutan Barang', 'plat' => 'B 3456 DE', 'milik' => true],
            ['nama' => 'Toyota Avanza', 'tipe' => 'Angkutan Orang', 'plat' => 'B 7890 FG', 'milik' => false],
            ['nama' => 'Scania Truck', 'tipe' => 'Angkutan Barang', 'plat' => 'B 1357 HI', 'milik' => true],
        ];

        foreach ($vehicles as $index => $v) {
            Vehicle::create([
                'nama_kendaraan' => $v['nama'],
                'tipe_kendaraan' => $v['tipe'],
                'plat_nomor' => $v['plat'],
                'status' => 'baik',
                'lokasi' => $locations[$index % count($locations)],
                'milik_perusahaan' => $v['milik'],
                'pemilik' => $admin->id_user,
            ]);
        }
    }
}
