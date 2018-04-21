<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Stimpack\Contexts\File;

class PackController extends Controller
{
    public function save(Request $request, $pack) {

        File::loadOrCreate(storage_path("stimpack/packs/" . $pack))
            ->content($request->fileContent)
            ->save();

        return "OK I saved the pack!";
    }
}