<?php

namespace App\Stimpack\Manipulators\Support\Entity;

use App\Stimpack\Manipulators\Support\Entity\Entity;
use App\Stimpack\FilePreview;

class PureTableEntity extends Entity
{
    public function install() {
        return collect([
            $this->migrationFile()
        ]);
    }

    public function preview() {
        return collect([
            new FilePreview($this->migrationFilePath(), $this->migrationFileContent())
        ]);
    }
}