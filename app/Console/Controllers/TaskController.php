<?php

namespace App\Console\Controllers;

class TaskController
{

    public static function make() {
        return new TaskController();
    }

    public function performAll($tasks) {
        return $tasks->map(function($task) use($tasks) {
            return $this->feedback($task, $tasks);
        });
    }

    private function feedback($task, $tasks) {
        try {
            $taskClassName = '\\App\\Stimpack\\Tasks\\' . $task->name;
            $task = new $taskClassName( $tasks);
            $feedback = $task->perform();
        } catch (\Exception $e) {
            dd($e);
        }
        return $feedback;
    }     
}