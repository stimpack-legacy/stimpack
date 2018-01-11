import migration from './templates/migration';
import model from './templates/model';

export default class Template {
    static migration() {
        return Template.replace(migration, {"Model": "Monkey"});
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