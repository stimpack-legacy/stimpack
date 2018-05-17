<?php

Route::get('/', 'GuiController@index');

Route::get('open/{packName}', 'GuiController@openLocal');
Route::get('open/{author}/{packName}', 'GuiController@open');

Route::post('save/{pack}', 'PackController@save');


Route::post('manipulators/{manipulator}/perform', 'ManipulatorController@perform');

Route::get('/register/{token}', 'TokenController@register');

Route::get('/preview/file/at/{path}', function($path) {
    return view("file")->with(["content" => \App\Stimpack\Contexts\File::init()->get($path)]);
})->where('path', '.*');


// Each manipulator have the option to register support routes to assist while the user conigure it.
App\Http\Controllers\ManipulatorController::registerSupportRoutes();