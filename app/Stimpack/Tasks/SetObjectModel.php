<?php

namespace App\Stimpack\Tasks;
use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;

class SetObjectModel extends Task
{
    public function perform() {        
        return "succesfully set project object model";                
    }
}