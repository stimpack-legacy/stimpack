<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
        <link rel="icon" href="img/favicon.ico" type="image/x-icon">
        <title>Laravel Stimpack</title>
        <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
        <script src="https://ajaxorg.github.io/ace-builds/src-noconflict/ace.js" type="text/javascript" charset="utf-8"></script>
    </head>
    <body>        
        <div id="main"></div>
        <script>
            let data = {!! $data->toJson() !!};

        </script>
        <script src="{{asset('js/app.js')}}" ></script>                
    </body>
</html>