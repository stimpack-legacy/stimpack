<?php

namespace App\Console\Commands;

use App\Console\Commands\StimpackCommand;
use Illuminate\Console\Command;
use App\Console\Controllers\ManipulatorController;
use App\Http\Controllers\GuiController;
use Config;


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
        set_env_value("STIMPACK_CODE_PATH", $this->parkAt);
        $this->createSymlinkToCode();
        $this->setupDatabase();
        $this->info("Successfully parked at " . $this->parkAt);
    }

    public function setupDatabase()
    {
        $dbPath = base_path('storage/stimpack/stimpack.sqlite');
        set_env_value("DB_DATABASE", base_path('storage/stimpack/stimpack.sqlite'));

        if(!file_exists($dbPath)) {
            touch($dbPath);
            $this->info("Created a new database at " . $dbPath);
            
            Config::set("database.connections.stimpack", [
                "driver" => "sqlite",
                "database" => $dbPath
            ]);
            
            $this->call('migrate', [
                '--database' => 'stimpack',
                '--force' => true
            ]);

            $this->info("Migrated database");
        }
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
