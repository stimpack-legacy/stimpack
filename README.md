## Stimpack - DISCOUNTINED
Introducing a web development accelerator built on Laravel
<img src="https://i.imgur.com/AGAA8Ud.gif" title="source: imgur.com" ></img>

Check out the full promo video [here](https://www.youtube.com/watch?v=K1ntPeDpg9U)

### Showcase
Create new projects or manipulate existing projects...
<img src="https://i.imgur.com/iITjKgw.png"></img>
...everything you build is instantly available in the CLI
<img src="https://i.imgur.com/2YZEqNk.png?4"></img>
Share and reuse packs with the stimpack.io community
<img src="https://i.imgur.com/8Trjrk2.png"></img>

### ALPHA DISCLAIMER!!!
Stimpack is currently in early development stage so don't let your scope of contribution be restricted i any way. For example if you have a great idea for a new skeleton structure for the whole code base please let us know through a pull requests, another branch, a photo of a sketch on a napkin. Everything is appriciated!

### Installation
```
composer global require consolidation/cgr
cgr stimpack/stimpack
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
