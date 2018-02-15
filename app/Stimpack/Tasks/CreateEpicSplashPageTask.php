<?php

namespace App\Stimpack\Tasks;

use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;

class CreateEpicSplashPageTask extends Task
{

    public function perform() {
        $welcome=file_get_contents($this->projectPath() . '/resources/views/welcome.blade.php');

        $oldStyle = "background-color: #fff;";        
        $newStyle = "background-image: url('https://www.wallpaperup.com/uploads/wallpapers/2012/12/15/24858/73fa050491f624b7408b70f61c77ce3b-1000.jpg');";
        $welcome=str_replace($oldStyle, $newStyle, $welcome);

        $oldStyle = "Laravel";        
        $newStyle = $this->projectName();
        $welcome=str_replace($oldStyle, $newStyle, $welcome);        

        $oldStyle = "font-weight: 100;";        
        $newStyle = "font-weight: 900;";
        $welcome=str_replace($oldStyle, $newStyle, $welcome);
        
        file_put_contents($this->projectPath() . '/resources/views/welcome.blade.php', $welcome);

        return "Created splash page!";

    }
}