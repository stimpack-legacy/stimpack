<?php

namespace App\Stimpack\Manipulators\Support\Entity;

use App\Stimpack\Manipulators\Support\Entity\Entity;
use App\Stimpack\Contexts\File;
use Illuminate\Filesystem\Filesystem;

class ModelEntity extends Entity
{
    public function install() {
        return collect([
            $this->makeModelFile(),
            //$this->makeMigrationFile(),
            //$this->makeControllerFile(),
            //$this->injectRoutes()
        ]);
    }

    private function makeModelFile()
    {
        $file = File::init()->put(
            $this->modelFilePath(),
            $this->modelFileContent()
        );       

        return "app/Models/" . $this->title . ".php";
    }

    private function makeMigrationFile()
    {
        return path($this->directives->targetProjectPath, "database/migrations/create_" . $this->segment->title() . "_table.php");    
    }
    
    private function makeControllerFile()
    {
        return path($this->directives->targetProjectPath, "app/Http/Controllers/" . $this->segment->title() . "Controller.php");
    }

    private function modelFilePath()
    {
        return path($this->directives->targetProjectPath, "app/Models/" . $this->title . ".php");
    }

    private function modelFileContent()
    {
        return "Some content";
    }    
}