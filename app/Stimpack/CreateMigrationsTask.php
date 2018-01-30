<?php

namespace App\Stimpack;
use Illuminate\Support\Facades\Log;

class CreateMigrationsTask implements Task
{

    public function __construct($tasks) {
        $this->tasks = $tasks;
    }

    public function perform() {
        $message = "";
        each($this->tasks->CreateDatabaseTask->migrations, function ($migration) {
            $migrationName = date("Y_m_d_hms",time()) . "create_" . $migration->table . "_table.php";
            $path = database_path("migrations/" . $migrationName);
            file_put_contents($path, $model->migration->body);                
            $message .= "Created migration at '" . $path . "'";
        });

        return $message;                
    }
}
