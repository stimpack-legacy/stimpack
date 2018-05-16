<?php

namespace App\Stimpack\Manipulators\Support\Entity;
use App\Stimpack\Contexts\File;
use App\Stimpack\Manipulators\Support\Attribute;
use Illuminate\Support\Str;

class Entity
{
    public function __construct($segment)
    {
        $this->segment = $segment;
        $this->title = $segment->title();
        $this->pseudoAttributes = $this->segment->pseudoAttributes();
    }

    public static function make($segment)
    {
        return new Entity($segment);
    }

    public function title()
    {
        return $this->title;
    }

    public function pseudoAttributes()
    {
        return $this->pseudoAttributes;
    }
    
    public function attributes()
    {
        return $this->attributes;
    }    

    public function singularLowerCaseTitle()
    {
        return strtolower($this->title());
    }

    public function pluralStudlyCaseTitle()
    {
        return studly_case(Str::plural(class_basename($this->title())));
    }

    public function pluralSnakeCaseTitle()
    {
        return Str::plural(Str::snake(class_basename($this->title())));
    }

    public function migrationColumns()
    {
        return $this->attributes->map(function($attribute) {
            return $attribute->migrationStatements();
        })->flatten()->implode("\n");
    }

    public function relationships()
    {
        $relationships = $this->allModels->filter(function($model) {
            
        });

        return collect([]);
    }

    public function replaceOrDestroyLine($marker, $replacement, $content)
    {     
        // placeholder implementation
        return $content;
    }
}