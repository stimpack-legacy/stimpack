<?php

namespace App\Stimpack\Manipulators\Support\Entity;

use App\Stimpack\Manipulators\Support\Entity\Entity;

class PureTableEntity extends Entity
{
    public function install() {
        return collect([
            $this->migrationFile()
        ]);
    }

    public function migrationFile()
    {
        return base_path("database/migrations/pure_table_" . $this->segment->title() . ".php");
    }
}