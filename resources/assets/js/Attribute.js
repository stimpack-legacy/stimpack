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
            this.default(name)
        ].find((filter) => filter);
    }
       
    overridden(name) {
        // Handle overridden line starting with $
        if(name.charAt(0) == "$") {
            // Save for future reference?
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
        var rules = {
            // One to Many explicit
            "_id$": function(name) {
                return "$table->integer('" + name + "')->unsigned()->references('id')->on('" + name.slice(0, -3) + "')->onDelete('cascade');";
            },
            // One to Many implicit guess owner is user
            "^owner$": function(name) {
                return "$table->integer('" + name + "')->unsigned()->references('id')->on('users')->onDelete('cascade');";
            },            
            // Time columns
            "(time|date|_at)$": function(name) {
                return "$table->timestamp('" + name + "');";
            },
            // Boolean
            "^(has_|is_|got_)": function(name) {
                return "$table->boolean('" + name + "');";
            },                        
        }

        var matchedRuleKey = Object.keys(rules).find((rule) => (new RegExp(rule)).test(name));
        if(typeof matchedRuleKey !== "undefined") {
            return rules[matchedRuleKey](name);
        }

        return false;
    }

    default(name) {
        return "$table->string('" + name + "');"
    }
}