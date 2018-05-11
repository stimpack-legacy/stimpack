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
            $this->makeMigrationFile(),
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

    private function modelFilePath()
    {
        return path($this->directives->targetProjectPath, "app/Models/" . $this->title . ".php");
    }

    private function modelFileContent()
    {
        return $this->fillStub(
            base_path("app/Stimpack/Manipulators/Support/stubs/model.stub"),
            collect([
                "MODEL" => $this->title(),
                "MASS_ASSIGNABLE_ATTRIBUTES" => "// none at this point."
            ])
        );
    }

    private function makeMigrationFile()
    {
        $file = File::init()->put(
            $this->migrationFilePath(),
            $this->migrationFileContent()
        );       

        return "app/Models/" . $this->title . ".php";
    }

    private function migrationFilePath()
    {
        return path($this->directives->targetProjectPath, "database/migrations/" . $this->title . ".php");
    }    

    private function migrationFileContent()
    {
        return $this->fillStub(
            base_path("app/Stimpack/Manipulators/Support/stubs/migration.stub"),
            collect([
                "MODEL" => $this->title(),
                "TABLE_NAME" => "DUMMY",
                "ATTRIBUTES" => "ATTRIBUTES"
            ])
        );
    }


    
}