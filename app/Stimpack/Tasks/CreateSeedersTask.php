<?php

namespace App\Stimpack\Tasks;

use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;

class CreateSeedersTask extends Task
{    
    public function perform() {
        $message = "";
        foreach($this->files as $file) {        
            $fileName = $file->name . "Seeder.php";            
            $path = $this->projectPath() . "/database/seeds/" . $fileName;
            file_put_contents($path, $file->body);                
            $message = $message . "Created seed at ";
            $message = $message . $path . "\n";
        
            //$str=file_get_contents($this->projectPath() . "/database/seeds/DatabaseSeeder.php");
            //$str=str_replace("}\n}", '    $this->call(' . $file->name . '::class);\n    }\n}"',$str);
            //file_put_contents($this->projectPath() . "/database/seeds/DatabaseSeeder.php", $str);
        
        }
        
        return $message;         
    }
}