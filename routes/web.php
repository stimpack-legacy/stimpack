<?php

Route::get('/{projectName?}', 'GuiController@index');


Route::prefix('stimpack')->group(function () {
    Route::post('perform/{manipulator}', 'ManipulatorController@perform');
});