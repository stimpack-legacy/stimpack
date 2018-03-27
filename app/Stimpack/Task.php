<?php

namespace App\Stimpack;

class Task
{
    public function __construct($tasks)
    {
        $this->tasks = collect($tasks);
        $this->transferParameters();
        // To be removed!!!
        ini_set('max_execution_time', 300);
        usleep(200000);        
    }

    public function projectPath()
    {
        if(isset($this->SetTargetProject))
        {
            return base_path() . $this->SetTargetProject->projectPath . $this->SetTargetProject->projectName;
        }

        return base_path();
    }

    public function projectName()
    {
        if(isset($this->SetTargetProject))
        {
            return $this->SetTargetProject->projectName;
        }

        return substr(base_path(), strrpos(base_path(), '/') + 1);
    }    

    public function getTask($name) {
        return $this->tasks->first(function ($value, $key) use($name) {
            return $value->name == $name;
        });
    }

    private function transferParameters()
    {
        $taskClassName = class_basename(get_class($this));
        $thisTask = $this->tasks->first(function($value) use($taskClassName) {
            return $value->name == $taskClassName;
        });

        // Transfer the current task directly onto this
        foreach ($thisTask as $key => $value)
        {
            $this->$key = $value;
        }

        // Transfer all task to this so they can be called by name
        foreach ($this->tasks as $key => $value) {
            $name = $value->name;
            $this->$name = $value;
        }

    }

    public static function projects() {
        chdir("../../");
        $projects = collect(array_filter(glob("*"), 'is_dir'));
        chdir(public_path());
        return $projects;
    }
}