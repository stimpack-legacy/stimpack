<?php

namespace App\Stimpack\Tasks;

use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;

class CreateControllersTask implements Task
{

    public function __construct($tasks) {
        $this->tasks = $tasks;
    }

    public function perform() {
        return "Controllers successfully created!";
    }
}