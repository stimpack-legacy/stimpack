<p align="center"><img src="public/img/stimpack_logo_with_text.png" width="60%"></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/v/stable.svg" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
</p>

## Build Laravel apps in seconds.
Laravel Stimpack is a task runner for speedy boilerplate generation. It sets the appropriate datatypes and integrity rules, relationships from minimal input. Stimpack is powered by statistics from thousands of open source repos.

## Installation

    git clone git@github.com:ajthinking/stimpack.git
    cd stimpack
    composer install
    cp .env.example .env
    php artisan key:generate
    
  
## Development installation (further steps)
    npm install
    npm run dev
    npm run watch-poll
<hr>

## CLI

| Command            | Explanation                                              |
|:--------------------------- |:--------------------------------------------------- |
| `stimpack park`             | Install stimpack in current directory                                 | 
| `stimpack open` | Open an existing project | 
|`stimpack new <site>`|Create a new application|
|`stimpack new <site> from <template>`|Create from template|
|`stimpack --help`|Displays help|
|`stimpack --now`|Force imidiate creation without GUI interaction|
