# Stimpack
Introduction for stimpack
![Stimpack](https://img.youtube.com/vi/K1ntPeDpg9U/0.jpg)](https://www.youtube.com/watch?v=K1ntPeDpg9U "Stimpack - Promo")

### ALPHA DISCLAIMER!!!
Stimpack is currently in alpha and will probably require a total re-write. Please contribute your ideas but keep that in mind.

### Installation
```
composer global require consolidation/cgr
cgr stimpack-io/stimpack
```

### Quick start
```
cd /path/to/Code
stimpack park
```
Navigate to http://stimpack.test (requires Laravel valet or similar setup).

### Development installation

```
    git clone git@github.com:stimpack-io/stimpack.git stimpack-dev
    cd stimpack-dev
    composer install
    cp .env.example .env
    # possilby install stimpack-io/data
    # get github tokens from ajthinking if needed
    php artisan key:generate
    cd .. && ./stimpack-dev park
    npm install
    npm run watch
```

### Contribution guide
Checkout a developer quickstart video here (coming soon).
