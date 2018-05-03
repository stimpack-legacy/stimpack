<?php

namespace App\Console\Controllers;

class ManipulatorController
{

    public static function make() {
        return new ManipulatorController();
    }

    public function perform($manipulator, $parameters) {
        return $this->feedback($manipulator, $parameters);
    }

    private function feedback($manipulator, $parameters) {
        try {
            $manipulatorClassName = '\\App\\Stimpack\\Manipulators\\' . $manipulator->name;
            $manipulator = new $manipulatorClassName($manipulator, $parameters);
            $feedback = $manipulator->perform();
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
        return $feedback;
    }     
}