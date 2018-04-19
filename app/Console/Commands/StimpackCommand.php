<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Console\Controllers\ManipulatorController;
use App\Http\Controllers\GuiController;


class StimpackCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stimpack {parameters?*}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Proxy command for stimpack-cli';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $handler = collect([
            'stimpack' => "homeHandler",
            'stimpack help' => "helpHandler",
            'stimpack list' => "listHandler",
            'stimpack run [\w-\s]+' => "runHandler",
            "stimpack new [\w-]+( from [\w-\/]+)?" => "newHandler",
            "stimpack open [\w-]+" => "openHandler",            
            // default
            '.*?' => "commandNotRecognizedHandler"
        ])->first(function($handler, $regex) {                        
            return preg_match('/^' . $regex . '$/', $this->fullCommand());
        });

        $this->$handler();
    }


    private function args() {
        return collect($this->argument('parameters'));
    }

    private function fullCommand() {
        return collect(["stimpack"])->concat($this->args())->implode(" ");
    }

    private function homeHandler() {
        $logo = '
        _____ __  _                            __  
       / ___// /_(_)___ ___  ____  ____ ______/ /__
       \__ \/ __/ / __ `__ \/ __ \/ __ `/ ___/ //_/
      ___/ / /_/ / / / / / / /_/ / /_/ / /__/ ,<   
     /____/\__/_/_/ /_/ /_/ .___/\__,_/\___/_/|_|  
                         /_/';
        
        $this->line($logo);
        $this->line("\n             By Anders Jürisoo and contributors");
        $this->helpHandler();
    }

    private function helpHandler() {

        $this->table(["Command", "Hint"], [
            ["stimpack", "Display help"],
            ["stimpack park", "Install and set stimpack home to current directory."],
            ["stimpack new <name> [from <pack>] [in gui]", "Create a new project using your default pack or an arbitary pack. Optionally use 'in gui' to edit settings before creating."],
            ["stimpack new pack <name> [from <pack>]", "Create a new pack, optionally as a copy of an already existing pack."],            
            ["stimpack open <name>", "Open an existing project in stimpack gui."],
            
        ]);        
    }

    private function openHandler() {
        // stimpack open pack
        $project = $this->args()[1];
        exec("xdg-open http://stimpack.test/open/" . $project);
    }

    private function runHandler() {
        // stimpack run pack
        $packName = $this->args()[1];
        $packParameters = $this->args()->slice(2)->values();
        $compiledManipulators = collect(json_decode(
            file_get_contents("/home/anders/Code/stimpack/storage/stimpack/packs/" . $packName . ".json")
        )->compiled);
        $this->info("Running pack " . $packName . "!\n");
        
        $compiledManipulators->each(function($manipulator) {
            $this->info($manipulator->name);
            collect(
                ManipulatorController::make()->perform($manipulator)["messages"]
            )->each(function ($message) {
                $this->comment(" - " .$message);
            });
            $this->line("");    
        });
    }

    private function newHandler() {
        // stimpack new app from template
        $projectName = $this->args()[1];
        $packName = $this->args()[3];
        $path = "/home/anders/Code/";

        $compiledManipulators = collect(json_decode(
            file_get_contents("/home/anders/Code/stimpack/storage/stimpack/packs/" . $packName . ".json")
        )->compiled)->map(function($manipulator) use($projectName, $packName, $path) {
            // Reset all starters path to the project to be created
            if(isset($manipulator->isStarter) && $manipulator->isStarter)
            {
                $manipulator->path = $path . $projectName;
            }

            // Reset all context paths to the project to be created
            $manipulator->context->path = $path . $projectName;                        
            return $manipulator;
        });

        $compiledManipulators->each(function($manipulator) {
            $this->info($manipulator->name);
            collect(
                ManipulatorController::make()->perform($manipulator)["messages"]
            )->each(function ($message) {
                $this->comment(" - " .$message);
            });
            $this->line("");
        });
    }
    
    private function commandNotRecognizedHandler() {
        $this->error("\nStimpack could not parse parameters!");
        $this->info("\nPlease confirm you are using correct syntax:\n");
        $this->helpHandler();
        $this->info("");
    }
    
    private function listHandler() {
        $packs = (new GuiController())->localPacks();
        $packs->each(function($pack) {
            //$this->info($pack->name);
        });
        $this->table(["Local packs"], 
            $packs->map(function($pack) {
                return [$pack->name];
            })->toArray()
        );        
        
    }    
}
