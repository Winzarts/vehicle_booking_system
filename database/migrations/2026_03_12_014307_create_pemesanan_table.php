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
        Schema::create('pemesanan', function (Blueprint $table) {
            $table->id('id_pemesanan');
            $table->unsignedBigInteger('id_kendaraan')->nullable();
            $table->unsignedBigInteger('id_driver')->nullable();
            $table->unsignedBigInteger('dipesan_oleh')->nullable();
            $table->dateTime('tanggal_keberangkatan')->nullable();
            $table->dateTime('tanggal_selesai')->nullable();
            $table->text('destinasi')->nullable();
            $table->enum('status', ['pending', 'disetujui', 'ditolak'])->default('pending');
            $table->dateTime('tanggal_pemesanan')->useCurrent();
            $table->enum('driver_status',['pending','accepted','rejected'])->default('pending');

            $table->foreign('id_kendaraan')
                ->references('id_kendaraan')
                ->on('kendaraan')
                ->cascadeOnDelete();

            $table->foreign('id_driver')
                ->references('id_driver')
                ->on('driver');

            $table->foreign('dipesan_oleh')
                ->references('id_user')
                ->on('users')
                ->cascadeOnDelete();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemesanan');
    }
};
