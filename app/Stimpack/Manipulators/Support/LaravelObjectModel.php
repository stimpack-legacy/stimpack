<?php

namespace App\Stimpack\Manipulators\Support;
use App\Stimpack\Manipulators\Support\PseudoSegment;
use App\Stimpack\Manipulators\Support\ValidateObjectModelTrait;

class LaravelObjectModel
{
    use ValidateObjectModelTrait;

    public function __construct()
    {
        $this->errors = collect();
    }

    public static function make()
    {
        return new LaravelObjectModel();
    }

    public function from($segments)
    {
        $this->segments = $segments;

        if(!$this->validate()) {
            return $this->errors;
        }
        return ["Ok I just created your project!"];    
    }

    public function validate()
    {
        return collect([
            $this->segmentTitleMustBeAValidPHPName(),
            $this->twoSegmentsCantHaveTheSameTitle(),
        ])->every(function($passedTest) {
            return $passedTest;
        });
    }
}