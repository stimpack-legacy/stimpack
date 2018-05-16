<?php

namespace App\Stimpack\Manipulators\Support;

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
}