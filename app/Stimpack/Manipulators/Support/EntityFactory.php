<?php

namespace App\Stimpack\Manipulators\Support;

use Illuminate\Support\Facades\Log;
use Exception;
use App\Stimpack\Contexts\File;
use App\Stimpack\Contexts\Project;
use App\Stimpack\Manipulators\Support\Entity\ModelEntity;
use App\Stimpack\Manipulators\Support\Entity\PureTableEntity;
use App\Stimpack\Manipulators\Support\Entity\ManyToManyRelationshipEntity;
use App\Stimpack\Relationship;

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
        $this->allEntities = collect([
            $this->modelEntities(),
            $this->manyToManyRelationshipEntities(),
            $this->pureTableEntities()
        ])->flatten();

        // Attach additional information
        return $this->allEntities->map(function($entity) {
            // Before we return all entities we attach the all the sourounding entities since they might be dependent on each other.
            $entity->allModelEntities = $this->modelEntities();
            $entity->allManyToManyRelationshipEntities = $this->manyToManyRelationshipEntities();
            $entity->allPureTableEntities = $this->pureTableEntities();
            // We also append the attributes
            $entity->attributes = AttributeFactory::make($this->allEntities)->forEntity($entity);
            // Furthermore we also attach the directives passed from ScaffoldLaravel
            $entity->directives = $this->directives;
            // And relationships
            $entity->allBelongsToRelationships = $this->belongsToRelationships();

            return $entity;
        })->flatten();
    }

    public function modelEntities() {
        return $this->segments->filter(function($segment) {
            return $this->isModel($segment);
        })->map(function($segment) {
            return new ModelEntity($segment);
        });
    }
                
    public function manyToManyRelationshipEntities()
    {
        return $this->segments->filter(function($segment) {
            return $this->isManyToManyRelationship($segment);
        })->map(function($segment) {
            return new ManyToManyRelationshipEntity($segment);
        });
    }
    
    public function pureTableEntities()
    {
        return $this->segments->filter(function($segment) {
            return $this->isPureTable($segment);
        })->map(function($segment) {
            return new PureTableEntity($segment);
        });
    }    

    public function belongsToRelationships()
    {
        return $this->allEntities->map(function($entity) {
            return $entity->attributes()->filter(function($attribute) {
                return preg_match('/(.*)_id$/', $attribute->name());
            })->map(function($attribute) {
                preg_match('/(.*)_id$/', $attribute->name(), $matches);
                $ownerTableName = $matches[1];
                return new Relationship($attribute->name(), $ownerTableName, "BelongsTo");
            });
        })->flatten();
    }

    public function isModel($segment)
    {
        // If uppercase first char its a Model
        return $segment->title() == studly_case($segment->title());
    }

    public function isManyToManyRelationship($segment)
    {
        // If segment matches MODEL1_MODEL2
        $modelOptions = $this->modelEntities()->map(function($modelEntity) {
            return $modelEntity->singularLowerCaseTitle();
        })->implode("|");
        $manyToManyRegExp = "/^(" . $modelOptions . ")_(" . $modelOptions . ")$/";        
        
        return (!$this->isModel($segment)) && preg_match($manyToManyRegExp,$segment->title());
    }
    
    public function isPureTable($segment)
    {
        return (!$this->isModel($segment)) && (!$this->isManyToManyRelationship($segment));
    }    
}