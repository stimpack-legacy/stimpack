<?php

namespace App\Stimpack\Manipulators;

use App\Stimpack\Manipulator;

class CreateDatabase extends Manipulator
{
    public function perform() {
        return "Dummy implementation";
        /*
        $path = "/home/anders/Code/" . $this->projectName() . "/storage/database.sqlite";        
        file_put_contents($path, "");       
        
        return [
            "name" => $this->name,
            "status" => "succeded!",
            "messages" => [
                "Created database at '" . $path . "'"
            ]
        ];
        */        
    }
}