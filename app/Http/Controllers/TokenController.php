<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Stimpack\Contexts\File;

class TokenController extends Controller
{
    public function register(Request $request, $token) {
        set_env_value("STIMPACK_IO_TOKEN", $token);
        return redirect('/');
    }

}