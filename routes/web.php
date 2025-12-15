<?php

use App\Http\Controllers\ContextController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // CRUD para notas
    Route::resource('notes', NoteController::class)->except(['index']);

    Route::get('notes/create/{context}', [NoteController::class, 'createByContext'])->name('notes.create.byContext');

    // CRUD para contextos
    Route::resource('contexts', ContextController::class);

    // CRUD para etiquetas
    Route::resource('tags', TagController::class)->except(['show']);
});

require __DIR__ . '/auth.php';
