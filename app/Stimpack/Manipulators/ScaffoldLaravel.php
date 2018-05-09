<?php

namespace App\Stimpack\Manipulators;

use App\Stimpack\Manipulator;
use App\Stimpack\Manipulators\Support\PseudoParser;

class ScaffoldLaravel extends Manipulator
{
    public function perform() {
        return [
            "messages" => PseudoParser::make()->parse($this->data->pseudoCode)
        ];        
    }
}