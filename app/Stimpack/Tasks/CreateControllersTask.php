<?php

namespace App\Stimpack\Tasks;

use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;

class CreateControllersTask extends Task
{
    public function perform() {
        $message = "";
        foreach($this->controllers as $controller) {        
            $fileName = $controller->name . "Controller.php";            
            $path = $this->projectPath() . "/app/Http/Controllers/" . $fileName;
            file_put_contents($path, $controller->body);                
            $message = $message . "Created controller at ";
            $message = $message . $path . "\n";
        }
        
        return $message;         
    }
}