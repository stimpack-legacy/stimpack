<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Stimpack\Contexts\File;
use App\LocalPack;

class PackController extends Controller
{
    public function save(Request $request, $packName) {
        $pack = new LocalPack();
        $pack->name = $packName;
        $pack->content = $request->content;
        $pack->description = $request->description;
        $pack->save();

        return "OK I saved the pack!";
    }
}