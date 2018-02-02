<?php

namespace App\Stimpack;
use Illuminate\Support\Facades\Log;

class LaravelNewTask implements Task
{

    public function __construct($tasks) {
        $this->tasks = $tasks;
    }

    public function perform() {
        //return "aja" . $this->tasks->LaravelNewTask->path . "ja" . $this->tasks->LaravelNewTask->projectName . "ja!";
        return shell_exec ( "cd " . $this->tasks->LaravelNewTask->path . " && laravel new " .$this->tasks->LaravelNewTask->projectName);                
    }
}
