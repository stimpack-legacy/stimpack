<?php

namespace App\Stimpack;

class FilePreview
{
    public function __construct($path, $content)
    {
        $this->path = $path;
        $this->content = $content;        
    }
}