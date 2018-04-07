<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ManipulatorController extends Controller
{
    public function perform(Request $request, $manipulator) {
        return $this->feedback($manipulator, $request->data);
    }

    private function feedback($manipulator, $data) {
        try {
            $manipulatorClassName = '\\App\\Stimpack\\Manipulators\\' . $manipulator;
            $manipulator = new $manipulatorClassName( json_decode($data));
            $feedback = $manipulator->perform();
        } catch (\Exception $e) {
            abort(500, $e->getMessage());
        }
        return $feedback;
    }     
}

