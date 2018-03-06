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
MASS_ASSIGNABLE_ATTRIBUTES
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
HIDDEN_ATTRIBUTES
    ];

    BELONGS_TO_RELATIONSHIPS

    HAS_MANY_RELATIONSHIPS

    BELONGS_TO_MANY_RELATIONSHIPS

}`;