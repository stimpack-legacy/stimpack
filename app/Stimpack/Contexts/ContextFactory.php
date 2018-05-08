<?php

namespace App\Stimpack\Contexts;

use Illuminate\Support\Facades\Log;
use Exception;
use App\Stimpack\Contexts\File;
use App\Stimpack\Contexts\Project;

class ContextFactory
{
    public static function make($path) {
        if(is_file($path)) {
            return new File($path);
        }

        if(is_dir($path)) {
            return new Folder($path);
        }
        
        throw new Exception("Specified path is neither a file nor a folder.");
    }
}