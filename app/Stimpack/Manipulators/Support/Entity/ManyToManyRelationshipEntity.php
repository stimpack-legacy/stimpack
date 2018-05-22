<?php

namespace App\Stimpack\Manipulators\Support\Entity;

use App\Stimpack\Manipulators\Support\Entity\Entity;
use App\Stimpack\FilePreview;
use App\Stimpack\Contexts\File;

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
        $content = str_pair_replace(
            collect([
                "CLASS_NAME" => $this->migrationClassNameSingular(),
                "TABLE_NAME" => $this->migrationTableNameSingular()
            ]),
            File::init()->get(base_path("app/Stimpack/Manipulators/Support/stubs/migration.stub"))
        );

        $content = str_block_replace(
            "COLUMNS",
            $this->migrationColumns(),
            $content
        );

        return $content;        
    }
}