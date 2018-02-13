<?php

namespace App\Stimpack\Tasks;
use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;

class GitInitTask implements Task
{

    public function __construct($tasks) {
        $this->tasks = $tasks;
    }

    public function perform() {
        return shell_exec ( "git init /home/anders/Code/gittest" );                        
    }
}
