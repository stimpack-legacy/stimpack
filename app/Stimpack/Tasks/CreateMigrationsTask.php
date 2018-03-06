<?php

namespace App\Stimpack\Tasks;
use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;

class CreateMigrationsTask extends Task
{
    public function perform() {        
        $message = "";
        foreach($this->files as $file) {        
            $fileName = date("Y_m_d_hms",time()) . "_create_" . $file->table . "_table.php";            
            $path = $this->projectPath() . "/database/migrations/" . $fileName;
            file_put_contents($path, $file->body);                
            $message = $message . "Created migration at '" . $path . "'";
        }
        
        return $message;                
    }
}