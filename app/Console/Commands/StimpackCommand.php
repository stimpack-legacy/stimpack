<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Console\Controllers\ManipulatorController;
use App\Http\Controllers\GuiController;
use Artisan;

abstract class StimpackCommand extends Command
{    
    protected function args() {
        return collect($this->argument('parameters'));
    }

    protected function fullCommand() {
        return collect(["stimpack"])->concat($this->args())->implode(" ");
    }

    protected function configureEnviromentFile()
    {
        if(file_exists($this->laravel->environmentFilePath())) {
            return;
        }

        copy(base_path('.env.example'), base_path('.env'));
        Artisan::call('key:generate');
    }    
}