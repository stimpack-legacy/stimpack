<?php

namespace App\Stimpack\Manipulators;

use App\Stimpack\Manipulator;

class ThrowBackEndError extends Manipulator
{
    public function perform() {
        return [][1337];
        
    }
}