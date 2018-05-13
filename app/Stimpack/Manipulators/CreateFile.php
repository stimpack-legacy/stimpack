<?php

namespace App\Stimpack\Manipulators;
use App\Stimpack\Manipulator;
use App\Stimpack\Contexts\File;

class CreateFile extends Manipulator
{
    public function perform() {

        $file = File::save(
            $this->path($this->data->relativePathToFile), 
            $this->data->content
        );

        return [
            "messages" => [
                "Created " . $this->path($this->data->relativePathToFile)
            ]
        ];
    }
}