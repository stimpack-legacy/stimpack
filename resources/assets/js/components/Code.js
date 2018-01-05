import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ModelTransformer from '../ModelTransformer';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updatePseudoCode} from '../actions/index'

class Code extends Component {
    componentDidMount() {
        this.setup();        
    }

    render() {
        return (
            <div>
                <div className="input-panel">
                    Tables
                </div>            
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
export default connect(mapStateToProps, matchDispatchToProps)(Code);
