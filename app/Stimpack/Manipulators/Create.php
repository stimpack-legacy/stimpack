<?php

namespace App\Stimpack\Manipulators;
use Illuminate\Support\Facades\Log;
use App\Stimpack\Manipulator;
use App\Stimpack\Templates;
use ZipArchive;

class Create extends Manipulator
{
    public function perform() {
        $zip = new ZipArchive;
        $res = $zip->open(storage_path("stimpack/laravel.zip"));
        $targetProjectPath = $this->targetProjectPath();
        
        if ($res === TRUE) {
            $zip->extractTo($targetProjectPath);
            $zip->close();
        } else {
            return "Throw error here!";
        }

        return [
            "messages" => [
                "Created application at $targetProjectPath",
                "Check it out at http://" . $this->data->targetProjectName . ".test"                
            ]
        ];
    }
}