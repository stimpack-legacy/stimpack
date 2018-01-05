<?php
use Illuminate\Support\Str;


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
    return view('welcome');
});

Route::get('/code', function () {
    return view('code');
});

Route::get('stimpack/pluralize/{word}', function ($word){    
    return Str::plural(Str::snake(class_basename($word)));
});

Route::get('/stimpack/perform/{task}', 'TaskController@perform');