<?php

namespace App\Stimpack\Manipulators\Support;
use App\Stimpack\Contexts\File; 

class Relationship
{
    public function __construct($from, $to, $type)
    {
        $this->from = $from;
        $this->to = $to;
        $this->type = $type;
    }
    
    public function from()
    {
        return $this->from;
    }

    public function to()
    {
        return $this->to;
    }
    
    public function type()
    {
        return $this->type;
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
        return $this->from == $entity->singularLowerCaseTitle() || $this->to == $entity->singularLowerCaseTitle();
    }

    public function renderFor($entity)
    {
        if($this->type == "ManyToMany")
        {
            if($this->from == $entity->singularLowerCaseTitle()) {
                return $this->render("belongsToMany", str_plural(camel_case($this->to)), studly_case($this->to));
            }
            if($this->to == $entity->singularLowerCaseTitle()) {
                return $this->render("belongsToMany", str_plural(camel_case($this->from)), studly_case($this->from));
            }            
        }

        if($this->type == "OneToMany")
        {
            if($this->from == $entity->singularLowerCaseTitle()) {
                return $this->render("belongsTo", camel_case($this->to), studly_case($this->to));
            }
            if($this->to == $entity->singularLowerCaseTitle()) {
                return $this->render("hasMany", str_plural(camel_case($this->from)), studly_case($this->from));
            }
        }        
    }    
}