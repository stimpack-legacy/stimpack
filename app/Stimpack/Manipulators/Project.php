<?php

namespace App\Stimpack\Manipulators;

use Exception;
use ZipArchive;

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

    public function database($config)
    {

    }

    public function enviroment($config)
    {
        
    }

    public function models($models)
    {
        
    }

    public function model($model)
    {
        
    }

    // END OF API. Private methods below *****************************************

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