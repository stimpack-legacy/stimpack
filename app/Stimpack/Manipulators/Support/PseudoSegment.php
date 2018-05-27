<?php

namespace App\Stimpack\Manipulators\Support;

class PseudoSegment
{
    public function __construct($parts, $segmentIndex)
    {
        $this->parts = $parts;
        $this->segmentIndex = $segmentIndex;
    }

    public static function make($parts, $segmentIndex)
    {
        return new PseudoSegment($parts, $segmentIndex);
    }

    public function title()
    {
        return $this->parts->first();        
    }

    public function pseudoAttributes()
    {
        return $this->parts->slice(1)->values();        
    }    
}