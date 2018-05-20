<?php

namespace App\Stimpack\Manipulators;

use App\Stimpack\Manipulator;
use App\Stimpack\Manipulators\Support\PseudoParser;
use App\Stimpack\Manipulators\Support\LaravelObjectModel;
use App\Stimpack\Contexts\Project;
use App\Stimpack\Contexts\File;
use Log;
use Route;

class ScaffoldLaravel extends Manipulator
{
    public function __construct($data, $globalParameters = 0)
    {
        parent::__construct($data, $globalParameters);
        $this->laravelObjectModel = LaravelObjectModel::make((object) [
            "targetProjectPath" => $this->targetProjectPath()            
        ]);
    }

    public static function make() {
        return new ScaffoldLaravel(
            json_decode(request()->data),
            json_decode(request()->globalParameters)
        );
    }

    public function oldPerform() {
        return [
            "messages" => $this->laravelObjectModel->installFromOld(
                PseudoParser::parse($this->data->pseudoCode)
            )
        ];
    }

    public function perform() {
        return [
            "messages" => $this->laravelObjectModel->installFrom($this->data->result)
        ];
    }    

    public static function registerSupportRoutes()
    {
        Route::post('/manipulators/ScaffoldLaravel/preview', function() {
            return LaravelObjectModel::make((object) [
                "targetProjectPath" => '' // This is only a relative preview            
            ])->previewFrom(
                PseudoParser::parse(
                    ScaffoldLaravel::make()->data->pseudoCode
                )
            );
        });
    }

    public static function attachStartupData()
    {
        return collect([
            "stubs" => collect([
                "migration" => File::init()->get(base_path('app/Stimpack/Manipulators/Support/stubs/migration.stub')),
                "model" => File::init()->get(base_path('app/Stimpack/Manipulators/Support/stubs/model.stub')),
                "controller" => File::init()->get(base_path('app/Stimpack/Manipulators/Support/stubs/controller.stub')),
                "seeder" => File::init()->get(base_path('app/Stimpack/Manipulators/Support/stubs/seeder.stub'))
            ])
        ]);
    }
}