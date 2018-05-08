<?php

namespace App\Stimpack\Manipulators;
use Exception;

use App\Stimpack\Manipulator;

class ThrowBackEndError extends Manipulator
{
    public function perform() {
        throw new Exception("This error was created for testing purposes.");        
    }
}