<?php

namespace App\Stimpack\Manipulators;
use Illuminate\Support\Facades\Log;
use App\Stimpack\Manipulator;
use App\Stimpack\Templates;
use ZipArchive;

class Create extends Manipulator
{
    public function perform() {
        //Log::info($this->data->path);

        // Get the file from github
        $start = microtime(true);
        //file_put_contents("../storage/stimpack/laravel.zip", fopen("https://github.com/ajthinking/compressed/raw/master/laravel.zip", 'r'));
        
        // Unzip    
        $zip = new ZipArchive;
        $res = $zip->open("../storage/stimpack/laravel.zip");
        if ($res === TRUE) {
            $zip->extractTo($this->data->path);
            $zip->close();
        } else {
            return "some Error?";
        }        
        
        // Update .env
        //file_put_contents($this->projectPath()."/.env", str_replace("DATABASE_PATH", $this->projectPath() . "/storage/database.sqlite" ,Templates::ENV));

        return "OK";

    }
}