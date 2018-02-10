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
    chdir("../../");
    $projects = array_filter(glob("*"), 'is_dir');
    return view('welcome')->with('projects', collect($projects));
});


Route::get('/test/{projectName}', function ($projectName) {
    exec("composer create-project --prefer-dist laravel/laravel " . $projectName ." 2>&1 && mv /home/anders/Code/stimpack/public/" . $projectName . " /home/anders/Code/" . $projectName . " 2>&1", $outputAndErrors, $return_value);

    // Replace app key in .env manually - something is not working with Laravels key:generate
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