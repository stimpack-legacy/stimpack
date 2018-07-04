<?php

namespace App\Stimpack\Manipulators;
use App\Stimpack\Manipulator;
use App\Stimpack\Contexts\File;

class CreateGithubRepo extends Manipulator
{
    public function perform() {
        return [
            "messages" => [
                CreateGithubRepo . " executed successfully"
            ]
        ];
    }
}