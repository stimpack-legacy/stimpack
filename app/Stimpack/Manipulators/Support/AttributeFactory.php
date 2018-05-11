<?php

namespace App\Stimpack\Manipulators\Support;

class AttributeFactory
{
    public function __construct($entity)
    {
        $this->entity = $entity;
    }

    public static function make($entity)
    {
        return new AttributeFactory($entity);
    }
    
    public function all()
    {
        return $this->entity->attributes();
    }
}