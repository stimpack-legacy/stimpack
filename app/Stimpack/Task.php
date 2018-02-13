<?php

namespace App\Stimpack;

class Task
{
    public function __construct($tasks) {
        $this->tasks = collect($tasks);
        $this->transferParameters();        
    }

    public function projectPath() {
        if($this->get("SetTargetProjectTask") && $this->get("SetTargetProjectTask")->enabled) {
            return base_path() . $this->get("SetTargetProjectTask")->projectPath . $this->get("SetTargetProjectTask")->projectName;
        }

        return base_path();
    }

    public function get($taskName) {
        return $this->tasks->first(function($value) use($taskName) {
            return $value->taskName == $taskName;
        });
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
        $taskClassName = class_basename(get_class($this));
        $thisTask = $this->tasks->first(function($value) use($taskClassName) {
            return $value->taskName == $taskClassName;
        });
        foreach ($thisTask as $key => $value) {
            $this->$key = $value;
        }
    }

    public static function projects() {
        chdir("../../");
        $projects = collect(array_filter(glob("*"), 'is_dir'));
        chdir(public_path());
        return $projects;
    }
}