<?php

namespace App\Stimpack\Manipulators;

use App\Stimpack\Manipulator;
use App\Stimpack\Manipulators\Support\PseudoParser;
use App\Stimpack\Contexts\Project;
use App\Stimpack\Contexts\File;
use Log;

class ScaffoldLaravel extends Manipulator
{
    public function perform() {
        
        File::loadOrCreate($this->path("objects"))->content(
            collect(PseudoParser::make()->parse($this->data->pseudoCode))->implode("")
        )->save();

        return [
            "messages" => ["OK!"]
        ];        
    }
}