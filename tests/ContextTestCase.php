<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use ZipArchive;

abstract class ContextTestCase extends BaseTestCase
{
    use CreatesApplication;

    protected function setUp()
    {
        parent::setUp();
        $this->tearDown();

        $zip = new ZipArchive;
        $res = $zip->open(storage_path("stimpack/sample-app-without-vendors.zip"));
        if ($res === TRUE) {
            $zip->extractTo($this->sample_app_path());
            $zip->close();
        } else {
            return "Error while setUp";
        }        
    }

    protected function tearDown()
    {
        $this->rrmdir($this->sample_app_path());
    }

    public function sample_app_path($path = '')
    {
        return (storage_path().DIRECTORY_SEPARATOR."sample-app").($path ? DIRECTORY_SEPARATOR.$path : $path);
    }    

    private function rrmdir($dir) { 
        if (is_dir($dir)) { 
          $objects = scandir($dir); 
          foreach ($objects as $object) { 
            if ($object != "." && $object != "..") { 
              if (is_dir($dir."/".$object))
                $this->rrmdir($dir."/".$object);
              else
                unlink($dir."/".$object); 
            } 
          }
          rmdir($dir); 
        } 
    }    
}
