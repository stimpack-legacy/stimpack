<?php

namespace App\Stimpack\Manipulators;
use Illuminate\Support\Facades\Log;
use App\Stimpack\Manipulator;
use App\Stimpack\Templates;
use ZipArchive;

class Create extends Manipulator
{
    public function perform() {
        // Get the file from github
        $start = microtime(true);
        //file_put_contents("../storage/stimpack/laravel.zip", fopen("https://github.com/ajthinking/compressed/raw/master/laravel.zip", 'r'));

        // Unzip    
        $zip = new ZipArchive;
        $res = $zip->open(storage_path("stimpack/laravel.zip"));
        if ($res === TRUE) {
            $zip->extractTo(env('STIMPACK_CODE_PATH') . "/" . $this->data->path);
            $zip->close();
        } else {
            return "some Error?";
        }

        return [
            "messages" => [
                "Created application at http://" . $this->data->path . ".test"                
            ]
        ];
    }
}