<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use App\Pack;
use App\Http\Controllers\ManipulatorController;

class GuiController extends Controller
{
    public function __construct() {
        $this->data = [
            'projects' => $this->projects(), 
            'packs' => Pack::all(),
            'stimpack_io_token' => env('STIMPACK_IO_TOKEN'),
            'stimpack_data_url' => env('STIMPACK_DATA_URL'),
            'manipulatorData' => ManipulatorController::attachStartupData()
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
                (array) json_decode(file_get_contents(env('STIMPACK_DATA_URL') . "/packs/" . $author . "/" . $packName))                
            );
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

    /* PRIVATES ******************************************************************/

    private function projects()
    {        
        return collect(array_filter(glob(env('STIMPACK_CODE_PATH') . "/*"), 'is_dir'))->values();        
    }


    private function onlinePacks()
    {
        $client = new Client();
        $result = $client->get('http://stimpack-data.test/api/packs');
        return collect(json_decode($result->getBody()->getContents(), true));
    }
}
