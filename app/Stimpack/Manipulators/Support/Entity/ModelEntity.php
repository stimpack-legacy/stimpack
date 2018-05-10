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
            //$this->makeControllerFile()
        ]);
    }

    private function makeModelFile()
    {
        $fileSystem = new Filesystem();
        $file = path($this->directives->targetProjectPath, "app/Models/" . $this->segment->title() . ".php");
        
        if(!$fileSystem->isDirectory($fileSystem->dirname($file))){
            $fileSystem->makeDirectory($fileSystem->dirname($file));
        }

        $fileSystem->put($file, "HÄR SKA MODEL TEMPLATEN LIGGA!");

        return "Created :" . $file;
    }

    private function makeMigrationFile()
    {
        return path($this->directives->targetProjectPath, "database/migrations/create_" . $this->segment->title() . "_table.php");    
    }
    
    private function makeControllerFile()
    {
        return path($this->directives->targetProjectPath, "app/Http/Controllers/" . $this->segment->title() . "Controller.php");
    }
}