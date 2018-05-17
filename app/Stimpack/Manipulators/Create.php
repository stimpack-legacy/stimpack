<?php

namespace App\Stimpack\Manipulators;
use Illuminate\Support\Facades\Log;
use App\Stimpack\Manipulator;
use App\Stimpack\Templates;
use ZipArchive;

class Create extends Manipulator
{
    public function perform() {
        $zip = new ZipArchive;
        $res = $zip->open(storage_path("stimpack/laravel.zip"));
        $targetProjectPath = $this->targetProjectPath();

        if ($res === TRUE) {
            $zip->extractTo($targetProjectPath);
            $zip->close();
        } else {
            return "Throw error here!";
        }

        return [
            "messages" => [
                "Created application at $targetProjectPath",
                $this->injectAppName(),
                "Check it out at http://" . $this->data->targetProjectName . ".test"
            ]
        ];
    }

    private function injectAppName(){
        $welcomeBlade = $this->path("resources/views/welcome.blade.php");
        $contents = file_get_contents ($welcomeBlade);

        $contents = str_replace("Laravel", $this->data->targetProjectName, $contents);

        file_put_contents($welcomeBlade, $contents);

        return "Injected your app-name to splash screen";

        //SUGGESTION
        /*File::load($this->path("resources/views/welcome.blade.php"))
            ->replace("Laravel", $this->data->targetProjectName);*/
    }
}
