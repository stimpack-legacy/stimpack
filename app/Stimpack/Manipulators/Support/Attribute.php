<?php

namespace App\Stimpack\Manipulators\Support;

class Attribute
{
    public function __construct($name, $migrationStatements, $seederStatements, $isHidden, $isFillable)
    {
        $this->name = $name;
        $this->migrationStatements = $migrationStatements;
        $this->seederStatements = $seederStatements;
        $this->isHidden = $isHidden;
        $this->isFillable = $isFillable;
    }
    
    public function name()
    {
        return $this->name;
    }

    public function migrationStatements()
    {
        return $this->migrationStatements;
    }

    public function seederStatements()
    {
        return $this->seederStatements;
    }    

    public function isHidden()
    {
        return $this->isHidden;
    }
    
    public function isFillable()
    {
        return $this->isFillable;
    }    
}