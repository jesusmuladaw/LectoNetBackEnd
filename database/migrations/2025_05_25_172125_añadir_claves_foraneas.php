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
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('pais_id')->references('id')->on('pais')->onDelete('set null');
            $table->foreign('ciudad_id')->references('id')->on('ciudad')->onDelete('set null');
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign('pais_id');
            $table->dropForeign('ciudad_id');
        });

        Schema::table('books', function (Blueprint $table) {
            $table->dropForeign('idioma_id');
            $table->dropForeign('tematica_id');
            $table->dropForeign('categoria_id');
            $table->dropForeign('genero_id');
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->dropForeign('user_id');
        });

        Schema::table('tematicas', function (Blueprint $table) {
            $table->dropForeign('book_id');
        });

        Schema::table('generos', function (Blueprint $table) {
            $table->dropForeign('book_id');
        });

        Schema::table('categorias', function (Blueprint $table) {
            $table->dropForeign('book_id');
        });
    }
};
