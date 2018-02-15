import Cache from './Cache'; // Instead of constantly doing HTTP request to server, cache pluralization etc to localStorage?
import Template from './Template';
import Attribute from './Attribute';

export default class PseudoCodeTransformer {
    constructor() {
        this.transformedModels = [];        
    }

    transform(pseudoCode, callback) {
        this.callback = callback; // To be called when everything is ready
        this.cleanedCode = this.prepare(pseudoCode);
        this.segments = this.segment(this.cleanedCode);        
        var definitions = this.definitions(this.segments);        
    }

    define(segment) {
        var rows = segment.split(/\n/);
        var model = rows[0];        

        if(Cache.get(model,"plural") == null) {
            $.ajax({
                url: "/stimpack/pluralize/" + model,
                success: function(modelPluralized){
                    Cache.set(model, "plural", modelPluralized);
                    this.pushTransformedModel(rows, model, modelPluralized);                                        
                }.bind(this)
            });
        } else {
            this.pushTransformedModel(rows, model, Cache.get(model, "plural"));    
        }
    }

    pushTransformedModel(rows, model, modelPluralized) {
        this.transformedModels.push({
            model: model.charAt(0).toUpperCase() + model.slice(1),
            table: modelPluralized,
            attributes: rows.slice(1).map((name) => { return new Attribute(name);}),
            migration: "placeholder",
            hasModel: true
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

    loadPluralized() {

    }

    finished() {        
        return this.transformedModels.length == this.segments.length || this.segments.length == 0;
    }

    returnTransformedModels() {
        typeof this.callback === 'function' && this.callback(this.transformedModels);
    }

    definitions(segments) {
        var definitions = [];
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

    phpDefinition(attribute) {
        var phpDefinition = this.lookup(attribute);

        return "\t" + phpDefinition + "\n";
    }

    lookup(attribute) {
        var defaults = {
            "id": "$table->increments('id');",
            "email": "$table->string('email')->unique();",
            "rememberToken": "$table->rememberToken();",
            "timestamps": "$table->timestamps();"
        };

        if (attribute in defaults) {
            return defaults[attribute];
        }

        // if nothing found resort to default string
        return "$table->string('" + attribute +"');";
    }
}