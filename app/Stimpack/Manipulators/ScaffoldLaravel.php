<?php

namespace App\Stimpack\Manipulators;

use App\Stimpack\Manipulator;

class ScaffoldLaravel extends Manipulator
{
    public function perform() {
        return [
            "messages" => [
                "Scaffold successful!"
            ]
        ];        
    }
}