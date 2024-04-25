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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('titulo', 75);
            $table->string('autor', 100);
            $table->unsignedBigInteger('idioma_id')->nullable();
            $table->unsignedBigInteger('tematica_id')->nullable();
            $table->unsignedBigInteger('categoria_id')->nullable();
            $table->unsignedBigInteger('genero_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
