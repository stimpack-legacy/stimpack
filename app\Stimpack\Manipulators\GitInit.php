<?php

namespace App\Stimpack\Manipulators;
use App\Stimpack\Manipulator;
use App\Stimpack\Contexts\File;

class GitInit extends Manipulator
{
    public function perform() {
        return [
            "messages" => [
                GitInit . " executed successfully"
            ]
        ];
    }
}