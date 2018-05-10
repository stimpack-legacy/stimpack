<?php

namespace App\Stimpack\Manipulators;

use App\Stimpack\Manipulator;
use App\Stimpack\Manipulators\Support\PseudoParser;
use App\Stimpack\Manipulators\Support\LaravelObjectModel;
use App\Stimpack\Contexts\Project;
use App\Stimpack\Contexts\File;
use Log;

class ScaffoldLaravel extends Manipulator
{
    public function perform() {
        
        $result = $this->createFilesFromPseudoCode($this->data->pseudoCode);

        return [
            "messages" => $result
        ];        
    }

    public function createFilesFromPseudoCode($pseudoCode)
    {
        // Clean, segment and validate the supplied pseudoCode
        // Then we use it to build a ObjectModel containing all the Laravel components needed    
        $objectModel = LaravelObjectModel::make()->from(
            PseudoParser::parse($pseudoCode)
        );


        return $objectModel;
    }
}