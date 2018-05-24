<?php

namespace App\Stimpack;

class GlobalPack
{
    public function __construct($name, $content)
    {
        $this->name = $name;
        $this->content = $content;        
    }
}