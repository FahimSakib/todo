<?php

use App\Http\Controllers\TodoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

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

require __DIR__.'/auth.php';

// Todo

Route::resource('todo', TodoController::class)->except(['create','edit']);
Route::put('todo-check/{id}', [TodoController::class, 'checkItem'])->name('todo.check');
Route::put('todo-check-all/{type}', [TodoController::class, 'checkAll'])->name('todo.check.all');
route::put('todo-trash/{id}', [TodoController::class, 'trashItems'])->name('todo.trash');