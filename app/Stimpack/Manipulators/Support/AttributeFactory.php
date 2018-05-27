<?php

namespace App\Stimpack\Manipulators\Support;

use App\Stimpack\Manipulators\Support\EntityFactory;
use App\Stimpack\Manipulators\Support\MigrationStatements;
use App\Stimpack\Manipulators\Support\SeederStatements;

class AttributeFactory
{
    public function __construct($entities)
    {
        $this->entities = $entities;
    }

    public static function make($entities)
    {
        return new AttributeFactory($entities);
    }
    
    public function forEntity($entity)
    {
        $pseudoAttributes = $entity->pseudoAttributes();

        $pseudoAttributes = $this->entities->first(function($candidate) use($entity) {
            return $candidate->title() == $entity->title();
        })->pseudoAttributes();
        
        if(preg_match($this->manyToManyRegExp($entity), $entity->title(), $matches)) {
            
            $pseudoAttributes = $pseudoAttributes->concat(collect([
                $matches[1] . "_id",
                $matches[2] . "_id"
            ]));
        }
        

        $attributes = $pseudoAttributes->map(function($name) {
            return new Attribute(
                $name,
                collect([MigrationStatements::make($name)]),
                collect([SeederStatements::make($name)]),
                $this->isHidden($name),
                $this->isFillable($name)
            );
        });

        return $attributes;
    }

    public function manyToManyRegExp($entity)
    {
        // If segment matches MODEL1_MODEL2
        $modelOptions = $this->entities->filter(function($candidate) use($entity) {
            return $candidate->title() != $entity->title();
        })->map(function($candidate) {
            return $candidate->tableSingularCase();
        })->implode("|");
        return "/^(" . $modelOptions . ")_(" . $modelOptions . ")$/";
    }


    private function modelExists($title)
    {
        return true; // fix later
    }

    private function isFillable($name) {
        return !collect([
            "created_at",
            "updated_at",
            "id"
        ])->contains($name);
    }

    private function isHidden($name) {
        return collect([
            "password",
            "remember_token"
        ])->contains($name);
    }
}