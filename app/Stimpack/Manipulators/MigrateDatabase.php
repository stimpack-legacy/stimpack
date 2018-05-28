<?php

namespace App\Stimpack\Manipulators;
use App\Stimpack\Manipulator;
use App\Stimpack\Contexts\File;

class MigrateDatabase extends Manipulator
{
    public function perform() {
        return [
            "messages" => [
                "MigrateDatabase" . " executed successfully"
            ]
        ];
    }
}