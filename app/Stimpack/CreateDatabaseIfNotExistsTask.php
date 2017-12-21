<?php

namespace App\Stimpack;

class CreateDatabaseIfNotExistsTask implements Task
{

    public function __construct($data) {
        //
    }
    public function perform() {        
        return "OK";
    }
}