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
            $table->foreign('direccion_id')->references('id')->on('direccions')->onDelete('set null');
            $table->foreign('idioma_id')->references('id')->on('idiomas')->onDelete('set null');
        });

        Schema::table('books', function (Blueprint $table) {
            $table->foreign('idioma_id')->references('id')->on('idiomas')->onDelete('set null');
            $table->foreign('tematica_id')->references('id')->on('tematicas')->onDelete('set null');
            $table->foreign('categoria_id')->references('id')->on('categorias')->onDelete('set null');
            $table->foreign('genero_id')->references('id')->on('generos')->onDelete('set null');
        });

        Schema::table('direccions', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });

        Schema::table('idiomas', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('book_id')->references('id')->on('books')->onDelete('cascade');
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::table('tematicas', function (Blueprint $table) {
            $table->foreign('book_id')->references('id')->on('books')->onDelete('cascade');
        });

        Schema::table('generos', function (Blueprint $table) {
            $table->foreign('book_id')->references('id')->on('books')->onDelete('cascade');
        });

        Schema::table('categorias', function (Blueprint $table) {
            $table->foreign('book_id')->references('id')->on('books')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign('direccion_id');
            $table->dropForeign('idioma_id');
        });

        Schema::table('books', function (Blueprint $table) {
            $table->dropForeign('idioma_id');
            $table->dropForeign('tematica_id');
            $table->dropForeign('categoria_id');
            $table->dropForeign('genero_id');
        });
        Schema::table('direccions', function (Blueprint $table) {
            $table->dropForeign('user_id');
        });

        Schema::table('direccions', function (Blueprint $table) {
            $table->dropForeign('user_id');
            $table->dropForeign('book_id');
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
