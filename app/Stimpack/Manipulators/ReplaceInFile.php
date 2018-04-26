<?php

namespace App\Stimpack\Manipulators;
use App\Stimpack\Manipulator;
use App\Stimpack\Contexts\File;

class ReplaceInFile extends Manipulator
{
    public function perform() {

        $file = File::load($this->filePath())
            ->replace($this->data->oldString, $this->data->newString)
            ->save();

        return [
            "messages" => [
                "Found " . $this->filePath() . ".",
                $file->report . " matches replaced."
            ]
        ];
    }

    private function filePath()
    {
        return env('STIMPACK_CODE_PATH') . 
            "/" . 
            $this->data->context->path .
            "/" .
            $this->data->path;
    }
}