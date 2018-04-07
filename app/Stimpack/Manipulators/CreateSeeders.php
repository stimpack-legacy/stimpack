<?php

namespace App\Stimpack\Tasks;

use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;

class CreateSeeders extends Task
{    
    public function perform() {
        $message = "";
        foreach($this->files as $file) {        
            $fileName = $file->name . "Seeder.php";            
            $path = $this->projectPath() . "/database/seeds/" . $fileName;
            file_put_contents($path, $file->body);                
            $message = $message . "Created seed at ";
            $message = $message . $path . "\n";
        }

        copy(
            app_path() . "/Stimpack/Templates/DatabaseSeeder.php",
            $this->projectPath() . "/database/seeds/DatabaseSeeder.php"
        );

        chdir($this->projectPath());
        exec('composer dump-autoload');
        
        return $message;         
    }
}