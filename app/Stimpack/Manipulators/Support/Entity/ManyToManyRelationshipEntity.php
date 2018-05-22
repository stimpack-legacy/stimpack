<?php

namespace App\Stimpack\Manipulators\Support\Entity;

use App\Stimpack\Manipulators\Support\Entity\Entity;
use App\Stimpack\FilePreview;

class ManyToManyRelationshipEntity extends Entity
{
    public function install() {
        return collect([
            //$this->migrationFile()
        ]);
    }

    public function preview() {
        return collect([
            new FilePreview($this->migrationFilePath(), $this->migrationFileContent())
        ]);
    }
    
    public function migrationFilePath()
    {
        return path(
            $this->directives->targetProjectPath,
            "database/migrations/" . date('Y_m_d_His') . "_create_" . $this->title() . "_table.php"
        );
    }

    public function migrationFileContent()
    {
        return "Not implemented! We need to extract <model1> and <model2> to create the foreign keys...";
    }
}