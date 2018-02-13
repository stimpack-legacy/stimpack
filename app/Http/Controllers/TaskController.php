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
            $feedback = "THIS TASK FAILED!!!   --->   " . $e->getMessage();
        }
        return $feedback;
    }

    private function array_to_object($array) {
        $obj = new \stdClass;
        foreach($array as $k => $v) {
           if(strlen($k)) {
              if(is_array($v) && $v != []) {
                 $obj->{$k} = $this->array_to_object($v); //RECURSION
              } else {
                 $obj->{$k} = $v;
              }
           }
        }
        return $obj;
      }     
}

