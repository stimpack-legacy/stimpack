<?php
use Illuminate\Support\Str;

Route::get('/{projectName?}', 'GuiController@index');


Route::prefix('stimpack')->group(function () {
    Route::post('perform/{task}', 'TaskController@perform');    
    Route::post('perform/all/{tasks}', 'TaskController@performAll');
    Route::get('pluralize/{word}', function ($word){    
        return Str::plural(Str::snake(class_basename($word)));
    });
});