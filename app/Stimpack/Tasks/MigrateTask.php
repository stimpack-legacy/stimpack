<?php

namespace App\Stimpack\Tasks;

use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;
use Config;
use Artisan;

class MigrateTask extends Task
{

    public function perform() {
        Config::set("database.connections." . $this->projectName(), [
            "driver" => "sqlite",
            "database" => "/home/anders/Code/" . $this->projectName() . "/storage/database.sqlite"
        ]);
    
        try {
            $migrate = Artisan::call('migrate', [
                '--path' => "../" . $this->projectName() . "/database/migrations",
                '--database' => $this->projectName()
            ]);
        } catch (\Exception $e) {
            return "Crap. something blew up!";
        }

        if($migrate == 0) {
            return "Migrated successfully";
        }

        return $migrate;
    }
}