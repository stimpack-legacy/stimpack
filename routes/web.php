<?php
use Illuminate\Support\Str;
use App\Jobs\ProcessTask;

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
    chdir("../../");
    $projects = array_filter(glob("*"), 'is_dir');
    return view('welcome')->with('projects', collect($projects));
});

Route::prefix('stimpack')->group(function () {
    Route::post('perform/{task}', 'TaskController@perform');    
    Route::post('perform/all/{tasks}', 'TaskController@performAll');
    Route::get('pluralize/{word}', function ($word){    
        return Str::plural(Str::snake(class_basename($word)));
    });
});

Route::get('/queue', function () {
    ProcessTask::dispatch();
});