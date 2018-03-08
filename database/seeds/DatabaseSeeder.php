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
        // $this->call(UsersTableSeeder::class);
        collect(scandir(dirname(__FILE__)))->foreach(function($file) {
            if ($file == "." || $file == "..") {
                return;
            }
            
            $withoutExt = preg_replace('/\\.[^.\\s]{3,4}$/', '', $file);
            $this->call($withoutExt::call);
        });
    }
}
