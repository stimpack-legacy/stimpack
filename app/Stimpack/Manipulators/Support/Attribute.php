<?php

namespace App\Stimpack\Manipulators\Support;

class Attribute
{
    public function __construct($attribute)
    {
        $this->raw = $attribute;
    }
    
    public function raw()
    {
        return $this->raw;
    }
}