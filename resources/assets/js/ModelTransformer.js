export default class ModelTransformer {
    constructor(pseudoCode) {
        this.pseudoCode = pseudoCode;
    }

    transform() {
        this.cleanedCode = this.prepare(this.pseudoCode);
        var segments = this.segment(this.cleanedCode);        
        var definitions = this.definitions(segments);
        return this.preview(definitions);        
    }

    define(segment) {
        var rows = segment.split(/\n/);
        var model = rows[0];
        var attributes = rows.slice(1);
        return {
            model,
            attributes
        }
    }

    definitions(segments) {
        var definitions = [];
        segments.map((segment) => {
            var definition = this.define(segment);
            if(definition.model != "") {
                definitions.push(definition);
            }            
        });
        return definitions;
    }

    preview(definitions) {
        var result = "";
        definitions.map((definition) => {
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
        return code.split(/\n\s*\n/);
    }

    test() {
        if(this.prepare("User\n\n\n") == "User") {
            //alert("trim tests passed!");
        }
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