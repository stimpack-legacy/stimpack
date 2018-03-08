<?php

namespace App\Stimpack\Tasks;
use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;
use App\Stimpack\Templates;

class SetTargetProjectTask extends Task
{
    public function perform() {
        //return json_encode($this);
        // if project exist, do nothing
        if(Task::projects()->contains($this->projectName())) {
            return "Project folder identified";
        }

        // Create new laravel project with composer
        exec("composer create-project --prefer-dist -n laravel/laravel ../../" . $this->projectName() ." 2>&1", $outputAndErrors);    
        // Laravels key:generate does not work in shell, lets do it manually for now
        file_put_contents($this->projectPath()."/.env", Templates::ENV);
        // Return output and errors
        return $this->projectPath()."/.env"; //$outputAndErrors;
    }
}