<?php

namespace App\Stimpack\Manipulators\Support\Entity;

use App\Stimpack\Manipulators\Support\Entity\Entity;
use App\Stimpack\Contexts\File;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;

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

        return "http://stimpack-dev.test/preview/file/at/" . $this->modelFilePath();
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
                "MASS_ASSIGNABLE_ATTRIBUTES" => "       // none at this point.",
                "HIDDEN_ATTRIBUTES" => "        // none at this point"
            ])
        );
    }

    private function makeMigrationFile()
    {
        $file = File::init()->put(
            $this->migrationFilePath(),
            $this->migrationFileContent()
        );       

        return "http://stimpack-dev.test/preview/file/at/" . $this->migrationFilePath();
    }

    private function migrationFilePath()
    {
        return path($this->directives->targetProjectPath, "database/migrations/" . $this->migrationFileName());
    }
    
    private function migrationFileName()
    {
        return date('Y_m_d_His') . "_create_" . $this->pluralSnakeCaseTitle() . "_table.php";        
    }

    private function migrationClassName()
    {        
        return "Create" . $this->pluralStudlyCaseTitle() . "Table.php";        
    }
    
    private function migrationTableName()
    {
        return $this->pluralSnakeCaseTitle();
    }

    private function migrationFileContent()
    {
        return $this->fillStub(
            base_path("app/Stimpack/Manipulators/Support/stubs/migration.stub"),
            collect([
                "CLASS_NAME" => $this->migrationClassName(),
                "TABLE_NAME" => $this->migrationTableName(),
                "ATTRIBUTES" => "ATTRIBUTES"
            ])
        );
    }


    
}