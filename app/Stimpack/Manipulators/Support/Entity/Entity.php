<?php

namespace App\Stimpack\Manipulators\Support\Entity;

class Entity
{
    public function __construct($segment)
    {
        $this->segment = $segment;
    }

    public static function make($segment)
    {
        return new Entity($segment);
    }
}