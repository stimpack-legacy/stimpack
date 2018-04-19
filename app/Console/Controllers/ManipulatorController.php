<?php

namespace App\Console\Controllers;

class ManipulatorController
{

    public static function make() {
        return new ManipulatorController();
    }

    public function perform($manipulator) {
        return $this->feedback($manipulator);
    }

    private function feedback($manipulator) {
        try {
            $manipulatorClassName = '\\App\\Stimpack\\Manipulators\\' . $manipulator->name;
            $manipulator = new $manipulatorClassName($manipulator);
            $feedback = $manipulator->perform();
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
        return $feedback;
    }     
}