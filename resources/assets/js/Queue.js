import {nonCircularStringify} from "./Helpers";

export default class Queue {
    constructor() {
        this.waiting = [];
        this.finished = [];
        this.failed = null;
        this.pending = null;
                
    }

    addSetQueueCallback(callback) {
        this.setQueue = callback;
    }

    register(items) {
        this.waiting = items;
    }

    static deSerialize(data) {
        var queue = new Queue();
        queue.waiting = data.waiting;
        queue.finished = data.finished;
        queue.pending = data.pending;
        return queue;
    }

    process() {
        if(!this.isBusy() && this.hasWaitingItems()) {
            this.processItem(this.waiting.shift());            
        }
    }
    
    hasWaitingItems() {
        return this.waiting.length > 0;
    }

    isBusy() {
        return this.pending != null;
    }

    processItem(item) {
        this.pending = item;
        this.setQueue(this);                

        $.ajax({
            type: "POST",
            url: "/perform/" + item.name,
            data: {
                data: nonCircularStringify(item)
            },
            success: function(result){
                console.log(item.name + " succeded!");
                this.finished.push(this.pending);
                this.pending = null;
                this.setQueue(this);

            }.bind(this),
            error: function(error) {
                //var a = JSON.parse(error);
                console.log(item.name + " failed with message: '" + error.responseJSON.message + "'");
                
                console.groupCollapsed(["Stack trace"])
                    console.log(error.responseText);
                console.groupEnd();                
                this.failed = this.pending;
                this.pending = null;
                this.waiting = [];
                this.setQueue(this);
            }.bind(this)
        });        
    }

    nonCircularStringify(data) {
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
        });
    }

    isAboutToRun() {
        return this.finished.length == 0;
    }
}