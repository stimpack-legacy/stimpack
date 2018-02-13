export default class Cache {


    static get(name) {
        return JSON.parse(localStorage.getItem(name));
    }

    static set(name, value) {
        localStorage.setItem(name, JSON.stringify(value));
    }
}

/*

Old usage:
name = pluralize("car"); // on demand AJAX takes long time
name = pluralize("car"); // repeatedly

New idea of usage:
class Cache {
    constructor(method) {
        this.method = method;
    }

    get(params) {
        return this.method(params);;
    }    
}

var plurals = Cache(pluralize());
plurals.get("Car"); // First time no gain
plurals.get("Car"); // Second time no HTTP call




*/