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
        Schema::create('driver', function (Blueprint $table) {
            $table->id('id_driver');
            $table->string('nama_driver', 60)->nullable();
            $table->string('nomor_hp', 13)->nullable();
            $table->enum('status', ['ready', 'bekerja', 'istirahat'])->nullable();
            $table->unsignedBigInteger('pengemudi');

            $table->foreign('pengemudi')
                ->references('id_user')
                ->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('driver');
    }
};
