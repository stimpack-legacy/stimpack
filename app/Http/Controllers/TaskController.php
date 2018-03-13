<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    public function perform(Request $request, $task) {
        return $this->feedback($task, $request->tasks);
    }

    private function feedback($task, $tasks) {
        try {
            $taskClassName = '\\App\\Stimpack\\Tasks\\' . $task;
            $task = new $taskClassName( json_decode($tasks));
            $feedback = $task->perform();
        } catch (\Exception $e) {
            abort(500, $e->getMessage());
        }
        return $feedback;
    }     
}

