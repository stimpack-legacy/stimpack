<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

class GuiController extends Controller
{
    public function index($projectName = false) {
        
        $data = [
            'projects' => $this->projects(), 
            'packs' => $this->localPacks()//->concat($this->onlinePacks()),
        ];
        
        if($projectName) $data["projectName"] = $projectName;
        
        return view('welcome')->with(["data" => collect($data)]);
    }

    public function load($author, $pack)
    {
        return "TEMP"; //view('welcome')->with(["data" => collect($data)]);
    }

    private function projects()
    {
        chdir("../../");
        return collect(array_filter(glob("*"), 'is_dir'))->values();        
    }

    private function localPacks()
    {
        chdir("/home/anders/Code/stimpack/storage/stimpack/packs");
        return collect(array_filter(glob("*"), 'is_file'))->map(function($filename) {
            return json_decode(file_get_contents($filename));
        });
    }

    private function onlinePacks()
    {
        $client = new Client();
        $result = $client->get('http://stimpack-data.test/api/packs');
        return collect(json_decode($result->getBody()->getContents(), true));
    }

}
