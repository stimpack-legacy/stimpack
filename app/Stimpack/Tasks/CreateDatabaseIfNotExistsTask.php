<?php

namespace App\Stimpack\Tasks;

use App\Stimpack\Task;

class CreateDatabaseIfNotExistsTask implements Task
{

    public function __construct($data) {
        //
    }
    public function perform() {        
        return "OK";
    }
}