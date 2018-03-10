<?php

namespace App\Stimpack\Tasks;

use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;
use Config;
use Artisan;
use Illuminate\Support\Composer;

class MigrateTask extends Task
{

    public function perform() {
        Config::set("database.connections." . $this->projectName(), [
            "driver" => "sqlite",
            "database" => "/home/anders/Code/" . $this->projectName() . "/storage/database.sqlite"
        ]);

        return $this->migrate() . " " . $this->seed();
    }

    private function migrate() {
        try {
            $migrate = Artisan::call('migrate', [
                '--path' => "../" . $this->projectName() . "/database/migrations",
                '--database' => $this->projectName()
            ]);
        } catch (\Exception $e) {
            return "Crap. something blew up during migration!";
        }

        return "migrated successfully!";
    }

    private function seed() {
        $this->copyDirectory(
            $this->projectPath() . "/database/seeds",
            base_path() . "/database/seeds"
        );

        chdir(base_path());
        exec('composer dump-autoload');
        chdir(base_path() . "/public");

        
        try {
            $seed = Artisan::call('db:seed', [                
                '--database' => $this->projectName()
            ]);
        } catch (\Exception $e) {
            return "Crap. something blew up during seed!";
        }

        if($seed == 0) {
            return "Seeded successfully";
        }
    }

    private function copyDirectory($src,$dst) { 
        $dir = opendir($src); 
        @mkdir($dst); 
        while(false !== ( $file = readdir($dir)) ) { 
            if (( $file != '.' ) && ( $file != '..' )) { 
                if ( is_dir($src . '/' . $file) ) { 
                    $this->copyDirectory($src . '/' . $file,$dst . '/' . $file); 
                } 
                else { 
                    copy($src . '/' . $file,$dst . '/' . $file); 
                } 
            } 
        } 
        closedir($dir); 
    }     
}