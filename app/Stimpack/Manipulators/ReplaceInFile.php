<?php

namespace App\Stimpack\Manipulators;
use App\Stimpack\Manipulator;
use App\Stimpack\Contexts\File;

class ReplaceInFile extends Manipulator
{
    public function perform() 
    {        
        $file = $this->path($this->data->relativePathToFile);
        $contents = file_get_contents ($file);         
        $contents = str_replace($this->data->oldString, $this->data->newString, $contents);
        file_put_contents($file, $contents);

        return [
            "messages" => [
                "Replaced " . $this->data->oldString . " with " . $this->data->newString
            ]
        ];
    }
}