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
        $handler = collect([
            'stimpack' => "homeHandler",
            'stimpack help' => "helpHandler",
            "stimpack new [\w-]+( from [\w-\/]+)?( in gui)?" => "newHandler",
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
        $this->info("Woh! Nu ska vi öppna ett project!");
        $project = $this->args()[1]; // Does not feal clean. Assign stuff at parsing instead?
        exec("xdg-open http://stimpack.test/" . $project);
    }

    private function newHandler() {
        $tasks = collect(json_decode(
            file_get_contents("/home/anders/Code/stimpack/storage/stimpack/packs/default.json")
        ));

        $projectName = $this->args()[1]; // Does not feal clean. Assign stuff at parsing instead?

        $tasks->firstWhere('name', 'SetTargetProject')->projectName = $projectName;
        return;
        TaskController::make()->performAll($tasks)->each(function($taskFeedback) {
            $this->comment($taskFeedback["name"] . " " . $taskFeedback["status"]);
            collect($taskFeedback["messages"])->each(function($message) {
                $this->info($message);
            });
            $this->line("");                
        });
        $this->line("");
    }
    
    private function commandNotRecognizedHandler() {
        $this->error("\nStimpack could not parse parameters!");
        $this->info("\nPlease confirm you are using correct syntax:\n");
        $this->helpHandler();
        $this->info("");
    }    
}
