<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LocalPack extends Model
{
    protected $casts = [
        'content' => 'object'
    ];
}
