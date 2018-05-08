<?php

namespace App\Stimpack\Manipulators;
use App\Stimpack\Manipulator;
use App\Stimpack\Contexts\File;

class CreateFile extends Manipulator
{
    public function perform() {

        $file = File::loadOrCreate($this->path($this->data->relativePathToFile))
            ->content($this->data->content)
            ->save();

        return [
            "messages" => [
                "Created " . $this->path($this->data->relativePathToFile)
            ]
        ];
    }
}