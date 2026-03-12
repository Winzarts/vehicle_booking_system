<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Users
        $admin = User::create([
            'username' => 'admin',
            'email' => 'admin@nikel.com',
            'password' => \Hash::make('password'),
            'role' => 'admin',
        ]);

        $manager = User::create([
            'username' => 'manager_ops',
            'email' => 'manager@nikel.com',
            'password' => \Hash::make('password'),
            'role' => 'approver',
        ]);

        $head = User::create([
            'username' => 'head_pool',
            'email' => 'head@nikel.com',
            'password' => \Hash::make('password'),
            'role' => 'approver',
        ]);

        $driverUser = User::create([
            'username' => 'agus_driver',
            'email' => 'agus@gmail.com',
            'password' => \Hash::make('password'),
            'role' => 'driver',
        ]);

        // Drivers
        \App\Models\Driver::create([
            'nama_driver' => 'Agus Setiawan',
            'nomor_hp' => '08123456789',
            'pengemudi' => $driverUser->id_user,
            'status' => 'ready',
        ]);

        \App\Models\Driver::create([
            'nama_driver' => 'Budi Santoso',
            'nomor_hp' => '08123456780',
            'status' => 'ready',
        ]);

        // Regions/Locations
        $locations = ['Kantor Pusat', 'Kantor Cabang', 'Tambang A', 'Tambang B', 'Tambang C', 'Tambang D', 'Tambang E', 'Tambang F'];

        // Vehicles
        $vehicles = [
            ['nama' => 'Toyota Hiace 1', 'tipe' => 'Angkutan Orang', 'milik' => true, 'lokasi' => 'Kantor Pusat'],
            ['nama' => 'Isuzu Elf 1', 'tipe' => 'Angkutan Orang', 'milik' => true, 'lokasi' => 'Kantor Cabang'],
            ['nama' => 'Mitsubishi Fuso 1', 'tipe' => 'Angkutan Barang', 'milik' => true, 'lokasi' => 'Tambang A'],
            ['nama' => 'Hino Ranger 1', 'tipe' => 'Angkutan Barang', 'milik' => false, 'lokasi' => 'Tambang B'],
            ['nama' => 'Toyota Avanza 1', 'tipe' => 'Angkutan Orang', 'milik' => false, 'lokasi' => 'Tambang C'],
            ['nama' => 'Scania Dump Truck', 'tipe' => 'Angkutan Barang', 'milik' => true, 'lokasi' => 'Tambang D'],
            ['nama' => 'Bus Karyawan 1', 'tipe' => 'Angkutan Orang', 'milik' => false, 'lokasi' => 'Tambang E'],
            ['nama' => 'Nissan Diesel', 'tipe' => 'Angkutan Barang', 'milik' => true, 'lokasi' => 'Tambang F'],
        ];

        foreach ($vehicles as $v) {
            \App\Models\Vehicle::create([
                'nama_kendaraan' => $v['nama'],
                'tipe_kendaraan' => $v['tipe'],
                'milik_perusahaan' => $v['milik'],
                'lokasi' => $v['lokasi'],
                'plat_nomor' => 'B ' . rand(1000, 9999) . ' XYZ',
                'status' => 'baik',
            ]);
        }
    }
}
