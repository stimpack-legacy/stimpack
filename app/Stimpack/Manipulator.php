<?php

namespace App\Stimpack;

use stdClass;
use Log;

class Manipulator
{
    public function __construct($data, $globalParameters = 0)
    {
        
        $this->globalParameters = $globalParameters;             
        $this->data = $this->injectGlobalParameters($data);

        // Smoothen your experience by reducing speed
        usleep(200000);
    }

    public function injectGlobalParameters($data) {
        return (object) collect((array) $data)->map(function($value, $key) {
            if(is_object($value)) {
                return $this->injectGlobalParameters($value);
            }
            if(is_string($value)) {
                return $this->possiblyInjectParameter($value);
            }
            return $value;
        })->toArray();
    }

    private function possiblyInjectParameter($str) {
        preg_match_all("/__STIMPACK\((.*?)\)/", $str, $matches);
        $fullMatches = $matches[0];
        $parameterMatches = $matches[1];

        return collect($parameterMatches)->filter(function($value) {            
            return isset($this->globalParameters->$value);
        })->reduce(function($carry, $item) use($str) {                        
            return str_replace("__STIMPACK(" . $item . ")", $this->globalParameters->$item, $carry);            
        }, $str);
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

    protected function env($key, $defaultAlsoAppliesIfEmpty)
    {
        $value = env($key, "");
        if($value == "") {
            return $defaultAlsoAppliesIfEmpty;
        }

        return $value;
    }
}