<?php

namespace App\Stimpack\Manipulators;
use App\Stimpack\Manipulator;

class CreateDatabase extends Manipulator
{
    public function perform() {
        //DB::getConnection()->statement('CREATE DATABASE :schema', ['schema' => $this->argument('name')]);

        return [
            "messages" => [
                "Created a database",
            ]
        ];
    }
}