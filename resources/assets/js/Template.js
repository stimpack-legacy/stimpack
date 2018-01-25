import migration from './templates/migration';
import model from './templates/model';

export default class Template {
    static migration(transformedModels) {
        if(transformedModels.length < 1) {
            return "";
        }
        console.log(transformedModels);
        var result = migration;
        result = Template.replace(result, {"$MIGRATION-CLASS-NAME$": "Create" + transformedModels[0].table.charAt(0).toUpperCase() + transformedModels[0].table.slice(1) + "Table"});
        result = Template.replace(result, {"$TABLE-NAME$": transformedModels[0].table});        
        result = Template.replace(result, {"$COLUMNS$": transformedModels[0].attributes[0]});
        return result;
    }

    static model() {
        return Template.replace(model, {"Model": "Monkey"});
    }
    
    static replace(template, replacementPairs) {
        for(var key in replacementPairs) {
            template = template.replace(key,replacementPairs[key]);            
        }
        return template;
    }
}