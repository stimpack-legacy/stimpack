import Cache from './Cache'; // Instead of constantly doing HTTP request to server, cache pluralization etc to localStorage?
import Template from './Template';

export default class ModelTransformer {
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
        // pluralize model
        $.ajax({
            url: "/stimpack/pluralize/" + model,
            //data: "somedata more thiss as well?", 
            success: function(modelPluralized){
                this.transformedModels.push({
                    model: modelPluralized,
                    attributes: rows.slice(1)
                });
                if(this.finished()) {
                    this.returnTransformedModels();        
                }
                                    
            }.bind(this)
        });
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

    preview(transformedModels) {
        var result = "";
        transformedModels.map((definition) => {
            result += "// ...\n\nSchema::create('" + definition.model + "', function (Blueprint $table) {\n";
            definition.attributes.map((attribute) => {
                result += this.phpDefinition(attribute);
            });
            result += "}\n\n";
        });
        return result;
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