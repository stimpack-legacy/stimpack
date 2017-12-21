<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class TaskController extends Controller
{
    public function perform(Request $request, $task) {        
        return $this->feedback($task, $request->data);
    }

    private function feedback($task, $data) {
        try {
            $taskClassName = '\\App\\Stimpack\\' . $task;
            $task = new $taskClassName($data);
            $feedback = $task->perform();
        } catch (\Exception $e) {            
            $feedback = $e->getMessage();
        }
        return $feedback;
    }
}

