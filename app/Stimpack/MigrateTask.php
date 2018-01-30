<?php

namespace App\Stimpack;
use Illuminate\Support\Facades\Log;

class MigrateTask implements Task
{

    public function __construct($tasks) {
        $this->tasks = $tasks;
    }

    public function perform() {
        
        return "PHP ARTISAN MIGRATE:FRESH";                
    }
}
