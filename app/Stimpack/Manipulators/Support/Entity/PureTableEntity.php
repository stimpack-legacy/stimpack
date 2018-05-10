<?php

namespace App\Stimpack\Manipulators\Support\Entity;

use App\Stimpack\Manipulators\Support\Entity\Entity;

class PureTableEntity extends Entity
{
    public function files()
    {
        return collect([
            base_path("database/migrations/pure_tables/" . $this->segment->title() . ".php")
        ]);
    }
}