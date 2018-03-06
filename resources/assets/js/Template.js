import controller from './templates/controller';
import migration from './templates/migration';
import model from './templates/model';
import user from './templates/user';

import pseudoPlaceholder from './templates/pseudoPlaceholder';
import phpPlaceholder from './templates/phpPlaceholder';
import helpPlaceholder from './templates/helpPlaceholder';

import makeAuthPseudoCode from './templates/makeAuthPseudoCode';
import sampleProject from './templates/sampleProject';

import belongsToRelationship from './templates/belongsToRelationship';
import belongsToManyRelationship from './templates/belongsToManyRelationship';
import hasManyRelationship from './templates/hasManyRelationship';

export default class Template {
    static migrations(transformedModels) {
        return transformedModels.map(Template.migration);
    }

    static migration(transformedModel) {
        if(!transformedModel) {
            return false;
        }

        var body = migration;
        body = Template.replace(body, {"$MIGRATION-CLASS-NAME$": "Create" + transformedModel.table.charAt(0).toUpperCase() + transformedModel.table.slice(1) + "Table"});
        body = Template.replace(body, {"$TABLE-NAME$": transformedModel.table});        
        body = Template.listReplace(body, "$COLUMNS$",
            transformedModel.attributes.map((attribute) => {
                return attribute.migrationDefinition;
        }),3);
        return {
            body: body,
            table: transformedModel.table,
            tabName: transformedModel.name
        }
    }
    static models(transformedModels) {
        return transformedModels.map(Template.model);
    }

    static modelTemplate(modelName) {
        if(modelName == "User") return user;
        
        return model;

    }

    static model(transformedModel) {
        if(!transformedModel) {
            return false;
        }
        var body = Template.modelTemplate(transformedModel.name);
        
        // Add Class name
        body = Template.replace(body, {"$MODEL$": transformedModel.name});
        
        // Add fillable array
        body = Template.listReplace(body, "MASS_ASSIGNABLE_ATTRIBUTES",
        transformedModel.attributes.filter((attribute) => {
            return attribute.fillable();
        }).map((attribute) => {
            return "'" + attribute.name + "',";
        }),2);        

        // Add hidden array
        body = Template.listReplace(body, "HIDDEN_ATTRIBUTES",
        transformedModel.attributes.filter((attribute) => {
            return attribute.hidden();
        }).map((attribute) => {
            return "'" + attribute.name + "',";
        }),2);
        

        body = Template.blockReplace(body, "BELONGS_TO_RELATIONSHIPS",
            transformedModel.belongsToRelationships.map((relationshipModel) => {
                return belongsToRelationship.replace("METHOD_NAME", relationshipModel.one)
                                            .replace("CLASS_NAME", relationshipModel.class);
            })
        );

        body = Template.blockReplace(body, "HAS_MANY_RELATIONSHIPS",
            transformedModel.hasManyRelationships.map((relationshipModel) => {
                return hasManyRelationship.replace("METHOD_NAME", relationshipModel.many)
                                            .replace("CLASS_NAME", relationshipModel.class);
            })
        );        
        
        body = Template.blockReplace(body, "BELONGS_TO_MANY_RELATIONSHIPS",
            transformedModel.belongsToManyRelationships.map((relationshipModel) => {
                return belongsToManyRelationship.replace("METHOD_NAME", relationshipModel.many)
                                            .replace("CLASS_NAME", relationshipModel.class);
            })
        );

        // Clean up blank spaces on empty rows
        body = body.replace(new RegExp("^ *\n", "gm"), "\n"); 
        // Replace > 3 newlines
        body = body.replace(new RegExp("([\n]{3,})", "g"), "\n\n");
        // Pretty file ending
        body = body.replace(new RegExp("\n\n}$", "g"), "\n}");

        return {
            body: body,
            table: transformedModel.table,
            tabName: transformedModel.name
        }
    }

    static controllers(transformedModels) {
        return transformedModels.map(Template.controller);
    }

    static controller(transformedModel) {
        if(!transformedModel) {
            return false;
        }        
        return {
            body: controller,
            table: transformedModel.table,
            tabName: transformedModel.name
        }
    }

    static file(type, transformedModel) {
        return this[type](transformedModel);
    }
    
    static replace(template, replacementPairs) {        
        for(var key in replacementPairs) {            
            template = template.replace(new RegExp(key.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'g'),replacementPairs[key]);            
        }
        return template;
    }

    static listReplace(template, marker, items, tabsBeforeItem) {      
        var list = "";
        items.forEach((item) => {
            list += " ".repeat(tabsBeforeItem*4) + item + "\n";
        })
        var replacementPairs = {};
        replacementPairs[marker] = list.replace(/\n$/, "");
        return Template.replace(template, replacementPairs);
    }

    static pseudoPlaceholder() {
        return pseudoPlaceholder;
    }

    static phpPlaceholder() {
        return phpPlaceholder;
    }

    static makeAuthPseudoCode() {
        return makeAuthPseudoCode;
    }

    static sampleProject() {
        return sampleProject;
    }

    static test() {
        var body = Template.blockReplace(model, "BELONGS_TO_RELATIONSHIPS", [belongsToRelationship, belongsToRelationship]);        
        return body;
    }

    static blockReplace(template, marker, items) {
        var matches = RegExp('([ ]*)(' + marker + ')').exec(model)
        var tabsBeforeItem = matches[1].length/4;
        var fullMarker = matches[0];

        var list = "";
        items.forEach((item) => {
            list += " ".repeat(tabsBeforeItem*4) // Initial tabs before block
                 +  item.replace(RegExp('\n','g'), "\n" + " ".repeat(tabsBeforeItem*4)) // Add block indentation zero point
                 + "\n\n"; // spacing to next method
        })
        var replacementPairs = {};
        replacementPairs[fullMarker] = list.replace(/\n$/, "");
        return Template.replace(template, replacementPairs);
    }    







}