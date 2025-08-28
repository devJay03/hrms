<?php

use App\Http\Controllers\AmenitiesController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('user-page', function () {
        return Inertia::render('users');
    });

    Route::resource('users', UserController::class);
    Route::resource('amenities', AmenitiesController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
