<?php

namespace App\Stimpack;

class CreateDatabaseTask extends Task
{
    public function perform() {
        $path = $this->projectPath()."/storage/database.sqlite";        
        file_put_contents($path, "");
        $message = "Created database at '" . $path . "'";
        return $message;
    }
}