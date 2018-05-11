<?php

Route::get('/', 'GuiController@index');

Route::get('open/{packName}', 'GuiController@openLocal');
Route::get('open/{author}/{packName}', 'GuiController@open');

Route::post('save/{pack}', 'PackController@save');

Route::post('perform/{manipulator}', 'ManipulatorController@perform');

Route::get('/register/{token}', 'TokenController@register');

Route::get('/preview/file/at/{path}', function($path) {
    return view("file")->with(["content" => \App\Stimpack\Contexts\File::init()->get($path)]);
})->where('path', '.*');