import Cache from './Cache'; // Instead of constantly doing HTTP request to server, cache pluralization etc to localStorage?
import Template from './Template';
import Attribute from './Attribute';

export default class PseudoCodeTransformer {
    constructor() {
        this.transformedModels = [];        
    }

    transform(pseudoCode, callback) {
        // To be called when everything is ready
        this.callback = callback;
        // Remove extra line breaks etc
        this.cleanedCode = this.prepare(pseudoCode);
        // Separate pseudoCode into chunks
        this.segments = this.segment(this.cleanedCode);
        // Produce definition for each chunk        
        var definitions = this.definitions(this.segments);        
    }

    define(segment) {
        var rows = segment.split(/\n/);
        var heading = rows[0];
        var type = "model";
        
        // By convention "Word" with capital starting char corresponds to a model "Word" with table "words". 
        // But "word" is just a table "word" without an associated model.
        if(heading.charAt(0) == heading.charAt(0).toLowerCase()) {
            type = "table";
            this.pushTransformedModel(type, rows, heading, heading);
            return;
        }        

        // If no cache present for plural lets get that and save it
        if(Cache.get(heading,"plural") == null) {
            $.ajax({
                url: "/stimpack/pluralize/" + heading,
                success: function(modelPluralized){
                    Cache.set(heading, "plural", modelPluralized);
                    this.pushTransformedModel(type, rows, heading, modelPluralized);                                        
                }.bind(this)
            });
            return;
        }

        // The segment was a Model with present cache for plural.
        this.pushTransformedModel(type, rows, heading, Cache.get(heading, "plural"));    
        
    }

    pushTransformedModel(type, rows, model, table) {
        this.transformedModels.push({
            type: type,
            model: model,
            table: table,
            attributes: rows.slice(1).map((name) => { return new Attribute(name);}),
            migration: "placeholder"
        });
        this.transformedModels.sort(function(a, b){
            if(a.model < b.model) return -1;
            if(a.model > b.model) return 1;
            return 0;
        });                    
        if(this.finished()) {
            this.returnTransformedModels();        
        }
    }

    finished() {        
        return this.transformedModels.length == this.segments.length || this.segments.length == 0;
    }

    returnTransformedModels() {
        typeof this.callback === 'function' && this.callback(this.transformedModels);
    }

    definitions(segments) {
        segments.map((segment) => {
            this.define(segment);            
        });
        if(this.finished()) {
            this.returnTransformedModels();
        }
    }

    prepare(code) {
        // trim preciding newlines
        code = code.replace(/^\n+/,"")
        // trim trailing newlines
        code = code.replace(/\n+$/, "");
        // remove exessive newlines
        code = code.replace(/\n\s+\n/, "\n\n");
        // remove comments
        //code = code.replace(/^\/\/.*$/m, "");
        return code;
    }

    segment(code) {
        var parts = code.split(/\n\s*\n/);
        if(parts[0] == "") {
            return [];
        }
        return code.split(/\n\s*\n/);        
    }
}