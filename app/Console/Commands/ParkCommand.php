<?php

namespace App\Console\Commands;

use App\Console\Commands\StimpackCommand;
use Illuminate\Console\Command;
use App\Console\Controllers\ManipulatorController;
use App\Http\Controllers\GuiController;


class ParkCommand extends StimpackCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stimpack:park {path?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Navigate to your Code directory, then run this command.';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {   
        $this->parkAt = (!$this->argument("path")) ? getcwd() : $this->argument("path");

        $this->configureEnviromentFile();
        $this->setEnviromentParameter("STIMPACK_CODE_PATH", $this->parkAt);
        $this->createSymlinkToCode();
        $this->info("Successfully parked at " . $this->parkAt);
    }

    protected function createSymlinkToCode()
    {
        $from = base_path();
        $to = $this->parkAt . "/stimpack";
        
        // Delete existing link. Scenarios:
        // Deploying the stimpack-dev version
        // Redeploying the globally installed version 
        if(is_link($to)){
            unlink($to);
        }

        $this->info("Create symlink from $from to $to");
        symlink($from, $to);
    }
}
