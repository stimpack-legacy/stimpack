export default class Cache {


    static get(name, prefix = "") {
        return JSON.parse(localStorage.getItem(prefix + name));
    }

    static set(name, prefix = "", value) {
        localStorage.setItem(prefix + name, JSON.stringify(value));
    }
}