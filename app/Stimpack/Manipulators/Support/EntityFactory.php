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
    public function __construct($directives)
    {
        $this->directives = $directives;
    }

    public static function makeWith($directives)
    {
        return (new EntityFactory($directives));
    }

    public function getAllEntetiesFrom($segments)
    {
        $this->segments = $segments;
        return $this->all();
    }

    public function all()
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

        $all = $this->models->concat($this->relationships)->concat($this->pureTables);

        // Before we return all entities we attach the all the sourounding entities since they might be dependent on each other.
        // Furthermore we also attach the directives passed from ScaffoldLaravel
        return $all->map(function($entity) {
            $entity->allModels = $this->models;
            $entity->allRelationships = $this->relationships;
            $entity->allPureTables = $this->pureTables;
            $entity->directives = $this->directives;
            return $entity;
        })->flatten();
    }

    public function isModel($segment)
    {
        // If uppercase first char its a Model
        return $segment->title() == studly_case($segment->title());
    }

    public function isRelationship($segment)
    {
        // If segment matches MODEL1_MODEL2
        $modelOptions = $this->models->map(function($modelEntity) {
            return $modelEntity->singularLowerCaseTitle();
        })->implode("|");
        $manyToManyRegExp = "/^(" . $modelOptions . ")_(" . $modelOptions . ")$/";        
        
        return (!$this->isModel($segment)) && preg_match($manyToManyRegExp,$segment->title());
    }
    
    public function isPureTable($segment)
    {
        return (!$this->isModel($segment)) && (!$this->isRelationship($segment));
    }    
}