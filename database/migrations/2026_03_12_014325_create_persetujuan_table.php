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
        Schema::create('persetujuan', function (Blueprint $table) {
            $table->id('id_persetujuan');
            $table->unsignedBigInteger('id_booking')->nullable();
            $table->unsignedBigInteger('id_penyetuju')->nullable();
            $table->string('level',1)->nullable();
            $table->enum('status',['disetujui','pending','ditolak'])->default('pending');
            $table->dateTime('approved_at')->useCurrent();

            $table->foreign('id_booking')
                ->references('id_pemesanan')
                ->on('pemesanan')
                ->cascadeOnDelete();

            $table->foreign('id_penyetuju')
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
        Schema::dropIfExists('persetujuan');
    }
};
