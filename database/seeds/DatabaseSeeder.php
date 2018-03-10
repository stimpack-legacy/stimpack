<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {        
        $this->runAll();
    }

    /**
     * Run all of the database seeds.
     *
     * @return void
     */
    public function runAll()
    {        
        collect(scandir(dirname(__FILE__)))->filter(function($file) {
            return !collect([".", "..", basename(__FILE__)])->contains($file); 
        })->each(function($file) {
            $this->call(basename($file, ".php"));
        });
    }
}