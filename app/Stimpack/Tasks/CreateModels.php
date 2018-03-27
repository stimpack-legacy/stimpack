<?php

namespace App\Stimpack\Tasks;

use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;

class CreateModels extends Task
{

    public function perform() {
        $message = "";
        foreach($this->files as $file) {        
            $fileName = $file->name . ".php";            
            $path = $this->projectPath() . "/app/" . $fileName;
            file_put_contents($path, $file->body);                
            $message = $message . "Created model at ";
            $message = $message . $path . "\n";
        }
        
        return $message;         
    }
}