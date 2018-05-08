<?php

namespace App\Stimpack\Manipulators;
use App\Stimpack\Manipulator;
use App\Stimpack\Contexts\File;

class ReplaceInFile extends Manipulator
{
    public function perform() 
    {        
        $file = File::load($this->path($this->data->relativePathToFile))
            ->replace($this->data->oldString, $this->data->newString)
            ->save();

        return [
            "messages" => [
                "Found " . $file->path(),
                $file->report . " matches replaced."
            ]
        ];
    }
}