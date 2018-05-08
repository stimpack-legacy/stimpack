<?php

namespace App\Stimpack\Contexts;

use Exception;
use ZipArchive;
use App\Stimpack\Contexts\File;

class Folder
{
    private $path;

    public function __construct($path) {
        $this->path = $path;                
    }

    // Folder API ***************************************************************

    public static function load($path)
    {
        if(!file_exists($path))
        {
            throw new Exception("No such dir!");
        }        
        
        return new Folder($path);        
        
    }

    public static function create($path)
    {
        if(file_exists($path))
        {
            throw new Exception("Folder already exists!");
        }

        $folder = new Folder($path);
        return $folder;
    }

    public function add($files)
    {
        collect($files)->each(function($content, $name) {
            File::create($name)->content($content)->save();
        });

        return $this;        
    }

    public function delete()
    {
        $this->rrmdir($this->path);
        return $this;
    }

    public function path()
    {
        return $this->path;
    }    
    
    // END OF API

    private function rrmdir($dir) { 
        if (is_dir($dir)) { 
          $objects = scandir($dir); 
          foreach ($objects as $object) { 
            if ($object != "." && $object != "..") { 
              if (is_dir($dir."/".$object))
                $this->rrmdir($dir."/".$object);
              else
                unlink($dir."/".$object); 
            } 
          }
          rmdir($dir); 
        } 
    }    
}