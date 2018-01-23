<?php

namespace App\Stimpack;

use Illuminate\Support\Facades\Log;

class CreateModelsTask implements Task
{

    public function __construct($tasks) {
        $this->tasks = $tasks;
    }

    public function perform() {
        return "Models successfully created!";
    }
}