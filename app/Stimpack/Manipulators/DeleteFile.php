<?php

namespace App\Stimpack\Manipulators;
use App\Stimpack\Manipulator;
use App\Stimpack\Contexts\File;

class DeleteFile extends Manipulator
{
    public function perform() {

        $file = File::load($this->filePath())->delete();

        return [
            "messages" => [
                "Deleted " . $this->filePath()
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