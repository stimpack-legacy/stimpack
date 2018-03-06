<?php

namespace App\Stimpack\Tasks;

use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;

class CreateModelsTask extends Task
{

    public function perform() {
        $message = "";
        foreach($this->models as $model) {        
            $fileName = $model->name . ".php";            
            $path = $this->projectPath() . "/app/" . $fileName;
            file_put_contents($path, $model->body);                
            $message = $message . "Created model at ";
            $message = $message . $path . "\n";
        }
        
        return $message;         
    }
}