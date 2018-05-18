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
        $pattern = '/(^[^\S\n]*)' . $marker . '/m';
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

if (! function_exists('is_regexp')) {
    function is_regexp($candidate) {
        $regex = "/^\/[\s\S]+\/[sm]*$/";
        return preg_match($regex, $candidate);
    }
}

if (! function_exists('str_pair_replace')) {
    function str_pair_replace($replacementPairs, $target)
    {
        return $replacementPairs->map(function($value, $key) {
            return collect([$key => $value]);
        })->reduce(function($content, $pair) {
            if(is_regexp($pair->keys()->first())) {
                return preg_replace(
                    $pair->keys()->first(),
                    $pair->values()->first(),
                    $content
                );
            }
            return str_replace(
                $pair->keys()->first(),
                $pair->values()->first(),
                $content
            );

        }, $target);
    }
}

define("INDENTATION", "    ");


function classes_in_path($path)
{
    $path = base_path($path);
    $fqcns = array();
    
    $allFiles = new IteratorIterator(new DirectoryIterator($path));
    $phpFiles = new RegexIterator($allFiles, '/\.php$/');
    foreach ($phpFiles as $phpFile) {
        $content = file_get_contents($phpFile->getRealPath());
        $tokens = token_get_all($content);
        $namespace = '';
        for ($index = 0; isset($tokens[$index]); $index++) {
            if (!isset($tokens[$index][0])) {
                continue;
            }
            if (T_NAMESPACE === $tokens[$index][0]) {
                $index += 2; // Skip namespace keyword and whitespace
                while (isset($tokens[$index]) && is_array($tokens[$index])) {
                    $namespace .= $tokens[$index++][1];
                }
            }
            if (T_CLASS === $tokens[$index][0]) {
                $index += 2; // Skip class keyword and whitespace
                $fqcns[] = $namespace.'\\'.$tokens[$index][1];
    
                # break if you have one class per file (psr-4 compliant)
                # otherwise you'll need to handle class constants (Foo::class)
                break;
            }
        }
    }
    return collect($fqcns);
}

define('T123', "Hola again33!");