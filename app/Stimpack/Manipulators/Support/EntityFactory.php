<?php

namespace App\Stimpack\Manipulators\Support;

use Illuminate\Support\Facades\Log;
use Exception;
use App\Stimpack\Contexts\File;
use App\Stimpack\Contexts\Project;
use App\Stimpack\Manipulators\Support\Entity\ModelEntity;
use App\Stimpack\Manipulators\Support\Entity\PureTableEntity;
use App\Stimpack\Manipulators\Support\Entity\RelationshipEntity;


class EntityFactory
{
    public function __construct($segments)
    {
        $this->segments = $segments;
    }

    public static function from($segments)
    {
        return (new EntityFactory($segments));
    }

    public function files()
    {
        $this->models = $this->segments->filter(function($segment) {
            return $this->isModel($segment);
        })->map(function($segment) {
            return new ModelEntity($segment);
        });

        $this->relationships = $this->segments->filter(function($segment) {
            return $this->isRelationship($segment);
        })->map(function($segment) {
            return new RelationshipEntity($segment);
        });

        $this->pureTables = $this->segments->filter(function($segment) {
            return $this->isPureTable($segment);
        })->map(function($segment) {
            return new PureTableEntity($segment);
        });

        return $this->models->concat($this->relationships)->concat($this->pureTables)->map(function($entity) {
            return $entity->files();
        })->flatten();
    }

    public function segmentToEntity($segment)
    {
        // If uppercase first char its a Model
        if($segment->title() == studly_case($segment->title())) {
            return new ModelEntity($segment);
        }

        // If lowercase model1_model2 its a many to many relationship table
        if(str_contains($segment->title(),"_")) {
            return new RelationshipEntity($segment);
        }

        // if lowercase foobar its just a table
        return new PureTableEntity($segment);
    }

    public function isModel($segment)
    {
        // If uppercase first char its a Model
        return $segment->title() == studly_case($segment->title());
    }

    public function isRelationship($segment)
    {
        // If segment matches MODEL1_MODEL2
        return (!$this->isModel($segment)) && str_contains($segment->title(),"_");
    }
    
    public function isPureTable($segment)
    {
        return (!$this->isModel($segment)) && (!$this->isRelationship($segment));
    }    
}