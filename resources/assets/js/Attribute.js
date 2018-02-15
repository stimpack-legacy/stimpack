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
            },
            {
                name: "many_to_many",
                test: function(name) {
                    return (new RegExp("(fluent|proficient|proficiency)[^.]*(chinese|mandarin|cantonese)")).test(name);
                    // Above will match "fluent_chinese" - but how grab parts from the regex?
                },
                transform: function(name) {
                    return "many to many is not implemented yet";
                }
            }
        ]

        var matchedRule = rules.find((rule) => rule.test(name));
        if(typeof matchedRule !== "undefined") {
            return matchedRule.transform(name);
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



