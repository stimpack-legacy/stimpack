export default function () {
    return [
        {
            id: "CreateMigrationsTask",
            heading: "Create migrations",
            description: "```php artisan migrate:fresh```",
            enabled: true
        },
        {
            id: "CreateModelsTask",
            heading: "Create models",
            description: "```php artisan make:model X```",
            enabled: true
        },        
    ]
}