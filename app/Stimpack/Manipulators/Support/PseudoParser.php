<?php

namespace App\Stimpack\Manipulators\Support;
use App\Stimpack\Manipulators\Support\PseudoSegment;

class PseudoParser
{
    public static function make()
    {
        return new PseudoParser();
    }

    public static function parse($text)
    {
        $parser = PseudoParser::make();
        return $parser->segment(
            $parser->cleanUp($text)
        );        
    }

    public function cleanUp($text)
    {
        
        // trim preciding newlines/space
        $text = preg_replace('/^\s+/', '', $text);
        // trim trailing newlines/space
        $text = preg_replace('/\s+$/', '', $text);
        // For each line, remove preciding space
        $text = preg_replace('/^[^\S\n]+/m', '', $text);
        // For each line, remove trailing space
        $text = preg_replace('/[^\S\n]+$/m', '', $text);        
        // remove exessive newlines
        $text = preg_replace('/\n{3,}/', '\n\n', $text);
        // remove comments
        $text = preg_replace('/^\/\/.*$/m', '', $text);
        $text = preg_replace('/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/m', '', $text);        
        return $text;        
        
    }

    private function segment($text)
    {
        return collect(preg_split('/\n\s*\n/', $text))->filter(function($item) {
            return $item != "";
        })->map(function($segment) {
            return new PseudoSegment(
                collect(preg_split('/\n/', $segment))
            );
        });
    }
}