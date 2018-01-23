<?php

namespace App\Stimpack;

use Illuminate\Support\Facades\Log;

class CreateControllersTask implements Task
{

    public function __construct($tasks) {
        $this->tasks = $tasks;
    }

    public function perform() {
        return "Controllers successfully created!";
    }
}