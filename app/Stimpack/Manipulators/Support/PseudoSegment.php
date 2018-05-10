<?php

namespace App\Stimpack\Manipulators\Support;

class PseudoSegment
{
    public function __construct($parts)
    {
        $this->parts = $parts;
    }

    public static function make($parts)
    {
        return new PseudoSegment($parts);
    }

    public function title()
    {
        return $this->parts->first();        
    }
}