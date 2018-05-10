<?php

namespace App\Stimpack\Manipulators\Support\Entity;

class Entity
{
    public function __construct($segment)
    {
        $this->segment = $segment;
        $this->title = $segment->title();
        $this->attributes = $segment->attributes();
    }

    public static function make($segment)
    {
        return new Entity($segment);
    }
}