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
        //file_put_contents("../storage/stimpack/laravel.zip", fopen("https://github.com/ajthinking/compressed/raw/master/laravel.zip", 'r'));
        
        // Unzip    
        $zip = new ZipArchive;
        $res = $zip->open("../storage/stimpack/laravel.zip");
        if ($res === TRUE) {
            $zip->extractTo($this->projectPath());
            $zip->close();
        } else {
            return "some Error?";
        }        
        
        // Update .env
        file_put_contents($this->projectPath()."/.env", str_replace("DATABASE_PATH", $this->projectPath() . "/storage/database.sqlite" ,Templates::ENV));
        
        //return "Success: http://" . $this->projectName() . ".test . Time elapsed: " . $time_elapsed_secs = microtime(true) - $start;
        return [
            "name" => $this->name,
            "status" => "succeded!",
            "messages" => [
                "http://" . $this->projectName() . ".test",
                "Time elapsed: " . (microtime(true) - $start)
            ]
        ];
    }
}