import migration from './templates/migration';
import model from './templates/model';
import pseudoPlaceholder from './templates/pseudoPlaceholder';
import phpPlaceholder from './templates/phpPlaceholder';
import helpPlaceholder from './templates/helpPlaceholder';
import makeAuthPseudoCode from './templates/makeAuthPseudoCode';

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
            table: transformedModel.table
        }
    }

    static model(transformedModel) {
        if(!transformedModel) {
            return false;
        }        
        return {
            body: model,
            table: transformedModel.table
        }
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


}