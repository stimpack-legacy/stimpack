import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Log extends Component {
    componentDidMount() {
        this.setup();
    }

    render() {
        return (
        <div className="buttons"> 
            <div className="container">                             
                <div className="card">
                    <div className="card-header">
                        <h4> <i className="fa fa-check-circle"></i> Log</h4>
                    </div>
                    <div className="card-body">                        
                        <i className="fa fa-exclamation-circle"></i>
                        <br />                                                                                                
                        <div id="log-wrapper">
                            <div id="log-editor" />
                        </div>
                    </div>
                </div>
            </div>      
        </div>
        );
    }
    
    setup() {
        var log = ace.edit("log-editor");
        log.setTheme("ace/theme/monokai");
        log.getSession().setMode({
            path: "ace/mode/sh",
            inline: true
        });        
        log.setShowPrintMargin(false);
        log.renderer.setShowGutter(false);
                
        log.setValue(this.props.log,1);
    }

    refreshLog() {        
        var log = ace.edit("log-editor");
        // In order for editor not to overwrite itself... :O
        setTimeout(function() {
            log.setValue(this.props.log,1);
        }.bind(this),10);
        //var Range = ace.require('ace/range').Range;
        //log.session.addMarker(new Range(2, 0, 1000, 1), "logError", "fullLine");
    }

    componentWillReceiveProps(nextProps){
        if(this.props.log != nextProps.log) {
            this.refreshLog();
        }
    }    
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        pseudoCode: state.pseudoCode,
        tasks: state.tasks,
        log: state.log
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(Log);
