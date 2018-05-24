<?php

namespace App\Stimpack\Manipulators;
use App\Stimpack\Manipulator;
use App\Stimpack\Contexts\File;     

class SetEnv extends Manipulator
{
    public function perform() {

        File::save($this->path('.env'), $this->data->content);
        
        return [
            "messages" => [
                "Env set.",
            ]
        ];
    }

    public static function attachStartupData()
    {
        return collect([
            "env" => File::init()->get(base_path('app/Stimpack/Manipulators/Support/stubs/env.stub'))
        ]);
    }    
}