<?php

namespace App\Console\Commands;

use App\Console\Commands\StimpackCommand;
use Illuminate\Console\Command;
use App\Console\Controllers\ManipulatorController;
use App\Http\Controllers\GuiController;
use App\Pack;


class NewCommand extends StimpackCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stimpack:new {target} {from?} {pack?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new site';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $parameters = make_object();
        $parameters->target = $this->argument('target');

        $compiledManipulators = collect(
            json_decode($this->packToRun()->content)->compiled
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
    
    public function packToRun()
    {
        if($this->assumesDefaultPack()) {
            return $this->defaultPack();
        }
        
        return Pack::where('name', $this->argument('pack'))->first();
    }

    public function assumesDefaultPack() {
        return (!$this->argument('from')) && (!$this->argument('pack'));
    }

    public function defaultPack()
    {
        return Pack::where("name", "default")->firstOrFail();
    }
}

