<?php

namespace App\Stimpack\Tasks;

use App\Stimpack\Task;

class CreateDatabaseTask extends Task
{
    public function perform() {
        $path = "/home/anders/Code/" . $this->projectName() . "/storage/database.sqlite";        
        file_put_contents($path, "");       
        
        return [
            "name" => $this->name,
            "status" => "succeded!",
            "messages" => [
                "Created database at '" . $path . "'"
            ]
        ];        
    }
}