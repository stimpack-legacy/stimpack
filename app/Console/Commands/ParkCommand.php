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
        $parkAt = (!$this->argument("path")) ? getcwd() : $this->argument("path");

        $this->configureEnviromentFile();
        $this->setEnviromentParameter("STIMPACK_CODE_PATH", $parkAt);

        $this->info("Parked at " . $parkAt);
    }
}
