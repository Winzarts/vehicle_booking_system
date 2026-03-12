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
        Schema::create('log_service', function (Blueprint $table) {
            $table->id('id_log');
            $table->unsignedBigInteger('id_kendaraan')->nullable();
            $table->date('tanggal_service')->nullable();
            $table->text('description')->nullable();
            $table->integer('cost')->nullable();

            $table->foreign('id_kendaraan')
                ->references('id_kendaraan')
                ->on('kendaraan')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('log_services');
    }
};
