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
        body = Template.blockReplace(body, "$COLUMNS$",
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
        body = Template.blockReplace(body, "$MASS-ASSIGNABLE-ATTRIBUTES$",
        transformedModel.attributes.filter((attribute) => {
            return attribute.fillable();
        }).map((attribute) => {
            return "'" + attribute.name + "',";
        }),2);        

        // Add hidden array
        body = Template.blockReplace(body, "$HIDDEN-ATTRIBUTES$",
        transformedModel.attributes.filter((attribute) => {
            return attribute.hidden();
        }).map((attribute) => {
            return "'" + attribute.name + "',";
        }),2);
        
        // Add relationships        
        body = Template.blockReplace(body, "$BELONGS-TO-RELATIONSHIPS$",
            transformedModel.belongsToRelationships.map((relationshipModel) => {
                return belongsToRelationship.replace("$OWNER$", relationshipModel.name)
                                            .replace("$CLASS$", relationshipModel.name);
            }),2
        );        
        
        //Template.newReplace(body, "$BELONGS-TO-RELATIONSHIPS$", belongsToRelationship);

        //$HAS-MANY-RELATIONSHIPS$
        
        //$BELONGS-TO-MANY-RELATIONSHIPS$




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

    static blockReplace(template, marker, items, tabsBeforeItem) {      
        var block = "";
        items.forEach((item) => {
            block += " ".repeat(tabsBeforeItem*4) + item + "\n";
        })
        var replacementPairs = {};
        replacementPairs[marker] = block.replace(/\n$/, "");
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

    static newReplace(body, marker, content) {
        // content == array
            // WAIT
        
        if(typeof content == 'string') {
            body = body.replace(marker, content);
            body = body.replace("\n", "\n\t\t");
        }    
        return body;
        // content == string
            // content is multiline
                // insert tabs at beggining of each new line
    }









}