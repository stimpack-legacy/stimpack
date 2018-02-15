export default class Attribute {
    constructor(name) {
        this.name = name;
        this.migrationDefinition = this.defineMigrationStatement(name);
    }

    defineMigrationStatement(name) {
        return [
            this.overridden(name), 
            this.reserved(name),
            this.ruled(name),
            "$table->string('" + name + "');"
        ].find((filter) => filter);
    }
       
    overridden(name) {
        // Handle overridden line starting with $
        if(name.charAt(0) == "$") {
            // Save for future reference
            return name;
        }

        // Load previous override rules
        var overrided = {};
        if(overrided.hasOwnProperty(name)) {
            return overrided[name];
        }

        return false;        
    }

    reserved(name) {
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

        return false;        
    }

    ruled(name) {
        var rules = [
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

        return false;
    }
}