import Cache from './Cache'; // Instead of constantly doing HTTP request to server, cache pluralization etc to localStorage?
import Template from './Template';
import Attribute from './Attribute';

export default class PseudoCodeTransformer {
    constructor() {
        this.transformedPseudoCode = [];        
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

    // Produce definition for a single chunk
    define(segment) {
        var rows = segment.split(/\n/);
        var heading = rows[0];
        var type = "model";
        
        // By convention "Word" with capital starting char corresponds to a model "Word" with table "words". 
        // But "word" is just a table "word" without an associated model. Note - potentially relationship table
        if(heading.charAt(0) == heading.charAt(0).toLowerCase()) {
            this.pushTransformedModel("table", rows, heading, heading, this.manyToManyDefinition());
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

    activeTab(pseudoCode, cursorPosition) {
        var position = this.getPosition(pseudoCode, "\n", cursorPosition.row) + cursorPosition.column; 
        var cursorIdentifier = "CURSOR_POSITION";
        var pseudoCode = this.insertAt(pseudoCode, position+1, cursorIdentifier);
        var cleanedCode = this.prepare(pseudoCode);
        var segments = this.segment(cleanedCode);
        var activeSegment = segments.find((value) => {
            return value.includes(cursorIdentifier);
        })
        activeSegment = activeSegment.replace(cursorIdentifier,'');
        return activeSegment.substr(0, activeSegment.indexOf("\n"));
        

        
    }

    testActiveChunk() {
var short = 
`Friend
name
skill
`;

var long = 
`Friend
name
skill

Enemy
name
skill
`;

        //this.activeChunk(short,{row: 2, column: 3});

        //this.activeChunk(long,{row: 2, column: 3});

        //this.activeChunk(long,{row: 2, column: 0});

        this.activeChunk("",{row: 0, column: 0});
    }

    getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
    }

    insertAt(string, index, stringToInsert) { 
        return string.substr(0, index) + stringToInsert + string.substr(index);
    }

    // Return an array for instance ["car", "user"]]
    manyToManyDefinition(heading) {
        var tables = this.transformedPseudoCode.map((item) => {
            return item.table;
        }).join("|");
        
        var manyToManyRegExp = new RegExp("^(" + tables + ")_(" + tables + ")$");        
        var matches;
        if(matches = manyToManyRegExp.exec(heading)) {
            return [matches[1], matches[2]];
        }
    }

    pushTransformedModel(type, rows, model, table, manyToManyTables) {
        this.transformedPseudoCode.push({
            type: type,
            model: model,
            table: table,
            attributes: rows.slice(1).map((name) => { return new Attribute(name);}),
            migration: "placeholder",
            manyToManyTables: manyToManyTables
        });
        this.transformedPseudoCode.sort(function(a, b){
            if(a.model < b.model) return -1;
            if(a.model > b.model) return 1;
            return 0;
        });                    
        if(this.finished()) {            
            this.returnTransformedModels();        
        }
    }

    finished() {        
        return this.transformedPseudoCode.length == this.segments.length || this.segments.length == 0;
    }

    returnTransformedModels() {
        typeof this.callback === 'function' && this.callback(this);
    }

    all() {
        return this.transformedPseudoCode;
    }

    models() {
        return this.transformedPseudoCode.filter((item) => {
            return item.type == "model";
        });
    }
    
    pureTables() {
        return this.transformedPseudoCode.filter((item) => {
            return item.type == "table";
        });
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
        code = code.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "");
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