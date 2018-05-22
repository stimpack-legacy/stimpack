<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Stimpack\Manipulators\Support\PseudoParser;
use App\Stimpack\Manipulators\Support\LaravelObjectModel;
use App\Stimpack\Manipulators\ScaffoldLaravel;
use Illuminate\Support\Collection;
use App\Stimpack\Manipulators\Support\EntityFactory;

require_once(__DIR__ . "/PseudoParser/PseudoSamples.php");

class EntityFactoryTest extends TestCase
{
    /** @test */
    public function it_can_run()
    {
        $entities = EntityFactory::makeWith((object) [
            "targetProjectPath" => '', // This is only a relative preview
            "stubs" => (object) ScaffoldLaravel::stubs()->toArray(),            
            "settings" => make_object('{}')            
        ])->getAllEntetiesFrom(
            PseudoParser::parse(MODEL_ENDING_WITH_IS_AND_RELATIONSHIP)
        );

        $model = $entities->first();
        $methods = $model->allRelationships()->filter(function($relationship) {
            return $relationship->concerns($this); 
        })->map(function($relationship) {
            return $relationship->renderMethod($this);
        });

        dump($methods);


        $this->assertTrue(true);
    }    
}

