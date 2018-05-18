<?php

namespace App\Stimpack\Manipulators\Support;
use App\Stimpack\Manipulators\Support\PseudoSegment;
use App\Stimpack\Manipulators\Support\ValidateObjectModelTrait;
use App\Stimpack\Manipulators\Support\EntityFactory;


class LaravelObjectModel
{
    use ValidateObjectModelTrait;

    public function __construct($directives)
    {
        $this->directives = $directives;
        $this->errors = collect();
    }


    /* API *********************************************************** */

    public static function make($directives)
    {
        return new LaravelObjectModel($directives);
    }

    public function installFrom($segments)
    {
        $this->segments = $segments;

        if(!$this->validate()) {
            return $this->errors;
        }

        return EntityFactory::makeWith($this->directives)->getAllEntetiesFrom($this->segments)->map(function($entity) {
            return $entity->install();
        })->flatten();
    }

    // So far just a placeholder!
    public function previewFrom($segments)
    {
        $this->segments = $segments;

        if(!$this->validate()) {
            return $this->errors;
        }

        return EntityFactory::makeWith($this->directives)->getAllEntetiesFrom($this->segments)->map(function($entity) {
            return $entity->preview();
        })->flatten();
    }

    /* END API *********************************************************** */   

    private function validate()
    {
        return collect([
            $this->segmentTitleMustBeAValidPHPName(),   
            $this->twoSegmentsCantHaveTheSameTitle(),
        ])->every(function($passedTest) {
            return $passedTest;
        });
    }
}