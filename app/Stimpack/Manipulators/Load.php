<?php

namespace App\Stimpack\Manipulators;
use Illuminate\Support\Facades\Log;
use App\Stimpack\Manipulator;
use App\Stimpack\Templates;
use ZipArchive;
use App\Stimpack\Contexts\Project;

class Load extends Manipulator
{
    public function perform() {
        Project::load($this->targetProjectPath());
        
        return [
            "messages" => [
                "Loaded application at http://" . $this->data->targetProjectName . ".test",                
            ]
        ];
    }    
}