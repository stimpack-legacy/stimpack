<?php

namespace App\Stimpack;

class Task
{
    public function __construct($tasks) {
        $this->tasks = $tasks;
        $this->transferParameters();        
    }

    public function projectPath() {
        if(isset($this->tasks->SetTargetProjectTask) && $this->tasks->SetTargetProjectTask->enabled) {
            return base_path() . $this->tasks->SetTargetProjectTask->projectPath . $this->tasks->SetTargetProjectTask->projectName;
        }

        return base_path();
    }
    
    /*
    / Shorthand for accessing the current tasks properties
    / Example:
    / Instead of 
    / $this->tasks->CreateControllersTask->enabled
    / Use
    / $this->enabled
    */
    private function transferParameters() {
        $this->bajs = "foobar";
        $taskClassName = class_basename(get_class($this));
        if($taskClassName != "Task" && isset($this->tasks->$taskClassName)) {
            $this->tasks->$taskClassName;
            foreach ($this->tasks->$taskClassName as $key => $value) {
                $this->$key = $value;
            }
        }
    }
}