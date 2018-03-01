export default
`<?php

namespace App;

use Illuminate\\Notifications\\Notifiable;
use Illuminate\\Foundation\\Auth\\User as Authenticatable;

class $MODEL$ extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
$MASS-ASSIGNABLE-ATTRIBUTES$
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
$HIDDEN-ATTRIBUTES$
    ];

$RELATIONSHIPS$
    
}`;