export default class Attribute {
    constructor(name) {
        this.name = name;
        this.migrationDefinition = this.defineMigration(name);
    }


    /*
        PRIORITY ORDER *****************************
        
        Reserved names
            Hardcoded fields like id and timestamps()

        Rules
            Handling rules like foreign keys (*_id)

        Statistics lookup
            Exact matches

        Looser rules
            *time* => DATETIME
            *_at => DATETIME
            etc
            
        Resort to string
            $table->string('name'); 
    */    
    defineMigration(name) {
        return "$table->string('" + name + "');"
    }


}

/*

class Model
class Attribute


m = new Model;
m.attributes[
    Attribute a1 {
        name
        migrationDefinition
    }
    Attribute a2
    ...
]


*/



