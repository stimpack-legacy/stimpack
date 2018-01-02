import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EditorManager from '../EditorManager';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updatePseudoCode} from '../actions/index'

class Code extends Component {
    componentDidMount() {
        var editors = new EditorManager;
        editors.setup();
        editors.test();
        setTimeout( function() {
            this.props.updatePseudoCode(1235711);        
        }.bind(this), 3500);        
    }

    render() {
        return (
            <div>
                <div className="input-panel">
                    Models & Migrations
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
