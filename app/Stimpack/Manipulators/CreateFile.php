<?php

namespace App\Stimpack\Manipulators;
use App\Stimpack\Manipulator;
use App\Stimpack\Contexts\File;

class CreateFile extends Manipulator
{
    public function perform() {

        $file = File::loadOrCreate($this->filePath())
            ->content($this->data->content)
            ->save();

        return [
            "messages" => [
                "Created " . $this->filePath()
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