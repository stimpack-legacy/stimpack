import migration from './templates/migration';
import model from './templates/model';

export default class Template {
    static migration(transformedModels) {
        console.log("Length", transformedModels.length);
        if(transformedModels.length < 1) {
            return "";
        }
        return Template.replace(migration, {"$TABLES$": transformedModels[0].model});
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