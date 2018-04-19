<?php

Route::get('/', 'GuiController@index');

Route::get('load/{packName}', 'GuiController@loadLocal');
Route::get('load/{author}/{packName}', 'GuiController@load');

Route::post('save/{pack}', 'PackController@save');

Route::post('perform/{manipulator}', 'ManipulatorController@perform');