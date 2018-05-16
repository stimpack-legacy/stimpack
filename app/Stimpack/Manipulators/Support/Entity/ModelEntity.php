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
        $file = File::save(
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
        $content = str_pair_replace(
            collect([
                "MODEL" => $this->title(),
                "FILLABLE" => $this->renderFillableAttributes(),
                "HIDDEN" => $this->renderHiddenAttributes()
            ]),
            File::init()->get(base_path("app/Stimpack/Manipulators/Support/stubs/model.stub"))
        );

        // The old way - regex :O
        // $content = File::addMethod($content, File::init()->get(base_path("app/Stimpack/Manipulators/Support/stubs/belongsToRelationship.stub")));
        
        
        $methods = $this->allRelationships()->map(function($relationship) {
            return File::init()->get(base_path("app/Stimpack/Manipulators/Support/stubs/belongsToRelationship.stub"));
        })->implode("\n\n");

        $content = $this->replaceOrDestroyLine("RELATIONSHIPS", $methods, $content);
        
        return $content;
    }

    private function makeMigrationFile()
    {
        $file = File::save(
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
        $content = str_pair_replace(
            collect([
                "CLASS_NAME" => $this->migrationClassName(),
                "TABLE_NAME" => $this->migrationTableName()
            ]),
            File::init()->get(base_path("app/Stimpack/Manipulators/Support/stubs/migration.stub"))
        );

        $content = str_block_replace(
            "COLUMNS",
            $this->migrationColumns(),
            $content
        );

        return $content;
    }

    private function renderFillableAttributes()
    {
        return $this->attributes()->filter(function($attribute) {
            return $attribute->isFillable();
        })->map(function($attribute) {
                return "'" . $attribute->name() . "'";
        })->implode(", ");
    }
    
    private function renderHiddenAttributes()
    {
        return $this->attributes()->filter(function($attribute) { 
            return $attribute->isHidden();
        })->map(function($attribute) {
            return "'" . $attribute->name() . "'";
        })->implode(", ");
    }    
}