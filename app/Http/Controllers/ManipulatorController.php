<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ManipulatorController extends Controller
{
    public function perform(Request $request, $manipulator) {
        return $this->feedback($manipulator, $request->data, $request->globalParameters);
    }

    private function feedback($manipulator, $data, $globalParameters) {
        try {
            $manipulatorClassName = '\\App\\Stimpack\\Manipulators\\' . $manipulator;
            $manipulator = new $manipulatorClassName( json_decode($data), json_decode($globalParameters));
            $feedback = $manipulator->perform();
        } catch (\Exception $e) {
            abort(500, $e->getMessage());
        }
        return $feedback;
    }     
}

