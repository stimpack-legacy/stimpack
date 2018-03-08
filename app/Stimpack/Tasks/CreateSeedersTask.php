<?php

namespace App\Stimpack\Tasks;

use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;

class CreateSeedersTask extends Task
{

    //seeds.replace("}\n}","    $this->call(HeroSeeder::class);\n    }\n}")
    public function perform() {
        $message = "";
        foreach($this->files as $file) {        
            $fileName = $file->name . "Seeder.php";            
            $path = $this->projectPath() . "/database/seeds/" . $fileName;
            file_put_contents($path, $file->body);                
            $message = $message . "Created seed at ";
            $message = $message . $path . "\n";
        }
        
        return $message;         
    }
}