<?php

namespace App\Stimpack\Manipulators\Support\Entity;

use App\Stimpack\Manipulators\Support\Entity\Entity;
use App\Stimpack\Contexts\File;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;
use App\Stimpack\FilePreview;

class ModelEntity extends Entity
{
    public function preview() {
        return collect([
            new FilePreview($this->modelFilePath(), $this->modelFileContent()),
            new FilePreview($this->migrationFilePath(), $this->migrationFileContent()),
            new FilePreview($this->controllerFilePath(), $this->controllerFileContent()),            
            // OUCH! this feel apart, did not make it on time.
            //new FilePreview($this->seederFilePath(), $this->seederFileContent())
        ]);
    }    

    private function controllerFilePath()
    {
        return path($this->directives->targetProjectPath, "app/Http/Controllers/" . $this->title . "Controller.php");
    }

    private function controllerFileContent()
    {
        $content = str_pair_replace(
            collect([
                "MODEL" => $this->title(),
                "CONTROLLER" => $this->title() . "Controller",
                "CLASS" => $this->title(),
                "INSTANCE" => camel_case($this->title())
            ]),
            $this->directives->stubs->controller
        );

        return $content;
    }
    
    private function modelFilePath()
    {
        return path($this->directives->targetProjectPath, "app/" . $this->title . ".php");
    }    

    private function modelFileContent()
    {
        $content = str_pair_replace(
            collect([
                "MODEL" => $this->title(),
                "FILLABLE" => $this->renderFillableAttributes(),
                "HIDDEN" => $this->renderHiddenAttributes()
            ]),
            $this->directives->stubs->model
        );

        $content = $this->replaceOrDestroyLine("RELATIONSHIPS", $this->methodsString(), $content);

        return $content;
    }

    private function methodsString()
    {
        $methods = $this->allRelationships()->filter(function($relationship) {
            return $relationship->concerns($this); 
        })->map(function($relationship) {            
            return $relationship->renderMethod($this);
        });
        if($methods->isNotEmpty()) {
            return "\n" . $methods->implode("\n\n");
        }

        return "";
    }
   
    private function seederFilePath()
    {
        return path($this->directives->targetProjectPath, "database/seeds/" . $this->seederFileName());
    }

    private function seederFileContent()
    {
        $content = str_pair_replace(
            collect([
                "CLASS_NAME" => $this->seederClassName(),
                "TABLE" => $this->pluralSnakeCaseTitle()
            ]),
            File::init()->get(base_path("app/Stimpack/Manipulators/Support/stubs/seeder.stub"))
        );

        
        $content = str_block_replace(
            "SEEDER_STATEMENTS",
            $this->seederColumns(),
            $content
        );

        return $content;        
    }
    
    private function seederFileName()
    {
        return $this->title() . "Seeder.php";        
    }    

    private function seederClassName()
    {
        return $this->title() . "Seeder";        
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