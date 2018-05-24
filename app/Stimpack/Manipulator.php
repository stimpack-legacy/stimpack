<?php

namespace App\Stimpack;

use stdClass;
use Log;

class Manipulator
{
    public function __construct($data, $globalParameters)
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

    protected function targetProjectPath()
    {
        return $this->resolveRealPath(
            str_finish(
                $this->env('STIMPACK_CODE_PATH', base_path("../")
            ), "/")
            .$this->data->context->targetProjectName
        );
    }

    protected function resolveRealPath($path)
    {
        $path = str_replace('//', '/', $path);
        $parts = explode('/', $path);
        $out = array();
        foreach ($parts as $part){
            if ($part == '.') continue;
            if ($part == '..') {
                array_pop($out);
                continue;
            }
            $out[] = $part;
        }
        return implode('/', $out);
    }
    
    protected function path($relativePath)
    {
        return $this->targetProjectPath() . "/" . $relativePath;
    }


}