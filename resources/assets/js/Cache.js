export default class Cache {
    constructor(pseudoCode) {
        this.pseudoCode = pseudoCode;
    }

    static get(name) {
        return JSON.parse(localStorage.getItem(name));
    }

    static set(name, value) {
        localStorage.setItem(name, JSON.stringify(value));
    }
}