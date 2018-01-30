import migration from './templates/migration';
import model from './templates/model';
import pseudoPlaceholder from './templates/pseudoPlaceholder';

export default class Template {
    static migrations(transformedModels) {
        return transformedModels.map(Template.migration);
    }

    static migration(transformedModel) {
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

    static model() {
        return Template.replace(model, {"Model": "Monkey"});
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


}