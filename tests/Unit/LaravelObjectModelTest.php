<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Stimpack\Manipulators\Support\PseudoParser;
use App\Stimpack\Manipulators\Support\LaravelObjectModel;
use App\Stimpack\Manipulators\ScaffoldLaravel;
use Illuminate\Support\Collection;

require_once(__DIR__ . "/PseudoParser/PseudoSamples.php");

class LaravelObjectModelTest extends TestCase
{
    /** @test */
    public function it_can_run()
    {
        $this->assertTrue(true);
    }

    /** @test */
    public function it_can_instanciate()
    {
        $lom = LaravelObjectModel::make((object) [
            "targetProjectPath" => '', // This is only a relative preview
            "stubs" => make_object('{
                "model": "<?php ..."
            }'),            
            "settings" => make_object('{}')            
        ]);        
        $this->assertTrue($lom instanceof LaravelObjectModel);
    }
    
    /** @test */
    public function it_can_preview()
    {
        $lom = LaravelObjectModel::make((object) [
            "targetProjectPath" => '', // This is only a relative preview
            "stubs" => (object) ScaffoldLaravel::stubs()->toArray(),            
            "settings" => make_object('{}')            
        ])->previewFrom(
            PseudoParser::parse(MODEL_ENDING_WITH_IS_AND_RELATIONSHIP)
        );

        $this->assertTrue($lom instanceof Collection);
    }    
}