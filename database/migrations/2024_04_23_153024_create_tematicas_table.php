<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\ForeignKeyDefinition;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tematicas', function (Blueprint $table) {
            $table->id();
            $table->enum('tematica', ['Literatura', 'Consulta', 'Artística', 'Divulgativa', 'De texto', 'Técnica', 'Práctica', 'Religiosa', 'Autoayuda', 'Infantil']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tematicas');
    }
};
