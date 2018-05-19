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
    
    public static function registerSupportRoutes()
    {
        classes_in_path("app/Stimpack/Manipulators")->each(function($class) {
            if(method_exists($class, "registerSupportRoutes")) {
                $class::registerSupportRoutes();
            }
        });
    }

    public static function attachStartupData()
    {
        $r = classes_in_path("app/Stimpack/Manipulators")->filter(function($class) {
            return method_exists($class, "attachStartupData");
        })->reduce(function($data, $class) {
            $key = class_basename($class);
            $data->$key = $class::attachStartupData();
            return $data;
        }, new \StdClass);

        //dd($r);
        return($r);
    }    
}

