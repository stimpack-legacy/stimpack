<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Console\Controllers\TaskController;


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
        if ($this->args()->isEmpty()) return $this->homeHandler();
        if ($this->args()->first() == "help") return $this->helpHandler();
        if ($this->args()->first() == "park") return $this->parkHandler();
        if ($this->args()->first() == "new") return $this->newHandler();
        if ($this->args()->first() == "open") return $this->openHandler();
        
        $this->commandNotRecognizedHandler();
    }


    private function args() {
        return collect($this->argument('parameters'));
    }

    private function commandNotRecognizedHandler() {
        $this->error("\nStimpack could not parse parameters!");
        $this->info("\nPlease confirm you are using correct syntax:\n");
        $this->helpHandler();
        $this->info("");
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

    private function parkHandler() {
        $this->info("Im about to park your stimpack installation rigth here.");
    }

    private function openHandler() {
        $this->info("Woh! Det funkar att ö.");
    }

    private function newHandler() {
        if($this->args()->count() == 2) {
            $projectName = $this->args()[1];


            $tasks = collect(json_decode(
                file_get_contents("/home/anders/Code/stimpack/storage/stimpack/packs/default.json")
            ));

            $tasks->firstWhere('name', 'SetTargetProjectTask')->projectName = $projectName;

            TaskController::make()->performAll($tasks)->each(function($taskFeedback) {
                $this->comment($taskFeedback["name"] . " " . $taskFeedback["status"]);
                collect($taskFeedback["messages"])->each(function($message) {
                    $this->info($message);
                });
                $this->line("");                
            });
            $this->line("");
            
            return;
        }

        if($this->args()->count() == 4) {
            return $this->info("Creating new application");
        }

        if($this->args()->count() == 6) {
            return $this->info("Creating new application");
        }
        
        $this->commandNotRecognizedHandler();
    }    
}
