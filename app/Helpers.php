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