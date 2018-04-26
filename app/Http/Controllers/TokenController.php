<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Stimpack\Contexts\File;

class TokenController extends Controller
{
    public function register(Request $request, $token) {
        file_put_contents(base_path('.env'), PHP_EOL . "STIMPACK_IO_TOKEN=" . $token . PHP_EOL , FILE_APPEND | LOCK_EX);
        return redirect('/');
    }
}