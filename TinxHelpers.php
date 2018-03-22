<?php

function make($path) {
    $FILE = "\App\Stimpack\Manipulators\File";
    return $FILE::make($path);
}

function load($path) {
    $FILE = "\App\Stimpack\Manipulators\File";
    return $FILE::load($path);
}