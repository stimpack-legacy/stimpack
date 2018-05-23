<?php

namespace App\Console\Commands;

use App\Console\Commands\StimpackCommand;
use Illuminate\Console\Command;
use App\Console\Controllers\ManipulatorController;
use App\Http\Controllers\GuiController;


class HomeCommand extends StimpackCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stimpack';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'About';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $logo = '
        _____ __  _                            __  
       / ___// /_(_)___ ___  ____  ____ ______/ /__
       \__ \/ __/ / __ `__ \/ __ \/ __ `/ ___/ //_/
      ___/ / /_/ / / / / / / /_/ / /_/ / /__/ ,<   
     /____/\__/_/_/ /_/ /_/ .___/\__,_/\___/_/|_|  
                         /_/';
        
        $this->line($logo);
        $this->info("\n         By stimpack.io and contributors 2017-" . date("Y") . "\n");                        
    }    
}
