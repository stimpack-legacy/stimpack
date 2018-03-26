<?php

namespace App\Stimpack\Manipulators;

use Exception;
use ZipArchive;
use App\Stimpack\Manipulators\File;

class Project
{
    private $path;

    public function __construct($path) {
        $this->path = $path;                
    }

    // Project API ***************************************************************

    public static function load($path)
    {
        if(!file_exists($path))
        {
            throw new Exception("No such dir!");
        }        
        
        return new Project($path);        
        
    }

    public static function create($path)
    {
        if(file_exists($path))
        {
            throw new Exception("Project already exists!");
        }

        $project = new Project($path);
        $project->addProjectFilesFromZip();
        return $project;
    }

    public function add($files)
    {
        collect($files)->each(function($content, $name) {
            File::create($name)->content($content)->save();
        });

        return $this;        
    }

    public function env($query = false, $clear = false)
    {
        if(!$query) return File::load($this->path(".env"))->content();
        if(is_string($query) && !$clear) return "I should fetch from env file";
        if(is_string($query) && $clear) return "I should delete from env file";
        if(is_array($query) && !$clear) return "I should ADD the values according to array";
        if(is_array($query) && $clear) return "I should WIPE AND RESET all the values according to array";
    }

    public function database()
    {
        $this->context = "DATABASE-CONTEXT";
        return $this; 
    }

    public static function custom(File $file)
    {

    }    



    public function models($models)
    {
        
    }

    public function model($model)
    {
        
    }

    // ...

    // END OF API. Private methods below *****************************************

    private function path($to)
    {
        return collect($this->path)->concat(collect($to))->implode("/");
    }

    private function addProjectFilesFromZip()
    {
        $zip = new ZipArchive;
        $result = $zip->open(storage_path("stimpack/laravel.zip"));
        if ($result === TRUE) {
            $zip->extractTo($this->path);
            $zip->close();
        } else {
            throw new Exception("Error while extracting project from zip file!");
        }
    }

}