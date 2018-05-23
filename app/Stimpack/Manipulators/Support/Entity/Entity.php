<?php

namespace App\Stimpack\Manipulators\Support\Entity;
use App\Stimpack\Contexts\File;
use App\Stimpack\Manipulators\Support\Attribute;
use Illuminate\Support\Str;

class Entity
{
    public function __construct($segment)
    {
        $this->segment = $segment;
        $this->title = $segment->title();
        //$this->pseudoAttributes = $this->segment->pseudoAttributes();/*
        $this->pseudoAttributes = $this->segment->pseudoAttributes()->concat(
            collect([
                'id',
                'created_at',
                'updated_at'
            ])->filter(function($name) {
                return !$this->segment->pseudoAttributes()->contains($name);
            })
        );        
    }

    public static function make($segment)
    {
        return new Entity($segment);
    }

    public function title()
    {
        return $this->title;
    }

    public function pseudoAttributes()
    {
        return $this->pseudoAttributes;
    }
    
    public function attributes()
    {
        return $this->attributes;
    }    

    public function allRelationships()
    {
        return $this->allRelationships;
    }

    public function migrationColumns()
    {
        return $this->attributes->map(function($attribute) {
            return $attribute->migrationStatements();
        })->flatten()->implode("\n");
    }

    // SHOULD BE MOVED TO FILE!
    public function replaceOrDestroyLine($marker, $replacements, $content)
    {
        $pattern = '/(^[^\S\n]*)' . $marker . '\n/m';
        if($replacements == "") {            
            return preg_replace($pattern, "", $content);    
        }
        
        return str_block_replace($marker, $replacements, $content);
    }

    /* TITLE FORMATTING ************************************************* */

    public function classCase($string = false)
    {
        if(!$string) {
            return $this->title();
        }
        return studly_case($string);
    }

    public function tableSingularCase($string = false)
    {
        if(!$string) {
            return snake_case($this->title());
        }
        return snake_case($string);
        
    }
    
    public function methodSingularCase($string = false)
    {
        if(!$string) {        
            return camel_case($this->title());
        }
        return camel_case($string);
    }
    
    public function methodPluralCase($string = false)
    {
        if(!$string) {        
            return str_plural(camel_case($this->title()));
        }
        return str_plural(camel_case($string));
    }

    public function pluralStudlyCaseTitle($string = false)
    {
        if(!$string) {
            return studly_case(Str::plural(class_basename($this->title())));
        }
        return studly_case(Str::plural(class_basename($string)));
    }

    public function studlyCaseTitle($string = false)
    {
        if(!$string) {
            return studly_case(class_basename($this->title()));
        }
        return studly_case(class_basename($string));
    }

    public function pluralSnakeCaseTitle($string = false)
    {
        if(!$string) {        
            return Str::plural(Str::snake(class_basename($this->title())));
        }
        return Str::plural(Str::snake(class_basename($string)));
    }
    
    public function SnakeCaseTitle($string = false)
    {
        if(!$string) {        
            return Str::snake(class_basename($this->title()));
        }
        return Str::snake(class_basename($string));
    }
    
    
    /* END TITLE FORMATTING ************************************************* */

    protected function migrationFilePath()
    {
        return path($this->directives->targetProjectPath, "database/migrations/" . $this->migrationFileName());
    }

    protected function migrationFileName()
    {
        return date('Y_m_d_His') . "_create_" . $this->pluralSnakeCaseTitle() . "_table.php";        
    }

    protected function migrationClassName()
    {        
        return "Create" . $this->pluralStudlyCaseTitle() . "Table.php";        
    }
    
    protected function migrationClassNameSingular()
    {        
        return "Create" . $this->studlyCaseTitle() . "Table.php";        
    }
    
    protected function migrationTableName()
    {
        return $this->pluralSnakeCaseTitle();
    }

    protected function migrationTableNameSingular()
    {
        return $this->SnakeCaseTitle();
    }

    


    protected function migrationFileContent()
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
}