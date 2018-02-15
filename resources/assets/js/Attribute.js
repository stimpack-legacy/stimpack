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
        var overrided = {};
        if(overrided.hasOwnProperty(name)) {
            return overrided[name];
        }

        var reservedNames = {
            "id": "$table->increments();",
            "timestamps": "$table->timestamps();",
            "timestamps()": "$table->timestamps();",
            "created_at": "$table->timestamp('created_at')->nullable();",
            "email": "$table->string('email')->unique();",
        }
        if(reservedNames.hasOwnProperty(name)) {
            return reservedNames[name];
        }

        var rules = {
            "bajs_id": "$table->integer('$NAME')->unsigned()->references('id')->on('*')->onDelete('cascade');"
        }
        if(rules.hasOwnProperty(name)) {
            return rules[name];
        }        

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



