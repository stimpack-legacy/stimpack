# Stimpack
Check out the video:
https://www.youtube.com/watch?v=K1ntPeDpg9U

### ALPHA DISCLAIMER!!!
Stimpack is currently in early development stage so don't let your scope of contribution be restricted i any way. For example f you have a great idea for a new skeleton structure for the whole code base please let us know through a pull requests, another branch, a poto of a sketch on a napkin. Everything is appriciated!

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
