import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Inputs from './Inputs';
import Log from './Log';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateLog} from '../actions/index'
import {updateTaskBatch} from '../actions/index';
import {resetTaskBatch} from '../actions/index';

class Generator extends Component {
    render() {
        return (
            <div className="generator container">
                <Inputs />
                <div className="buttons">
                    <div className="container">
                        <hr />
                        <div className="card ready-to-roll-out">
                            <div className="card-header">
                                <h4 className="ready-to-roll-out">Ready to roll out?</h4>
                            </div>
                            <div className="card-body ready-to-roll-out">
                                <Log />
                                <button onClick={this.stim.bind(this)} className="btn btn-primary btn-cool">Stim!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    performTasks(taskIndex = 0) {
        var count = 0;
        for (var taskName in this.props.tasks) {
            var localTaskName = taskName;
            if (this.props.tasks.hasOwnProperty(localTaskName)) {
                if(count == taskIndex && this.props.tasks[localTaskName].enabled) {
                    console.log("Performing ", localTaskName + "!");
                    // Set the weels to spin!!!
                    $.ajax({
                        type: "POST",
                        url: "/stimpack/perform/" + localTaskName,
                        data: {
                            tasks: JSON.stringify(this.props.tasks)
                        },
                        success: function(result){
                            // write to log
                            //this.props.updateLog(result);
                            console.log("Success running task " + localTaskName + "! Message: " + result);
                            this.performTasks(taskIndex+1);
                        }.bind(this),
                        error: function(error) {
                            console.log("ERROR", error);
                            //this.props.updateLog(`Ops! there was some kind of error!`);
                            //this.props.updateLog(error.responseJSON.message);
                            //this.props.updateLog("Halting any further tasks.");
                        }.bind(this)
                    });
                }
            }
        }
    }

    stim() {
        this.props.resetTaskBatch({
            tasks: Object.values(this.props.tasks).filter(task => task.enabled).map(task => {
                task.status = "queued";
                return task;
            }),
            busy: true
        });
        
        //this.performTasks();
    }


}

function mapStateToProps(state) {
    return {
        tasks: state.tasks
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        updateLog: updateLog,
        resetTaskBatch: resetTaskBatch,
        updateTaskBatch: updateTaskBatch    
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Generator);
