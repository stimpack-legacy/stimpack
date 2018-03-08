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
        var matchedRuleKey = Object.keys(this.rules()).find((rule) => (new RegExp(rule)).test(name));
        if(typeof matchedRuleKey !== "undefined") {
            return this.rules()[matchedRuleKey](name);
        }

        return false;
    }

    default(name) {
        return "$table->string('" + name + "');"
    }

    rules() { 
        return {
            // One to Many explicit
            "_id$": function(name) {
                var definition = "$table->integer('" + name + "')->unsigned();";
                definition += " " + "$table->foreign('" + name + "')->references('id')->on('" + name.slice(0, name.length -3) + "s')->onDelete('cascade');";
                return definition
            },            
            // Time columns
            "(time|date|_at)$": function(name) {
                return "$table->timestamp('" + name + "');";
            },
            // Boolean
            "^(has_|is_|got_)": function(name) {
                return "$table->boolean('" + name + "')->default(false);";
            },
        };                        
    }

    fillable() {
        return ![
            "created_at",
            "updated_at",
            "id"
        ].includes(this.name);
    }

    hidden() {
        return [
            "password",
            "remember_token"
        ].includes(this.name);
    }


}