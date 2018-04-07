<?php

namespace Tests\Unit\Contexts;

use Tests\ContextTestCase;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
Use App\Stimpack\Contexts\File;
use PHPUnit\Runner\Exception;
use ZipArchive;

class FileTest extends ContextTestCase
{
    /** @test */
    public function it_can_load_from_existing_files()
    {        
        $this->assertInstanceOf(
            File::class, 
            File::load($this->sample_app_path("composer.json"))
        );
    }
    
    /** @test */
    public function it_cant_load_non_existing_files()
    {
        $this->expectException(\Exception::class); 
        $file = File::load($this->sample_app_path("composer.json") . "foobar");
    }

    /** @test */
    public function it_can_save_create_to_non_taken_names()
    {
        $file = File::create($this->sample_app_path("a_file_name_thats_not_taken"))->save();
        $this->assertTrue(
            is_file($file->path())
        );        
    }

    /** @test */
    public function it_does_not_put_file_before_save()
    {
        $file = File::create($this->sample_app_path("a_file_name_thats_not_taken"));
        $this->assertTrue(
            !is_file($file->path())
        );        
    }    

    /** @test */
    public function it_cant_create_to_taken_names()
    {
        $this->expectException(\Exception::class); 
        $file = File::create($this->sample_app_path("composer.json"));
    }
    
    /** @test */
    public function it_can_create_to_non_taken_names()
    {
        $file = File::create($this->sample_app_path("a_file_name_thats_not_taken"))->save();
        $this->assertTrue(
            is_file($file->path())
        );        
    }

    /** @test */
    public function it_can_empty_files()
    {
        $file = File::load($this->sample_app_path("composer.json"))->empty()->save();
        $this->assertTrue(
            file_get_contents($file->path()) == ""
        );        
    }
    
    /** @test */
    public function it_can_update_file_content()
    {
        $file = File::load($this->sample_app_path("composer.json"))->content("some_content")->save();
        $this->assertTrue(
            file_get_contents($file->path()) == "some_content"
        );        
    }
    
    /** @test */
    public function it_can_get_file_content_under_processing()
    {
        $content = File::load($this->sample_app_path("composer.json"))->content("hi")->content();
        $this->assertTrue(
            $content == "hi"
        );        
    }
    
    /** @test */
    public function it_can_find_file_class_names()
    {        
        $class = File::load($this->sample_app_path("app/User.php"))->class();
        $this->assertTrue(
            $class == "User"
        );        
    }

    /** @test */
    public function it_halts_if_no_class_was_found()
    {
        $this->expectException(\Exception::class); 
        $file = File::load($this->sample_app_path("composer.json"))->class();
    }    
    
    /** @test */
    public function it_can_replace_file_class_names()
    {        
        $class = File::load($this->sample_app_path("app/User.php"))->setClass("Baby")->class();
        
        $this->assertTrue(
            $class == "Baby"
        );
    }    

    /** @test */
    public function it_can_find_file_namespace()
    {        
        $namespace = File::load($this->sample_app_path("app/Console/Kernel.php"))->namespace();
        $this->assertTrue(
            $namespace == "App\Console"
        );        
    }

    /** @test */
    public function it_returns_null_if_no_namespace_was_found()
    {
        $namespace = File::load($this->sample_app_path("composer.json"))->namespace();
        
        $this->assertTrue(
            $namespace == null
        );
    }    

    /** @test */
    public function it_can_replace_file_namespace()
    {        
        $namespace = File::load($this->sample_app_path("app/Console/Kernel.php"))
                            ->namespace('App\Epic\Turnover')
                            ->namespace();
        $this->assertTrue(
            $namespace == 'App\Epic\Turnover'
        );
    }

    /** @test */
    public function it_can_find_uses()
    {        
        $uses = File::load($this->sample_app_path("app/Console/Kernel.php"))->uses();        
        $this->assertTrue(
            $uses == [
                "Illuminate\Console\Scheduling\Schedule",
                "Illuminate\Foundation\Console\Kernel as ConsoleKernel"
            ]
        );        
    }    

    /** @test */
    public function it_can_set_uses()
    {        
        $uses = File::load($this->sample_app_path("app/Console/Kernel.php"))->use(["App\Foo\Bar", "App\EpicAndGrand as Grand"])->uses();                
        
        $this->assertTrue(
            $uses == [
                "Illuminate\Console\Scheduling\Schedule",
                "Illuminate\Foundation\Console\Kernel as ConsoleKernel",
                "App\Foo\Bar",
                 "App\EpicAndGrand as Grand"
            ]
        );        
    }

    /** @test */
    public function it_can_reset_uses_using_onlyUse()
    {        
        $uses = File::load($this->sample_app_path("app/Console/Kernel.php"))->onlyUse(["App\Foo\Bar", "App\EpicAndGrand as Grand"])->uses();                
        
        $this->assertTrue(
            $uses == [
                "App\Foo\Bar",
                 "App\EpicAndGrand as Grand"
            ]
        );        
    }

    /** @test */
    public function it_can_add_use_statement() {
        $uses = File::load($this->sample_app_path("app/Console/Kernel.php"))->uses();        
        $this->assertTrue(
            $uses == [
                "Illuminate\Console\Scheduling\Schedule",
                "Illuminate\Foundation\Console\Kernel as ConsoleKernel"
            ]
        );
    }
    /** @test */
    public function it_formats_header_according_to_psr2_case_untouched_file() {
        $content = File::load($this->sample_app_path("public/index.php"))->content();
                
        $this->assertTrue(
            starts_with($content, "<?php\n\n")
        );
    }
    
    /** @test */
    public function it_formats_header_according_to_psr2_case_modified_uses() {
        $content = File::load($this->sample_app_path("public/index.php"))->onlyUse(["Dummy\Test"])->content();
                
        $this->assertTrue(
            starts_with($content, "<?php\n\nuse Dummy\Test;\n\n")
        );
    }
    
    /** @test */
    public function it_formats_header_according_to_psr2_case_modified_uses_and_namespace() {
        $content = File::load($this->sample_app_path("public/index.php"))
            ->onlyUse(["Dummy\Test"])
            ->namespace("App\Epic\Namespace\FTW")->content();
        
        $this->assertTrue(
            starts_with($content, "<?php\n\nnamespace App\Epic\Namespace\FTW;\n\nuse Dummy\Test;\n\n")
        );
    }
    
    /** @test */
    public function it_can_inject_class_methods() {
        $function = "\n\n    function()\n    {\n        return 1337;\n    }\n}";

        $content = File::load($this->sample_app_path("app/User.php"))
            ->addMethod($function)->content();
        
        $this->assertTrue(
            str_contains($content, $function)
        );
    }    
}