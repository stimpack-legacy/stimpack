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
        $this->attributes = $segment->attributes()->map(function($raw) {
            return new Attribute($raw); 
        });
    }

    public static function make($segment)
    {
        return new Entity($segment);
    }

    public function title()
    {
        return $this->title;
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

    public function fillStub($path, $replacementPairs)
    {
        return $replacementPairs->map(function($value, $key) {
            return collect([$key => $value]);
        })->reduce(function($content, $pair) {
            return str_replace($pair->keys()->first(), $pair->values()->first(), $content);
        }, File::init()->get($path));
    }
}