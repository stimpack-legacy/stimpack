import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ModelTransformer from '../../ModelTransformer';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updatePseudoCode} from '../../actions/index'

class CreateMigrationsTask extends Component {
    componentDidMount() {
        this.setup();
        //this.test();        
    }

    test() {
        var modelTransformer = new ModelTransformer();        
        modelTransformer.transform("", function(phpCode) {
            console.assert(phpCode == "", {"message": "failed empty string"});                
        }.bind(this));                        
    }

    render() {
        return (
            <div className="container">                              
            <div className="card">
                <div className="card-header">
                    <span className="switch switch-sm">
                        <input type="checkbox" className="switch" id="switch-id" checked onChange={this.enableTask} />
                        <label htmlFor="switch-id">Create Migrations</label>                    
                    </span>
                </div>
                <div className="card-body">                    
                    <div id="pseudo-wrapper">
                        <div>
                            <ul>
                                <li><a href="#">Input</a></li>
                            </ul>
                        </div>
                        <div id="pseudo-editor" />
                    </div>
                    <div id="php-wrapper">
                        <div>
                            <ul>
                                <li><a href="#home">User</a></li>                                                                                                                                                                                               
                        </ul>
                        </div>

                        <div id="php-editor" />
                    </div>                                
                </div>
            </div>                
            </div>
        );
    }
    
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
            this.props.updatePseudoCode(pseudoCode);
            var modelTransformer = new ModelTransformer();
            modelTransformer.transform(pseudoCode, function(phpCode) {
                php.setValue(phpCode, 1);                
            }.bind(this));
        }.bind(this));
        var defaultTables = "";
        defaultTables += "User\nname\nemail\password\nrememberToken\ntimestamps\n\n";
        defaultTables += "password_resets\nemail\ntoken\created_at\n";        
        pseudo.setValue(defaultTables,1);
    }
    
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        pseudoCode: state.pseudoCode
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators({updatePseudoCode: updatePseudoCode}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(CreateMigrationsTask);






