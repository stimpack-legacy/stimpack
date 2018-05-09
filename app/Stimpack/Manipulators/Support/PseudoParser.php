<?php

namespace App\Stimpack\Manipulators\Support;

class PseudoParser
{
    public static function make()
    {
        return new PseudoParser();
    }

    public function parse($text)
    {
        return $this->segment(
            $this->cleanUp($text)
        );        
    }

    private function cleanUp($text)
    {
        // trim preciding newlines
        $text = preg_replace('/^\n+/', '', $text);
        // trim trailing newlines
        $text = preg_replace('/\n+$/', '', $text);
        // remove exessive newlines
        $text = preg_replace('/\n\s+\n/', '', $text);
        // remove comments
        $text = preg_replace('/^\/\/.*$/m', '', $text);
        $text = preg_replace('/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/m', '', $text);
        return $text;        
        
    }

    private function segment($text)
    {
        $parts = preg_split('/\n\s*\n/', $text);
        if($parts[0] == "") {
            return [];
        }
        return $parts;          
    }
}






/*

import Cache from './Cache';

import Template from './Template';
import Attribute from './Attribute';

const MODEL = "MODEL";
const TABLE_ONLY = "TABLE_ONLY";
const MANY_TO_MANY = "MANY_TO_MANY";

export default class PseudoCodeTransformer {
    constructor() {
        this.transformedPseudoCode = [];
        this.shouldReturn = true;        
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
        
        // By convention "Word" with capital starting char corresponds to a model "Word" with table "words". 
        // But "word" is just a table "word" without an associated model. Note - potentially relationship table
        if(heading.charAt(0) == heading.charAt(0).toLowerCase()) {
            this.pushTransformedPseudoCode(this.getTypeForNonModel(heading), rows, heading, heading);
            return;
        }        

        // If no cache present for plural lets get that and save it
        if(Cache.get(heading,"plural") == null) {
            $.ajax({
                url: "/stimpack/pluralize/" + heading,
                success: function(modelPluralized){
                    Cache.set(heading, "plural", modelPluralized);
                    this.pushTransformedPseudoCode(MODEL, rows, heading, modelPluralized);                                        
                }.bind(this)
            });
            return;
        }

        // The segment was a Model with present cache for plural.
        this.pushTransformedPseudoCode(MODEL, rows, heading, Cache.get(heading, "plural"));
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
        var activeBlockHeading = activeSegment.split("\n")[0];
        return activeBlockHeading;
        

        
    }

    getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
    }

    insertAt(string, index, stringToInsert) { 
        return string.substr(0, index) + stringToInsert + string.substr(index);
    }

    // Return an array for instance ["car", "user"]]
    possibleManyToManyDefinition(heading) {
        var models = this.transformedPseudoCode.map((item) => {
            return item.name.toLowerCase();
        }).join("|");
        var manyToManyRegExp = new RegExp("^(" + models + ")_(" + models + ")$");        
        var matches = manyToManyRegExp.exec(heading);
        if(matches) {
            return [matches[1], matches[2]];
        }
    }

    getTypeForNonModel(heading) {
        if (this.possibleManyToManyDefinition(heading)) {
            return MANY_TO_MANY;
        }

        return TABLE_ONLY;
    }

    pushTransformedPseudoCode(type, rows, name, table) {
        this.transformedPseudoCode.push({
            type: type,
            name: name,
            table: table,
            class: name,
            one: name.toLowerCase(),
            many: this.snakeCaseToCamelCase(table),
            attributes: rows.slice(1).map((attribute) => { return new Attribute(attribute);}),
        });
        this.transformedPseudoCode.sort(function(a, b){
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });                    
        if(this.allBlocksFound() && this.shouldReturn) {                        
            this.returnTransformedPseudoCode();        
        }
    }

    allBlocksFound() {        
        return this.transformedPseudoCode.length == this.segments.length || this.segments.length == 0;
    }

    snakeCaseToCamelCase(s){
        return s.replace(/(\_\w)/g, function(m){return m[1].toUpperCase();});
    }

    returnTransformedPseudoCode() {
        this.shouldReturn = false;
        this.addRelationships();
        typeof this.callback === 'function' && this.callback(this);
    }

    all() {
        return this.transformedPseudoCode;
    }

    filter(types) {
        return this.transformedPseudoCode.filter((item) => {
            return types.includes(item.type);
        });        
    }

    models() {
        return this.transformedPseudoCode.filter((item) => {
            return item.type == MODEL;
        });
    }
    
    manyToMany() {
        return this.transformedPseudoCode.filter((block) => {
            return this.possibleManyToManyDefinition(block.name);
        });
    }

    pureTables() {
        return this.transformedPseudoCode.filter((item) => {
            return item.type == TABLE_ONLY;
        });
    }

    definitions(segments) {
        segments.map((segment) => {
            this.define(segment);            
        });
        if(this.allBlocksFound() && this.shouldReturn) {            
            this.returnTransformedPseudoCode();
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

    relationshipAttributeToModel(attribute) {        
        var match = this.models().find((model) => {
            return model.name.toLowerCase() == attribute.name.replace("_id", "").toLowerCase()
        });

        if(match) return match;
        
        return { name: "NO_SUCH_MODEL_FOUND"};
    }

    modelNameStringToModel(modelNameString) {
        var match = this.models().find((model) => {
            return model.name.toLowerCase() == modelNameString.toLowerCase()
        });

        if(match) return match;
        
        return { name: "NO_SUCH_MODEL_FOUND"};        
    }

    isRelationshipAttribute(attribute) {
        return !!(new RegExp("_id$")).test(attribute.name) && this.all().find((model) => {            
            return model.name.toLowerCase() == attribute.name.slice(0, attribute.name.length - 3).toLowerCase();
        });
    }

    addRelationships() {
        this.all().forEach((item) => {            
            item.belongsToRelationships = [];
            item.hasManyRelationships = [];
            item.belongsToManyRelationships = [];            
        });

        this.models().map(this.addOneToManyRelationships.bind(this));
        this.manyToMany().map(this.addManyToManyRelationships.bind(this));
    }

    addManyToManyRelationships(manyToManyPair) {
        var involvedModels = this.possibleManyToManyDefinition(manyToManyPair.name);
        var first = this.modelNameStringToModel(involvedModels[0]);
        var last = this.modelNameStringToModel(involvedModels[1]);
        first.belongsToManyRelationships.push(last);
        last.belongsToManyRelationships.push(first);        
    }

    addOneToManyRelationships(model) {

        // BELONGS TO
        model.belongsToRelationships = model.attributes.filter((attribute) => {
            return this.isRelationshipAttribute(attribute);
        }).map((attribute) => {
            return this.relationshipAttributeToModel(attribute);
        });

        // HAS MANY
        model.belongsToRelationships.forEach((owner) => {
            owner.hasManyRelationships.push(model);
        });

        return model;
    }

    safeSort() {
        return this.all().sort(function(a, b){
            if(a.type == MANY_TO_MANY && b.type != MANY_TO_MANY) {
                return 1;
            }
            if(a.type != MANY_TO_MANY && b.type == MANY_TO_MANY) {
                return -1;
            }            
            if(a.belongsToRelationships.length > b.belongsToRelationships.length) {
                return 1;
            }
            if(a.belongsToRelationships.length < b.belongsToRelationships.length) {
                return -1;
            }            
            return 0;
        });
        
        return sorted;
    }        
}

*/