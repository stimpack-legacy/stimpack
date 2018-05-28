<?php

namespace App\Stimpack\Manipulators;
use App\Stimpack\Manipulator;
use App\Stimpack\Contexts\File;

class SeedDatabase extends Manipulator
{
    public function perform() {
        return [
            "messages" => [
                SeedDatabase . " executed successfully"
            ]
        ];
    }
}