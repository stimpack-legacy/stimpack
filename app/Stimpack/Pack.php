<?php

namespace App\Stimpack;

class Pack
{
    public function __construct($name, $content)
    {
        $this->name = $name;
        $this->content = $content;        
    }
}