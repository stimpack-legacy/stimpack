<?php

namespace App\Stimpack;

use Illuminate\Support\Facades\Log;

class CreateModelsTask implements Task
{

    public function __construct($tasks) {
        $this->tasks = $tasks;
    }

    public function perform() {
        return "Models successfully created! This task also used state data sent from frontend. Watch: " . $this->tasks[0]["id"] . " and " . $this->tasks[1]["id"] . " aint that cool??!";
    }
}