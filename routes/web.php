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


Route::get('/test/{projectName}', function ($projectName) {
    //exec('sudo ~/.composer/vendor/bin/laravel new t10 2>&1 && mv /home/anders/Code/stimpack/public/t10 /home/anders/Code/t10', $outputAndErrors, $return_value);                
    //exec('sudo ~/.composer/vendor/bin/laravel new t12 2>&1', $outputAndErrors, $return_value);
    //exec("echo Cufafe66 | /usr/bin/sudo -S ~/.composer/vendor/bin/laravel new t13 2>&1", $outputAndErrors, $return_value);
    exec("composer create-project --prefer-dist laravel/laravel " . $projectName ." 2>&1 && mv /home/anders/Code/stimpack/public/" . $projectName . " /home/anders/Code/" . $projectName . " 2>&1", $outputAndErrors, $return_value);
    //exec("php /home/anders/Code/" . $projectName ."/artisan key:generate 2>&1", $outputAndErrors, $return_value);

    file_put_contents("/home/anders/Code/" . $projectName . "/.env", preg_replace(
        "/^APP_KEY=/m",
        'APP_KEY='."base64:HXvkwnSP3c9bclgmH17cbGsNVswvjbeFpywXSCs5Mpk=",
        file_get_contents("/home/anders/Code/" . $projectName . "/.env")
    ));

});


Route::prefix('stimpack')->group(function () {
    Route::post('perform/{task}', 'TaskController@perform');
    Route::get('pluralize/{word}', function ($word){    
        return Str::plural(Str::snake(class_basename($word)));
    });    
});