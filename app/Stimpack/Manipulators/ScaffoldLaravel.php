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
    public function __construct($data, $globalParameters = 0)
    {
        parent::__construct($data, $globalParameters);
        $this->laravelObjectModel = LaravelObjectModel::make((object) [
            "targetProjectName" => $this->data->context->targetProjectName,
            "targetProjectPath" => $this->targetProjectPath()            
        ]);
    }

    public function perform() {
        return [
            "messages" => $this->laravelObjectModel->installFrom(
                PseudoParser::parse($this->data->pseudoCode)
            )
        ];        
    }

    public static function registerSupportRoutes()
    {
        \Route::get('/manipulators/ScaffoldLaravel/preview', function() {
            return $this->laravelObjectModel->previewFrom(
                PseudoParser::parse($this->data->pseudoCode)
            );
        });
    }
}