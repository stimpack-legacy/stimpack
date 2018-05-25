<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GlobalPack extends Model
{
    // this class should be a tableless model...

    protected $fillable = [
        'name', 'content', 'description', 'created_at', 'updated_at', 'id'
    ];
}