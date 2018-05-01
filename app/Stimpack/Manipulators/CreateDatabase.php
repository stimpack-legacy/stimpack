<?php

namespace App\Stimpack\Manipulators;

use App\Stimpack\Manipulator;

class CreateDatabase extends Manipulator
{
    public function perform() {
        return [
            "messages" => [
                "OK I GUESS"
            ]
        ];        
    }
}