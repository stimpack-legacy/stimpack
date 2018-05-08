<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Console\Controllers\ManipulatorController;
use App\Http\Controllers\GuiController;


abstract class StimpackCommand extends Command
{
    protected function setEnviromentParameter($key, $value)
    {
        file_put_contents($this->laravel->environmentFilePath(), preg_replace(
            '/' . $key .'=.*$/m',
            $key . "=" . $value,
            file_get_contents($this->laravel->environmentFilePath())
        ));
    }
    
    private function args() {
        return collect($this->argument('parameters'));
    }

    private function fullCommand() {
        return collect(["stimpack"])->concat($this->args())->implode(" ");
    }
}