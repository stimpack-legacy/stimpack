<?php

namespace App\Stimpack\Tasks;

use Illuminate\Support\Facades\Log;
use App\Stimpack\Task;

class CreateEpicSplashPage extends Task
{

    public function perform() {
        $welcome=file_get_contents($this->projectPath() . '/resources/views/welcome.blade.php');

        $oldStyle = "background-color: #fff;";        
        $newStyle = "background-image: url('" . $this->imageUrl . "'); background-size:100%;";
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