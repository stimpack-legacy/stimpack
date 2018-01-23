<?php

namespace App\Stimpack;

use Illuminate\Support\Facades\Log;

class StarOnGithubTask implements Task
{

    public function __construct($tasks) {
        $this->tasks = $tasks;
    }

    public function perform() {
        return "Starred this project on github!";
    }
}