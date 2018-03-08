<?php

namespace App\Stimpack\Tasks;
use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;

class CreateMigrationsTask extends Task
{
    public function perform() {        
        $message = "";

        // Delete old files        
        foreach(glob($this->projectPath() . "/database/migrations/*") as $oldFile){
          if(is_file($oldFile))
            unlink($oldFile);
        }        

        // Place new files
        foreach($this->files as $key=>$file) {        
            $fileName = str_pad(($key+1), 3, "0", STR_PAD_LEFT) . "_create_" . $file->table . "_table.php";            
            $fileName = (1000 + $key+1) . "____create_" . $file->table . "_table.php";            
            $path = $this->projectPath() . "/database/migrations/" . $fileName;
            file_put_contents($path, $file->body);                
            $message = $message . "Created migration at '" . $path . "'";
        }
        
        return $message;                
    }
}