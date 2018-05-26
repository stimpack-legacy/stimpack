<?php

namespace App\Console\Commands;

use App\Console\Commands\StimpackCommand;
use Illuminate\Console\Command;
use App\Pack;

class ListCommand extends StimpackCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stimpack:list';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'List available local packs';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->table(["Pack", "Description"],
            Pack::all()->map(function($pack) {
                return [$pack->name, $pack->description];
            })            
        );
    }    
}
