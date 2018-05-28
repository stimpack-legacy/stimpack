<?php

namespace App\Stimpack\Manipulators;
use App\Stimpack\Manipulator;
use App\Stimpack\Contexts\ContextFactory;
use App\Stimpack\Contexts\File;

class DeleteFile extends Manipulator
{
    public function perform() {

        File::init()->delete($this->path($this->data->relativePathToDelete));

        return [
            "messages" => [
                "Deleted successful."
            ]
        ];
    }
}