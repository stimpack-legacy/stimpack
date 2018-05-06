<?php

namespace App\Console\Commands;

use App\Console\Commands\StimpackCommand;
use Illuminate\Console\Command;
use App\Console\Controllers\ManipulatorController;
use App\Http\Controllers\GuiController;


class EnvCommand extends StimpackCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stimpack:env';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Display stimpack enviroment';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->table(["Parameter", "Value"], [
            ["STIMPACK_APP_PATH", (env('STIMPACK_APP_PATH')) ? env('STIMPACK_APP_PATH') : "-"],
            ["STIMPACK_CODE_PATH", (env('STIMPACK_CODE_PATH')) ? env('STIMPACK_CODE_PATH') : "Not set!"],
            ["STIMPACK_IO_TOKEN", (env('STIMPACK_IO_TOKEN')) ? env('STIMPACK_IO_TOKEN') : "-"],            
        ]);        
    }    
}

