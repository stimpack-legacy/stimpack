<?php

namespace App\Stimpack;

class CreateModelsTask implements Task
{

    public function __construct($nbr) {
        $this->nbr = $nbr;
    }

    // throw new \Exception("Could not delete file ______. Please check your folders are writable!");

    public function perform() {        
        return "Models successfully created!";
    }
}