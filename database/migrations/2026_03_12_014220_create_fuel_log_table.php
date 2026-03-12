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
        Schema::create('fuel_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_kendaraan')->nullable();
            $table->date('tanggal')->nullable();
            $table->string('fuel_amount', 20)->nullable();
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
        Schema::dropIfExists('fuel_log');
    }
};
