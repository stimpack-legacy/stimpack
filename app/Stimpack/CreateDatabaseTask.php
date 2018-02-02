<?php

namespace App\Stimpack;

class CreateDatabaseTask implements Task
{

    public function __construct($tasks) {
        $this->tasks = $tasks;
    }

    public function perform() {
        $path = storage_path("database.sqlite");        
        file_put_contents($path, "");
        $message = "Created database at '" . $path . "'";
        return $message;
    }
}