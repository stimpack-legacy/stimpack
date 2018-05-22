<?php

namespace App\Stimpack;

class FilePreview
{
    public function __construct($path, $content)
    {
        $this->path = $path;
        $this->content = $content;        
    }

    public static function sortByPath($a, $b) {
        if($a->path == $b->path){ return 0 ; }
        return ($a->path < $b->path) ? -1 : 1;
    }
}