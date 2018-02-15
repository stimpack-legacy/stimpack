<?php

namespace App\Stimpack\Tasks;

use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;

class CreateModelsTask extends Task
{

    public function perform() {
        return "Not implemented";
        $message = "";
        foreach($this->tasks->CreateMigrationsTask->migrations as $migration) {
            $migrationName = date("Y_m_d_hms",time()) . "_create_" . $migration->table . "_table.php";            
            $path = $this->projectPath() . "/database/migrations/" . $migrationName;
            file_put_contents($path, $migration->body);                
            $message = $message . "Created migration at '" . $path . "'";
        }
        
        return $message;
    }
}