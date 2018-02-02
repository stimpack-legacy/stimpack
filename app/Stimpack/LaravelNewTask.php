<?php

namespace App\Stimpack;
use Illuminate\Support\Facades\Log;

class LaravelNewTask implements Task
{

    public function __construct($tasks) {
        $this->tasks = $tasks;
    }

    public function perform() {                
        exec("composer create-project --prefer-dist laravel/laravel " . $this->tasks->LaravelNewTask->projectName ." 2>&1 && mv /home/anders/Code/stimpack/public/" . $this->tasks->LaravelNewTask->projectName . " /home/anders/Code/" . $this->tasks->LaravelNewTask->projectName . " 2>&1", $outputAndErrors, $return_value);
    
        // Replace app key in .env manually - something is not working with Laravels key:generate
        $envPath = $this->tasks->LaravelNewTask->path . "/" . $this->tasks->LaravelNewTask->projectName . "/.env";
        file_put_contents($envPath, preg_replace(
            "/^APP_KEY=/m",
            'APP_KEY='."base64:HXvkwnSP3c9bclgmH17cbGsNVswvjbeFpywXSCs5Mpk=",
            file_get_contents($envPath)
        ));


        return $outputAndErrors;
    }
}
