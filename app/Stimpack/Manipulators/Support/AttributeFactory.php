<?php

namespace App\Stimpack\Manipulators\Support;

use App\Stimpack\Manipulators\Support\EntityFactory;

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
                collect([$this->makeMigrationStatements($name)]),
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

    public function makeMigrationStatements($name)
    {
        return collect([
            $this->overridden($name), 
            $this->reserved($name),
            $this->ruled($name),
            $this->default($name)
        ])->first(function($nameCandidate) {
            return $nameCandidate;
        });
    }

    // here we can place certain names to override according to user history/preferences
    private function overridden($name)
    {
        // not implemented
    }

    // reserved are fields that are used by the laravel frameworks defaults
    private function reserved($name)
    {
        return collect([
            "id"=> '$table->increments(' . "'id');",
            "timestamps"=> '$table->timestamps();',
            "rememberToken"=> '$table->rememberToken();',
            "timestamps()"=> '$table->timestamps();',
            "created_at"=> '$table->timestamp(' . "'created_at')->nullable();",
            "email"=> '$table->string(' . "'email')->unique();"
        ])->get($name);       
    }

    private function ruled($name)
    {
        $transformer = $this->rules()->first(function ($transformer, $rule) use($name) {
            return preg_match($rule, $name);
        });

        if($transformer)
        {
            return $transformer($name);
        }
        
    }

    private function rules()
    {
        return collect([
            // if attribute ends on _id its assumed to be a One to Many (one to one not supported atm)
            // improvement would be to also check if <MODEL>_id actually is a model (exluding current model)
            '/_id$/' => function($name) {                
                $tableName = snake_case(str_plural(
                    str_replace_last("_id", "", $name)
                ));
                return collect([
                    '$table->integer(' . "'" . $name . "')->unsigned();",
                    '$table->foreign(' . "'" . $name . "')->references('id')->on('" . $tableName . "')->onDelete('cascade');"
                ]);
                
            },                        
            // Time columns
            '/(time|date|_at)$/' => function($name) {
                return '$table->timestamp(' . "'" . $name . "');";
            },
            // Boolean
            '/^(has_|is_|got_)/' => function($name) {
                return '$table->boolean(' . "'" . $name . "')->default(false);";
            }
        ]);                                
    }

    private function modelExists($title)
    {
        return true; // fix later
    }

    private function default($name)
    {
        return '$table->string(' . "'" . $name . "');";
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