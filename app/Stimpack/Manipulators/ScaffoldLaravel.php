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
        
        $result = $this->createFilesFromPseudoCode();

        return [
            "messages" => $result
        ];        
    }

    public function createFilesFromPseudoCode()
    {
        // Clean, segment and validate the supplied pseudoCode
        // Then we use it to build an ObjectModel to create files and inject values as needed    
        return LaravelObjectModel::make((object) [
            "targetProjectName" => $this->data->context->targetProjectName,
            "targetProjectPath" => $this->targetProjectPath()            
        ])->installFrom(
            PseudoParser::parse($this->data->pseudoCode)
        );
    }

    public static function registerSupportRoutes()
    {
        \Route::get('/onthefly', function() {
            return "Im registering somewhere else :D!";
        });
    }
}