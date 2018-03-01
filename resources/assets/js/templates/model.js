export default 
`<?php

namespace App;

use Illuminate\\Database\\Eloquent\\Model;

class $MODEL$ extends Model
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
}`;