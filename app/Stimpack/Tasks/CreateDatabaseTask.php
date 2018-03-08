<?php

namespace App\Stimpack\Tasks;

use App\Stimpack\Task;

class CreateDatabaseTask extends Task
{
    public function perform() {
        $path = "/home/anders/Code/" . $this->projectName() . "/storage/database.sqlite";        
        file_put_contents($path, "");
        $message = "Created database at '" . $path . "'";
        return $message;
    }
}