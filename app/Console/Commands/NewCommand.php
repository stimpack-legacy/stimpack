<?php

namespace App\Console\Commands;

use App\Console\Commands\StimpackCommand;
use Illuminate\Console\Command;
use App\Console\Controllers\ManipulatorController;
use App\Http\Controllers\GuiController;
use App\LocalPack;


class NewCommand extends StimpackCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stimpack:new {target} {from} {pack}';

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
        $parameters = make_object();
        $parameters->target = $this->argument('target');

        $compiledManipulators = collect(
            json_decode(LocalPack::where('name', $this->argument('pack'))->first()->content)->compiled
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

