<?php

namespace App\Stimpack\Tasks;
use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;
use App\Stimpack\Templates;
use ZipArchive;

class SetTargetProjectTask extends Task
{
    public function perform() {
        // if project exist, do nothing
        if(Task::projects()->contains($this->projectName())) {
            return "Project folder identified";
        }

        // Get the file from github
        $start = microtime(true);
        file_put_contents($this->projectPath() . "laravel.zip", fopen("https://github.com/ajthinking/compressed/raw/master/laravel.zip", 'r'));
        
        // Unzip    
        $zip = new ZipArchive;
        $res = $zip->open($this->projectPath() . "laravel.zip");
        if ($res === TRUE) {
            $zip->extractTo($this->projectPath());
            $zip->close();
        } else {
            return "some Error?";
        }

        file_put_contents($this->projectPath()."/.env", Templates::ENV);
        
        return "Installed application successfully. Time elapsed: " . $time_elapsed_secs = microtime(true) - $start;
    }
}