<?php

namespace App\Stimpack\Tasks;

use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;

class CreateControllers extends Task
{
    public function perform() {
        $message = "";
        foreach($this->files as $file) {        
            $fileName = $file->name . "Controller.php";            
            $path = $this->projectPath() . "/app/Http/Controllers/" . $fileName;
            file_put_contents($path, $file->body);                
            $message = $message . "Created controller at ";
            $message = $message . $path . "\n";
        }
        
        return $message;         
    }
}