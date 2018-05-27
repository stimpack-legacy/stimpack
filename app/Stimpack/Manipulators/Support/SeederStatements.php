<?php

namespace App\Stimpack\Manipulators\Support;

class SeederStatements
{
    public function __construct($name)
    {
        $this->name = $name;
    }

    public static function make($name)
    {
        return (new SeederStatements($name))->get();
    }

    public function get()
    {
        return collect([
            $this->overridden($this->name), 
            $this->reserved($this->name),
            $this->ruled($this->name),
            $this->default($this->name)
        ])->first(function($nameCandidate) {
            return $nameCandidate;
        });
    }

    // here we can place certain names to override according to user history/preferences
    private function overridden($name)
    {
        // not implemented
    }

    // reserved are fields that are used by the laravel frameworks defaults
    private function reserved($name)
    {
        return collect([
            "id"=> "// ignoring id",
            "timestamps"=> '// ignoring timestamps',            
            'password' => $this->glue($name, "bcrypt('secret')"),                        
            'name' => $this->glue($name, '$faker->name'),
            'email' => $this->glue($name, '$faker->email'),            
            'password' => $this->glue($name, "bcrypt('secret')"),            
        ])->get($name);       
    }



    private function ruled($name)
    {
        $transformer = $this->rules()->first(function ($transformer, $rule) use($name) {
            return preg_match($rule, $name);
        });

        if($transformer)
        {
            return $transformer($name);
        }
        
    }

    private function rules()
    {       
        return collect([     
            // if attribute ends on _id its assumed to be a One to Many (one to one not supported atm)
            // improvement would be to also check if <MODEL>_id actually is a model (exluding current model)
            '/_id$/' => function($name) {                
                $tableName = snake_case(str_plural(
                    str_replace_last("_id", "", $name)
                ));
                return collect([
                    '$table->integer(' . "'" . $name . "')->unsigned();",
                    '$table->foreign(' . "'" . $name . "')->references('id')->on('" . $tableName . "')->onDelete('cascade');"
                ]);
                
            },
            /*                        
            // Time columns
            '/(time|date|_at)$/' => function($name) {
                return '$table->timestamp(' . "'" . $name . "');";
            },
            // Boolean
            '/^(has_|is_|got_)/' => function($name) {
                return '$table->boolean(' . "'" . $name . "')->default(false);";
            }
            */
        ]);                                
    }

    private function default($name)
    {
        return '"' . $name . '" => $faker->name,';
    }

    private function glue($key, $value)
    {
        return '"' . $key . '" => ' . $value . ',';
    }
}