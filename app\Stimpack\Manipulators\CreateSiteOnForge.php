<?php

namespace App\Stimpack\Manipulators;
use App\Stimpack\Manipulator;
use App\Stimpack\Contexts\File;

class CreateSiteOnForge extends Manipulator
{
    public function perform() {
        return [
            "messages" => [
                CreateSiteOnForge . " executed successfully"
            ]
        ];
    }
}