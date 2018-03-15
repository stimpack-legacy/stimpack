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
                {/*
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
                */}
            </div>
        );
    }

    perform(taskIndex = 0) {
        
        if(taskIndex == 0) {
            console.log("DOWN");
            console.log(this.props.taskBatch.tasks);        
            console.log("UP");
        }
        this.props.taskBatch.startRequested = false;
        
        
        if(taskIndex >= this.props.taskBatch.tasks.length) {
            this.props.taskBatch.busy = false;
            this.props.taskBatch.presentSiteUrl = "http://" + this.props.tasks.SetTargetProjectTask.projectName + ".test";
            this.props.updateTaskBatch(this.props.taskBatch);            
            return;
        }        
        var task = this.props.taskBatch.tasks[taskIndex];
        task.status = "pending";        
        this.props.updateTaskBatch(this.props.taskBatch);
        var cache = [];
        $.ajax({
            type: "POST",
            url: "/stimpack/perform/" + task.name,
            data: {
                tasks: JSON.stringify(this.props.taskBatch.tasks, function(key, value) {
                    if (typeof value === 'object' && value !== null) {
                        if (cache.indexOf(value) !== -1) {
                            // Circular reference found, discard key
                            return;
                        }
                        // Store value in our collection
                        cache.push(value);
                    }
                    return value;
                })
            },
            success: function(result){
                console.log("Finished " + task.name, result);
                task.status = "succeded";
                this.props.updateTaskBatch(this.props.taskBatch);
                this.perform(taskIndex+1);
            }.bind(this),
            error: function(error) {
                console.log("ERROR", error.responseText);
                task.status = "failed";
                this.props.updateTaskBatch(this.props.taskBatch);
            }.bind(this)
        });
        cache = null; // Enable garbage collection
    }    

    

    stim() {
        this.props.resetTaskBatch({
            tasks: Object.values(this.props.tasks).filter(task => task.enabled).map(task => {
                task.status = "queued";
                return task;
            }),
            busy: true,
            startRequested: true,
            presentSiteUrl: false
        });        
    }

    componentDidUpdate(prevProps, prevState) {        
        if(this.props.taskBatch.busy != prevProps.taskBatch.busy && this.props.taskBatch.startRequested) {
             this.perform(); 
        }
     }    
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks,
        taskBatch: state.taskBatch
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
