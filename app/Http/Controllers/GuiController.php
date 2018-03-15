<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GuiController extends Controller
{
    public function index($projectName = false) {

        $data = [
            'projects' => $this->projects(), 
            'packs' => $this->packs()
        ];

        if($projectName) $data["projectName"] = $projectName;

        return view('welcome')->with(["data" => collect($data)]);
    }

    private function projects() {
        chdir("../../");
        return collect(array_filter(glob("*"), 'is_dir'));        
    }

    private function packs() {
        chdir("/home/anders/Code/stimpack/storage/stimpack/packs");
        return collect(array_filter(glob("*"), 'is_file'));        
    }

}
