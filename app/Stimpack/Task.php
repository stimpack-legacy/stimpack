<?php

namespace App\Stimpack;

interface Task
{
    public function __construct($data);
    public function perform();
}
