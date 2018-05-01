<?php

$o = json_decode('{"name":"Create", "context": {"path": "some/path/to/code"}}');
//$o = json_decode('{"context": {"path": "some/path/to/code"}}');

class Manipulator
{
    public function __construct($data, $globalParameters = 0)
    {
        $this->globalParameters = $globalParameters;
        $this->data = $this->injectGlobalParameters($data);        
    }

    public function injectGlobalParameters($data) {

        $object = collect((array) $data)->map(function($value, $key) {
            if(is_object($value)) {
                return $this->injectGlobalParameters($value);
            }

            if(is_string($value)) {
                return "STRING MIGHT BE REPLACED!";
            } 

            return $value;
        });

        return (object) $object->toArray();
    }
}