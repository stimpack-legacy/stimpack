<?php

namespace App\Stimpack\Manipulators;
use App\Stimpack\Manipulator;
use Config;
use DB;
use PDO;
use PDOException;
use App\Stimpack\Contexts\File;
use Exception;

class CreateDatabase extends Manipulator
{
    public function perform() {
        return [
            "messages" => [
                $this->installOrFail($this->targetEnv("DB_CONNECTION")),
            ]
        ];
    }

    public function installOrFail($connection)
    {
        if ($connection == "mysql") {
            return $this->createMysql();
        }

        if($connection == "sqlite") {
            return $this->createSqlite();
        }

        throw new Exception("Database type not supported. Only Mysql and Sqlite are supported in this Alfa.");
    }

    public function createMysql()
    {
        $database = $this->targetEnv('DB_DATABASE');

        try {
            $pdo = $this->getPDOConnection(
                $this->targetEnv('DB_HOST'),
                (int) $this->targetEnv('DB_PORT'),
                $this->targetEnv('DB_USERNAME'),
                $this->targetEnv('DB_PASSWORD')
            );

            $pdo->exec(sprintf(
                'CREATE DATABASE IF NOT EXISTS %s ;',
                $database
            ));

            return "Successfully created database " . $database;
        } catch (PDOException $exception) {
            return sprintf('Failed to create %s database, %s', $database, $exception->getMessage());
        }
    }

    public function createSqlite()
    {
        $database = $this->targetEnv("DB_DATABASE");
        touch($database);
        return "Successfully created database " . $database;
    }

    private function getPDOConnection($host, $port, $username, $password)
    {
        return new PDO(sprintf('mysql:host=%s;port=%d;', $host, $port), $username, $password);
    }    
}