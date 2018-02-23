<?php

namespace App\Stimpack\Tasks;

use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;

class CreateModelsTask extends Task
{

    public function perform() {
        $message = "";
        foreach($this->models as $model) {
            $message = $message . "Created model NOT IMPLEMENTED...";
        }        
        return $message;
    }
}