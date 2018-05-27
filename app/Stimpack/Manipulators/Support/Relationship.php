<?php

namespace App\Stimpack\Manipulators\Support;
use App\Stimpack\Contexts\File; 

class Relationship
{
    public function __construct($first, $type, $second)
    {
        $this->first = $first;
        $this->type = $type;
        $this->second = $second;
    }
    
    public function first()
    {
        return $this->first;
    }

    public function type()
    {
        return $this->type;
    }
    
    public function second()
    {
        return $this->second;
    }
    
    public function render($bindMethod, $methodName, $className)
    {
        return str_pair_replace(
            collect([
                "METHOD_NAME" => $methodName,
                "BIND_METHOD" => $bindMethod,
                "CLASS_NAME" => $className
            ]),
            File::init()->get(base_path("app/Stimpack/Manipulators/Support/stubs/genericRelationship.stub"))
        );        
    }



    public function getBindMethod()
    {
        if($this->type == "OneToMany") {

        }
    }

    public function concerns($entity)
    {        
        return $this->first == $entity->tableSingularCase();
    }

    public function renderMethod($entity)
    {
        return str_pair_replace(
            collect([
                "METHOD_NAME" => ($this->type == "belongsTo") ? $entity->methodSingularCase($this->second) : $entity->methodPluralCase($this->second),
                "BIND_METHOD" => $this->type,
                "CLASS_NAME" => $entity->classCase($this->second)
            ]),
            File::init()->get(base_path("app/Stimpack/Manipulators/Support/stubs/genericRelationship.stub"))
        );
    }
    
    public function __toString()
    {
        return $this->first . " " . $this->type . " " . $this->second;
    }
}