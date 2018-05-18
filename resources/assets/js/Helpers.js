export const nonCircularStringify = function(data, callback = null, indentation = 4) {
    var cache = [];
    return JSON.stringify(data, function(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    }, indentation);
}

export const studlyCaseWithSpace = function(name){
    return name.replace(/([A-Z])/g, ' $1').trim();
}
