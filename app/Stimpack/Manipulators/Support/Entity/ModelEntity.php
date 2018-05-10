<?php

namespace App\Stimpack\Manipulators\Support\Entity;

use App\Stimpack\Manipulators\Support\Entity\Entity;

class ModelEntity extends Entity
{
    public function files()
    {
        return collect([
            $this->migrationFile(),
            $this->modelFile(),
            $this->controllerFile()
        ]);
    }

    private function migrationFile()
    {
        return base_path("database/migrations/" . $this->segment->title() . ".php");    
    }

    private function modelFile()
    {
        return base_path("app/Models/" . $this->segment->title() . ".php");
    }
    
    private function controllerFile()
    {
        return base_path("app/Http/Controllers/" . $this->segment->title() . ".php");
    }
    

}