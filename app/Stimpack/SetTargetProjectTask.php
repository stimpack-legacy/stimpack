<?php

namespace App\Stimpack;
use Illuminate\Support\Facades\Log;

class SetTargetProjectTask extends Task
{
    public function perform() {
        // Create new laravel project with composer
        exec("composer create-project --prefer-dist -n laravel/laravel ../../" . $this->projectName ." 2>&1", $outputAndErrors);    
        // Laravels key:generate does not work in shell, lets do it manually for now
        file_put_contents($this->projectPath()."/.env", envContent());
        // Return output and errors
        return $outputAndErrors;
    }
}

function envContent() { return
"APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:yK7lM9GKZWH+6UO/yGorJl08kAZ+uiOQO5Wttl4g9zA=
APP_DEBUG=true
APP_LOG_LEVEL=debug
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret

BROADCAST_DRIVER=log
CACHE_DRIVER=file
SESSION_DRIVER=file
SESSION_LIFETIME=120
QUEUE_DRIVER=sync

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1";    
}