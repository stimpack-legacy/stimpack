export default class NewName {
    static get(){
        var min = 0
        var max = 5
        var name = Math.floor(Math.random()*(max-min+1)+min)
        var names = ["FooBar-café-website", "My-skynet-webapp", "My-little-pony-recepies", "Cats-eliminating-stuff-blog", "AI-Crypto-Mars-Singularity-App", "My-AI-murder-machine"];
        return names[name];
    }
}
