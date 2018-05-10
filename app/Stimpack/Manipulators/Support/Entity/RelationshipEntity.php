<?php

namespace App\Stimpack\Manipulators\Support\Entity;

use App\Stimpack\Manipulators\Support\Entity\Entity;

class RelationshipEntity extends Entity
{
    public function files()
    {
        return collect([
            base_path("database/migrations/relationship_" . $this->segment->title() . ".php")
        ]);
    }
}