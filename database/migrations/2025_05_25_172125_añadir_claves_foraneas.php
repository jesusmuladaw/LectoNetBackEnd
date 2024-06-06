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

        Schema::table('posts', function (Blueprint $table) {
            $table->dropForeign('user_id');
        });

    }
};
