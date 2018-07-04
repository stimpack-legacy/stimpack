<?php

namespace App\Stimpack\Manipulators;
use App\Stimpack\Manipulator;
use App\Stimpack\Contexts\File;

class AddDNS extends Manipulator
{
    public function perform() {
        return [
            "messages" => [
                AddDNS . " executed successfully"
            ]
        ];
    }
}