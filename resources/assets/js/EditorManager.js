import ModelTransformer from './ModelTransformer';

export default class EditorManager {
    constructor() {}

    setup() {
        var pseudo = ace.edit("pseudo-editor");
        pseudo.setTheme("ace/theme/monokai");
        pseudo.getSession().setMode({
            path: "ace/mode/php",
            inline: true
        });        
        pseudo.setShowPrintMargin(false);
        pseudo.renderer.setShowGutter(false);        
        
        var php = ace.edit("php-editor");
        php.setTheme("ace/theme/monokai");
        php.getSession().setMode({
            path: "ace/mode/php",
            inline: true
        });        
        php.setShowPrintMargin(false);
        php.renderer.setShowGutter(false);        
        pseudo.getSession().on('change', function() {
            var pseudoCode = pseudo.getSession().getValue();
            php.setValue(this.transform(pseudoCode), 1)
        }.bind(this));
        var defaultTables = "";
        defaultTables += "User\nname\nemail\password\nrememberToken\ntimestamps\n\n";
        defaultTables += "password_resets\nemail\ntoken\created_at\n";        
        pseudo.setValue(defaultTables,1);
    }

    transform(pseudoCode) {
        return (new ModelTransformer(pseudoCode)).transform();
    }
    
    test() {
        var pseudoCode = "";
        return (new ModelTransformer(pseudoCode)).test();
    }

}