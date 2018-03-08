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
    Route::get('pluralize/{word}', function ($word){    
        return Str::plural(Str::snake(class_basename($word)));
    });
});

Route::get('/queue', function () {
    ProcessTask::dispatch();
});

Route::get('/zip', function () {

    function zipData($source, $destination) {
        if (extension_loaded('zip')) {
            if (file_exists($source)) {
                $zip = new ZipArchive();
                if ($zip->open($destination, ZIPARCHIVE::CREATE)) {
                    $source = realpath($source);
                    if (is_dir($source)) {
                        $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source, RecursiveDirectoryIterator::SKIP_DOTS), RecursiveIteratorIterator::SELF_FIRST);
                        foreach ($files as $file) {
                            $file = realpath($file);
                            if (is_dir($file)) {
                                $zip->addEmptyDir(str_replace($source . '/', '', $file . '/'));
                            } else if (is_file($file)) {
                                $zip->addFromString(str_replace($source . '/', '', $file), file_get_contents($file));
                            }
                        }
                    } else if (is_file($source)) {
                        $zip->addFromString(basename($source), file_get_contents($source));
                    }
                }
                return $zip->close();
            }
        }
        return false;
    }

    /*
    * PHP: Recursively Backup Files & Folders to ZIP-File
    * MIT-License - 2012-2018 Marvin Menzerath
    */
    // Make sure the script can handle large folders/files
    ini_set('max_execution_time', 600);
    ini_set('memory_limit', '1024M');
    // Start the backup!
    zipData('/home/anders/Code/compress', '/home/anders/Code/myOwnCDN.zip');
    echo 'Finished.';
    // Here the magic happens :)    
});

Route::get('test', function() {
    $start = microtime(true);

    // Get the file from github
    file_put_contents("/home/anders/Code/newProject2.zip", fopen("https://github.com/ajthinking/compressed/raw/master/laravel.zip", 'r'));
    
    // Unzip    
    $zip = new ZipArchive;
    $res = $zip->open("/home/anders/Code/newProject2.zip");
    if ($res === TRUE) {
      $zip->extractTo('/home/anders/Code/new_project_indeed');
      $zip->close();
    } else {
      return "some Error?";
    }

    // Ready :)

    return $time_elapsed_secs = microtime(true) - $start;
});