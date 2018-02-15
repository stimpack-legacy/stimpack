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
        usleep(500000);        
    }

    public function projectPath()
    {
        if(isset($this->SetTargetProjectTask))
        {
            return base_path() . $this->SetTargetProjectTask->projectPath . $this->SetTargetProjectTask->projectName;
        }

        return base_path();
    }

    public function projectName()
    {
        if(isset($this->SetTargetProjectTask))
        {
            return $this->SetTargetProjectTask->projectName;
        }

        return substr(base_path(), strrpos(base_path(), '/') + 1);
    }    

    private function transferParameters()
    {
        $taskClassName = class_basename(get_class($this));
        $thisTask = $this->tasks->first(function($value) use($taskClassName) {
            return $value->taskName == $taskClassName;
        });

        // Transfer the current task directly onto this
        foreach ($thisTask as $key => $value)
        {
            $this->$key = $value;
        }

        // Transfer all task to this so they can be called by name
        foreach ($this->tasks as $key => $value) {
            $taskName = $value->taskName;
            $this->$taskName = $value;
        }

    }

    public static function projects() {
        chdir("../../");
        $projects = collect(array_filter(glob("*"), 'is_dir'));
        chdir(public_path());
        return $projects;
    }
}