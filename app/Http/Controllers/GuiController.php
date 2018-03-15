<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GuiController extends Controller
{
    public function index($projectName = false) {

        $data = [
            'projects' => $this->projects(), 
        ];

        if($projectName) $data["projectName"] = $projectName;

        return view('welcome')->with(["data" => collect($data)]);
    }

    private function projects() {
        chdir("../../");
        return collect(array_filter(glob("*"), 'is_dir'));        
    }

}
