<?php

namespace Tests\Unit\Manipulators;

use Tests\ManipulatorTestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
Use App\Stimpack\Manipulators\File;
Use App\Stimpack\Manipulators\Project;
use PHPUnit\Runner\Exception;
use ZipArchive;

class ProjectTest extends ManipulatorTestCase
{     
    /** @test */
    public function it_can_load_an_existing_project()
    {        
        $this->assertInstanceOf(
            Project::class, 
            Project::load($this->sample_app_path())
        );
    }
    
    /** @test */
    public function it_cant_load_non_existing_project()
    {        
        $this->expectException(\Exception::class);
        Project::load($this->sample_app_path() . "/dummy/project/not/exists");
    }
    
    /** @test */
    public function it_can_create_project()
    {        
        $this->assertInstanceOf(
            Project::class, 
            Project::create($this->sample_app_path("brand-new-project"))
        );

        $this->assertTrue( 
            file_exists($this->sample_app_path("brand-new-project"))
        );
        
        $this->assertTrue( 
            file_exists($this->sample_app_path("brand-new-project/composer.json"))
        );        
    }    


    /** @test */
    public function it_cant_create_already_existing_project()
    {        
        $this->expectException(\Exception::class);
        Project::create($this->sample_app_path());
    }    
}