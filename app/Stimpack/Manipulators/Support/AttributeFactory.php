<?php

namespace App\Stimpack\Manipulators\Support;

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
        $pseudoAttributes = $this->entities->first(function($candidate) use($entity) {
            return $candidate->title() == $entity->title();
        })->pseudoAttributes();

        $attributes = $pseudoAttributes->map(function($pseudoAttribute) {
            $name = $pseudoAttribute;
            $migrationStatements = collect([
                $this->makeMigrationStatement($name)
            ]);
            $isHidden = false;
            $isFillable = false;
            
            return new Attribute(
                $name,
                $migrationStatements,
                $isHidden,
                $isFillable
            );
        });

        return $attributes;
        // Lookup
            // <model>_id check for table <model> if so add multiple lines (integer field + foreign key)

    }

    public function makeMigrationStatement($name)
    {
        return collect([
            $this->overridden($name), 
            $this->reserved($name),
            //$this->ruled($name),
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

    private function default($name)
    {
        return '$table->string(' . "'" . $name . "');";
    }
}

/*
import Cache from './Cache';

export default class Attribute {
    constructor(name) {
        this.name = name;
        this.migrationDefinition = this.defineMigrationStatement(name);
    }

    defineMigrationStatement(name) {
        return [
            this.overridden(name), 
            this.reserved(name),
            this.ruled(name),
            this.default(name)
        ].find((filter) => filter);
    }
       
    overridden(name) {
        // Handle overridden line starting with $
        if(name.charAt(0) == "$") {
            // Save for future reference?
            return name;
        }

        // Load previous override rules
        var overrided = {}; 
        if(overrided.hasOwnProperty(name)) {
            return overrided[name];
        }

        return false;        
    }

    reserved(name) {
        var reservedNames = {
            "id": "$table->increments();",
            "timestamps": "$table->timestamps();",
            "rememberToken": "$table->rememberToken();",
            "timestamps()": "$table->timestamps();",
            "created_at": "$table->timestamp('created_at')->nullable();",
            "email": "$table->string('email')->unique();",
        }
        if(reservedNames.hasOwnProperty(name)) {
            return reservedNames[name];
        }

        return false;        
    }

    ruled(name) {
        var matchedRuleKey = Object.keys(this.rules()).find((rule) => (new RegExp(rule)).test(name));
        if(typeof matchedRuleKey !== "undefined") {
            return this.rules()[matchedRuleKey](name);
        }

        return false;
    }

    default(name) {
        return "$table->string('" + name + "');"
    }

    rules() { 
        return {
            // One to Many explicit
            "_id$": function(name) {
                var cleanedSingular = name.slice(0, name.length-3).replace(/_/g,"");
                var plural = Cache.getLike(cleanedSingular,'plural');
                var definition = "$table->integer('" + name + "')->unsigned();";
                definition += " " + "$table->foreign('" + name + "')->references('id')->on('" + plural + "')->onDelete('cascade');";
                return definition
            },            
            // Time columns
            "(time|date|_at)$": function(name) {
                return "$table->timestamp('" + name + "');";
            },
            // Boolean
            "^(has_|is_|got_)": function(name) {
                return "$table->boolean('" + name + "')->default(false);";
            },
        };                        
    }

    fillable() {
        return ![
            "created_at",
            "updated_at",
            "id"
        ].includes(this.name);
    }

    hidden() {
        return [
            "password",
            "remember_token"
        ].includes(this.name);
    }


}