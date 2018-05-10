<?php 

namespace App\Stimpack\Manipulators\Support;

trait ValidateObjectModelTrait
{
    public function twoSegmentsCantHaveTheSameTitle()
    {
        $allTitles = $this->segments->map(function($segment) {
            return $segment->title();
        });

        if($allTitles->count() != $allTitles->unique()->count()) {
            $this->errors->push("Two segments cant have the same title!");
            return false;
        }

        return true;
    }

    public function segmentTitleMustBeAValidPHPName()
    {
        $allOk = $this->segments->map(function($segment) {
            return $segment->title();
        })->every(function($title) {
            return preg_match('/^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*$/',$title);
        });

        if(!$allOk) {
            $this->errors->push("Segment titles must be valid php names!");
            return false;
        }

        return true;
    }    
}