<?php

namespace App\Console\Commands;

use App\Console\Commands\StimpackCommand;
use Illuminate\Console\Command;
use App\Console\Controllers\ManipulatorController;
use App\Http\Controllers\GuiController;


class HelpCommand extends StimpackCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stimpack:help';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Display stimpack help';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->table(["Command", "Hint"], [
            ["stimpack", "Display help"],
            ["stimpack park", "Install and set stimpack home to current directory."],
            ["stimpack new <name> [from <pack>] [in gui]", "Create a new project using your default pack or an arbitary pack. Optionally use 'in gui' to edit settings before creating."],
            ["stimpack new pack <name> [from <pack>]", "Create a new pack, optionally as a copy of an already existing pack."],            
            ["stimpack open <name>", "Open an existing project in stimpack gui."],
            
        ]);        
    }    
}
