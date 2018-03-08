export default class Cache {


    static get(name, prefix = "") {
        return JSON.parse(localStorage.getItem(prefix + name));
    }

    static getLike(name, prefix = "") {
        for (var key in localStorage){
            if((prefix+name).toLowerCase() == key.toLowerCase()) return Cache.get(key);
         }        
    }

    static set(name, prefix = "", value) {
        localStorage.setItem(prefix + name, JSON.stringify(value));
    }
}