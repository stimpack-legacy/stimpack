<?php

namespace App\Stimpack;

class CreateMigrationsTask implements Task
{

    public function __construct($nbr) {
        $this->nbr = $nbr;
    }

    // throw new \Exception("Could not delete file ______. Please check your folders are writable!");

    public function perform() {        
        return "Ok, I was refered to by the controller!. Class proof: " . $this->nbr;
    }
}