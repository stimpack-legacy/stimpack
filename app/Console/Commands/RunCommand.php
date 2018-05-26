<?php

namespace App\Console\Commands;

use App\Console\Commands\StimpackCommand;
use Illuminate\Console\Command;
use App\Console\Controllers\ManipulatorController;
use App\Http\Controllers\GuiController;
use App\Pack;


class RunCommand extends StimpackCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stimpack:run {pack} {parameters?*}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run a pack';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info("Running pack " . $this->argument('pack') . "!\n");
        $parameters = collect($this->args())->reduce(function($parametersObject, $arg) {
            $keyValuePair = collect(explode("=", $arg));
            if(count($keyValuePair) != 2) {
                $this->error("Bad parameter formatting!");        
                exit();
            }
            $key = $keyValuePair[0];
            $value = $keyValuePair[1];
            $parametersObject->$key = $value;
            return $parametersObject;
        }, make_object());

        $compiledManipulators = collect(
            json_decode(Pack::where('name', $this->argument('pack'))->first()->content)->compiled
        );
        

        $compiledManipulators->each(function($manipulator) use($parameters) {
            $this->info($manipulator->name);
            collect(
                ManipulatorController::make()->perform($manipulator, $parameters)["messages"]
            )->each(function ($message) {
                $this->comment(" - " .$message);
            });
            $this->line("");    
        });        
    }    
}

