<?php

namespace App\Stimpack;
use Illuminate\Support\Facades\Log;

class MigrateTask implements Task
{

    public function __construct($tasks) {
        $this->tasks = $tasks;
    }

    public function perform() {
        if(\Artisan::call('migrate:fresh')) {
            return "Failed to migrate:fresh!";
        }
        return "Succesfully ran migrate:fresh!";                
    }
}
