<?php

namespace App\Stimpack\Manipulators\Support;
use App\Stimpack\Manipulators\Support\PseudoSegment;
use App\Stimpack\Manipulators\Support\ValidateObjectModelTrait;
use App\Stimpack\Manipulators\Support\EntityFactory;
use App\Stimpack\Contexts\File;
use App\Stimpack\FilePreview;

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

    public function installFromOld($segments)
    {
        $this->segments = $segments;

        if(!$this->validate()) {
            return $this->errors;
        }

        return EntityFactory::makeWith($this->directives)->getAllEntetiesFrom($this->segments)->map(function($entity) {
            return $entity->install();
        })->flatten();
    }

    public function installFrom($result)
    {
        return collect($result)->each(function($content, $path) {            
            File::save(
                path($this->directives->targetProjectPath, $path),
                $content
            );
        })->map(function($content, $path) {
            return "Created " . $path;
        })->values();        
    }

    // Refactor needed!!
    public function previewFrom($segments)
    {
        $this->segments = $segments;

        if(!$this->validate()) {
            return $this->errors;
        }

        $filePreviews = EntityFactory::makeWith($this->directives)->getAllEntetiesFrom($this->segments)->map(function($entity) {
            return $entity->preview();
        })->flatten();
        /*
        // Sort by path ( disaebled to prevent relationship conflict )
        $sortedArray = $filePreviews->toArray();
        usort($sortedArray, function($a, $b) {
            if($a->path == $b->path){ return 0 ; }
            return ($a->path < $b->path) ? -1 : 1;
        });
        $filePreviews = collect($sortedArray);
        */
        // Convert to object
        $filePreviews = $filePreviews->reduce(function($result, $item) {
            $key = $item->path;
            $result->$key = $item->content;
            return $result;

        }, new \StdClass());

        return collect($filePreviews);

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