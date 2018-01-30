import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Inputs from './Inputs';
import Log from './Log';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateLog} from '../actions/index'

class Generator extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="generator">
                <Inputs />
                <div className="buttons"> 
                    <div className="container">                             
                        <div className="card">
                            <div className="card-header">
                                <h4>Run Tasks!</h4>
                            </div>
                            <div className="card-body">                                                                                                
                                <button onClick={this.stim.bind(this)} className="btn btn-primary btn-cool">Stim!</button>                           
                            </div>
                        </div>
                    </div>      
                </div>
                <Log />                                
            </div>
        );
    }

    performTasks(taskIndex = 0) {
        var count = 0;
        for (var taskName in this.props.tasks) {
            if (this.props.tasks.hasOwnProperty(taskName)) {
                if(count == taskIndex && this.props.tasks[taskName].enabled) {
                    $.ajax({
                        url: "/stimpack/perform/" + taskName,
                        data: { 
                            tasks: JSON.stringify(this.props.tasks) 
                        },                                 
                        success: function(result){
                            // write to log
                            this.props.updateLog(result);
                            this.performTasks(taskIndex+1);
                        }.bind(this),
                        contentType: "application/json",
                        cache: false,
                        error: function(error) {
                            this.props.updateLog(`Ops! there was some kind of error on ${key}!`);
                            this.props.updateLog(error.responseJSON.message);
                            this.props.updateLog("Halting any further tasks.");                    
                        }.bind(this)
                    });                
                }
            }
        }
    }

    stim() {
        this.performTasks();                
    }
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        tasks: state.tasks        
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators({updateLog: updateLog}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(Generator);
