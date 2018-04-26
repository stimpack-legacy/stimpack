<?php

Route::get('/', 'GuiController@index');

Route::get('open/{packName}', 'GuiController@openLocal');
Route::get('open/{author}/{packName}', 'GuiController@open');

Route::post('save/{pack}', 'PackController@save');

Route::post('perform/{manipulator}', 'ManipulatorController@perform');

Route::get('/register/{token}', 'TokenController@register');