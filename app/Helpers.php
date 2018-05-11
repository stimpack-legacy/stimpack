<?php

if (! function_exists('path')) {
    /**
     * Get the path to the base of the install.
     *
     * @param  string  $path
     * @return string
     */
    function path($targetDirectory, $subPath = '')
    {
        return $targetDirectory.($subPath ? DIRECTORY_SEPARATOR.$subPath : $subPath);
    }
}

if (! function_exists('str_block_replace')) {
    function str_block_replace($marker, $block, $target) 
    {
        $pattern = '/(^[^\S\n]+)' . $marker . '\n/m';
        while(preg_match($pattern, $target, $matches)) {
            $matchedLine = $matches[0];
            $indentation = $matches[1];
            $indentedBlock = collect(explode("\n", $block))->map(function($line) use($indentation) {
                return $indentation . $line . "\n";
            })->implode("");

            $target = str_replace($matchedLine, $indentedBlock, $target);
        }

        return $target;        
    }
}

if (! function_exists('str_pair_replace')) {
    function str_pair_replace($replacementPairs, $target)
    {
        return $replacementPairs->map(function($value, $key) {
            return collect([$key => $value]);
        })->reduce(function($content, $pair) {
            return str_replace($pair->keys()->first(), $pair->values()->first(), $content);
        }, $target);
    }
}

/*

function sample_block() {
    return 
"kniv
yxa
såg";
}

function sample_target() {
    return 
"lista = [
    VERKTYG
]";
}