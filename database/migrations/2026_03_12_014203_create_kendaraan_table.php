<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('kendaraan', function (Blueprint $table) {
            $table->id('id_kendaraan');
            $table->string('nama_kendaraan', 100)->nullable();
            $table->string('tipe_kendaraan', 30)->nullable();
            $table->string('pemilik')->nullable();
            $table->string('plat_nomor', 12)->nullable();
            $table->enum('status', ['baik', 'servis', 'rusak'])->default('baik');
            $table->string('lokasi')->nullable(); // e.g., 'Kantor Pusat', 'Tambang A', etc.
            $table->boolean('milik_perusahaan')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kendaraan');
    }
};
