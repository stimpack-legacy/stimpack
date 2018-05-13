<?php

namespace App\Stimpack\Contexts;

use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;
use Exception;
use Illuminate\Filesystem\Filesystem;

class File extends Filesystem
{
    /* ACTUALLY USED IN CODE */

    public static function save($path, $contents, $lock = false) {
        $file = new File();
        
        if(!$file->isDirectory($file->dirname($path))){
            $file->makeDirectory($file->dirname($path), 0755, true);
        }
        $file->put($path, $contents, $lock);        
    }

    public function put($path, $contents, $lock = false) {
        if(!$this->isDirectory($this->dirname($path))){
            $this->makeDirectory($this->dirname($path), 0755, true);
        }
        parent::put($path, $contents, $lock);        
    }

    public static function addMethod($content, $method) {        
        return str_block_replace(
            // we are searching for an injecting marker as guide for where to put the method
            "MARKER",
            // method code
            $method,
            // Inject the marker
            preg_replace(
                self::regexes["methodInjectionSpot"],
                PHP_EOL . PHP_EOL . "\$1" .INDENTATION. "MARKER\$2",
                $content,
                1
            )
        );
    }

    // INJECT OR DESTROY IDEA???!!!!

    /* API ****************************************************************************** */

    private $path;
    private $content;
    private $handle;
    private $uses;
    private $namespace;
    private $context;

    const regexes = [
        "class" => "/(?<=^class )([\w]*)/m",
        "namespace" => '/(?<=^namespace )([\w\\\\]*)/m',
        "classDefinition" => '/^class [\s\S]*/m',
        "uses" => '/(?<=^use )(.*);$/m',
        "useLine" => '/(^use .*[\r\n|\r|\n]{1})/m',
        "fileHeader" => '/<\?php[\r\n|\r|\n]*(?:namespace .*)*[\r\n|\r|\n]*(?:use? .*[\r\n|\r|\n]*)*/',
        "methodInjectionSpot" => '/(\n)(}[\s\n\r]*)$/s',
    ];

    public function construct($path = null)
    {
        $this->path = $path;
        parent::__construct();
    }

    public static function init($path = null)
    {
        return new File($path);
    }

    public static function create($path)
    {
        if(file_exists($path))
        {
            throw new Exception("File already exists at " . $path . "!");
        }

        return new File($path);
    }

    // Untested
    public static function loadOrCreate($path)
    {
        if(file_exists($path))
        {
            return File::load($path);
        }

        return new File($path);
    }    

    // Combined getter and setter. Note different return types for chaining
    public function content($content = false)
    {
        if($content)
        {
            $this->content = $content;
            return $this;
        } 

        return $this->content;
    }

    public function replace($oldString, $newString)
    {
        //$matches = -1;
        $this->content = str_replace($oldString, $newString, $this->content, $matches);
        $this->report = $matches;
        return $this;
    }

    public function empty()
    {
        $this->content = "";
        return $this;
    }

    public function class($class = false)
    {
        if($class){
            $this->setClass($class);            
        }

        return $this->getClass();
    }

    public function getClass()
    {
        if(preg_match(self::regexes["class"], $this->content, $matches))
        {
            return $matches[0];
        }

        throw new Exception("This file does not contain a class.");
    }

    public function setClass($class)
    {
        $this->content = preg_replace(self::regexes["class"], $class, $this->content, 1);
        return $this;
    }

    public function namespace($namespace = false)
    {
        if($namespace){
            return $this->setNamespace($namespace);            
        }

        return $this->getNamespace();
    }

    public function getNamespace()
    {
        if(preg_match(self::regexes["namespace"], $this->content, $matches))
        {
            return $matches[0];
        }
        
        return null;
    }

    public function setNamespace($namespace)
    {
        $this->namespace = $namespace;
        $this->renderFileHeader();        
        return $this;
    }
    
    public function uses() {
        
        if(preg_match_all(self::regexes["uses"], $this->content, $matches))
        {
            // How to match into [0]?
            return $matches[1];
        }

        return [];
    }

    public function onlyUse($uses) {
        $this->uses = $uses;
        $this->renderFileHeader();        
        return $this;
    }

    public function use($uses) {
        $this->uses = array_merge($this->uses(), $uses);
        $this->renderFileHeader();        
        return $this;
    }    

    /**
     * Assume we are following PSR-2
     * <?php
     * 
     * [namespace App\Some\Namespace;
     * 
     * ][use statements
     * 
     * ]rest of file
     * @var array
     */    
    private function renderFileHeader() {
        $header = "<?php\n\n";
        if($this->namespace) $header .= "namespace " . $this->namespace . ";\n\n";
        if($this->uses) $header .= $this->renderUses() . "\n\n";
        
        $this->content = preg_replace(self::regexes["fileHeader"], $header, $this->content, 1);
        return $this;
    }

    private function renderUses() {
        return collect($this->uses)->map(function($useStatement) {
            return "use " . $useStatement . ";";
        })->implode("\n");
    }


}