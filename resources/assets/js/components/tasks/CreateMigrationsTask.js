import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ModelTransformer from '../../ModelTransformer';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updatePseudoCode} from '../../actions/index';
import {updateTask} from '../../actions/index';

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
                        <input type="checkbox" className="switch" id="CreateMigrationsTask-switch" checked={this.props.tasks.CreateMigrationsTask.enabled} onChange={this.enableTask.bind(this)} />
                        <label htmlFor="CreateMigrationsTask-switch">Create Migrations</label>                    
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
                    
                    <button className="btn btn-default btn-cool">make:auth</button>
                </div>
                
            </div>                
            </div>
        );
    }

    enableTask() {
        var updatedTasks = this.props.tasks;
        updatedTasks.CreateMigrationsTask.enabled = !updatedTasks.CreateMigrationsTask.enabled; // ^= 1
        this.props.updateTask(updatedTasks);
    }

    updatePseudoCode(pseudoCode) {
        var updatedTasks = this.props.tasks;
        updatedTasks.CreateMigrationsTask.pseudoCode = pseudoCode;
        this.props.updateTask(updatedTasks);        
    }

    setup() {
        var pseudo = ace.edit("pseudo-editor");
        pseudo.$blockScrolling = Infinity;
        pseudo.setTheme("ace/theme/monokai");
        pseudo.getSession().setMode({
            path: "ace/mode/php",
            inline: true
        });        
        pseudo.setShowPrintMargin(false);
        pseudo.renderer.setShowGutter(false);        
        
        var php = ace.edit("php-editor");
        php.$blockScrolling = Infinity;
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
            this.updatePseudoCode(pseudoCode);
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
        pseudoCode: state.pseudoCode,
        tasks: state.tasks        
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            updatePseudoCode: updatePseudoCode,
            updateTask: updateTask
        }, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(CreateMigrationsTask);






