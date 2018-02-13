<?php

namespace App\Stimpack\Tasks;
use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;

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
