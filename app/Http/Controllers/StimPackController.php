<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StimPackController extends Controller
{
    public function perform(Request $request, $task) {
        
        return $this->$task();
    }

    private function makeMigrations() {
        return "successfully created migrations. For full log output click here.";
    }

    private function migrate() {
        return "successfully migrated. For full log output click here.";
    }    
}
