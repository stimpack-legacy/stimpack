<?php

namespace App\Stimpack;
use Illuminate\Support\Facades\Log;

class CreateMigrationsTask implements Task
{

    public function __construct($tasks) {
        $this->tasks = $tasks;
    }

    public function perform() {
        // this->tasks = object
        // Contains all the data
        // this->taks->CreateDatabaseTask

        //Log::info(gettype($this->tasks));
        //Log::info(gettype($this->tasks->CreateDatabaseTask));
        
        $dummy = $this->tasks->CreateDatabaseTask->type;

        

        return "Created " . $dummy . " database.";        
        $migrationName = date("Y_m_d_hms",time()) . "create_" . $model->table . "_table.php";        



        $path = database_path("migrations/" . $migrationName) ;        
        file_put_contents($path, $model->migration);
        $message = "Created migration at '" . $path . "'";
        return $message;                
        return "Migrations successfully created!";
    }
}

//$this->tasks[0]["id"]