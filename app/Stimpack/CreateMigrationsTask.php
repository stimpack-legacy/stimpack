<?php

namespace App\Stimpack;
use Illuminate\Support\Facades\Log;

class CreateMigrationsTask extends Task
{
    public function perform() {
        $message = "";
        Log::info(json_encode($this->migrations));
        foreach($this->migrations as $migration) {        
            $migrationName = date("Y_m_d_hms",time()) . "_create_" . $migration->table . "_table.php";            
            $path = $this->projectPath() . "/database/migrations/" . $migrationName;
            file_put_contents($path, $migration->body);                
            $message = $message . "Created migration at '" . $path . "'";
        }
        
        return $message;                
    }
}