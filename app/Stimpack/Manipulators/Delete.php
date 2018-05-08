<?php

namespace App\Stimpack\Manipulators;
use App\Stimpack\Manipulator;
use App\Stimpack\Contexts\ContextFactory;

class Delete extends Manipulator
{
    public function perform() {

        $context = ContextFactory::make(
            $this->path($this->data->relativePathToDelete)
        )->delete();

        return [
            "messages" => [
                "Deleted " . $context->path()
            ]
        ];
    }
}