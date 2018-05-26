<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pack extends Model
{
    protected $fillable = [
        'name', 'content', 'description', 'created_at', 'updated_at', 'id'
    ];
}
