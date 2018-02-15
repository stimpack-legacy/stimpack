export default class Attribute {
    constructor(name) {
        this.name = name;
        this.migrationDefinition = this.defineMigrationStatement(name);
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
    defineMigrationStatement(name) {

        // Handle overridden line
        if(name.charAt(0) == "$") {
            // Save for future reference
            return name;
        }

        // Load previous override rules
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

        var rules = [
            
            {
                name: "Long names are mocked!",
                test: function(name) {
                    return name.length > 100;
                },
                transform: function(name) {
                    return name + " is a long name!";
                }
            },
            {
                name: "*_id",
                test: function(name) {
                    return (new RegExp("_id$")).test(name);
                },
                transform: function(name) {
                    return "$table->integer('" + name + "')->unsigned()->references('id')->on('" + name.slice(0, -3) + "')->onDelete('cascade');";
                }
            }
        ]

        var matchedRule = rules.find((rule) => rule.test(name));
        if(typeof matchedRule !== "undefined") {
            return matchedRule.transform(name);
        }


        //"bajs_id": "$table->integer('$NAME')->unsigned()->references('id')->on('*')->onDelete('cascade');"
        
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



