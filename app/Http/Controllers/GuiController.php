<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use App\Stimpack\Pack;

class GuiController extends Controller
{
    public function __construct() {
        $this->data = [
            'projects' => $this->projects(), 
            'packs' => $this->localPacks(),
            'stimpack_io_token' => env('STIMPACK_IO_TOKEN')
        ];
    }

    public function index()
    {        
        return view('welcome')->with(["data" => collect($this->data)]);
    }

    public function open($author, $packName)
    {
        
        if($author != "local") {            
            $this->data["pack"] = new Pack(
                $packName,
                json_decode(file_get_contents("http://data.stimpack.test/packs/" . $author . "/" . $packName))
            );
//            dd($this->data["packs"][0]);
        } else {
            $this->data["pack"] = collect($this->data["packs"])->first(function($pack) use($packName) {
                return $pack->name == $packName;
            });
        }

        return view('welcome')->with(["data" => collect($this->data)]);
    }

    public function openLocal($packName)
    {
        return $this->open("local", $packName);
    }    


    public function localPacks()
    {
        chdir(storage_path("stimpack/packs"));
        return collect(array_filter(glob("*"), 'is_file'))->map(function($filename) {
            return new Pack(
                str_replace_last(".json", "", $filename),
                json_decode(file_get_contents($filename))
            ); 
        });
    }

    /* PRIVATES ******************************************************************/

    private function projects()
    {
        chdir("../../");
        return collect(array_filter(glob("*"), 'is_dir'))->values();        
    }


    private function onlinePacks()
    {
        $client = new Client();
        $result = $client->get('http://stimpack-data.test/api/packs');
        return collect(json_decode($result->getBody()->getContents(), true));
    }
}
