import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../actions/index'

export default class BaseTask extends Component {
    enableTask() {
        this.task().enabled ^= 1;
        this.props.updateTasks(this.props.tasks);
    }

    render() {
        return this.renderTask()
    }    
    
    renderTask() {
        return (
            <div className="container">                              
                <div className="card">
                    <div className="card-header">
                        <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id={this.switch()} checked={this.task().enabled} onChange={this.enableTask.bind(this)} />
                            <label htmlFor={this.switch()}>{this.task().name}</label>                    
                        </span>
                    </div>
                    <div className="card-body">                    
                        {this.body()}
                    </div>                
                </div>                
            </div>
        );        
    }

    task() {
        return this.props.tasks[this.constructor.name];
    }

    switch() {
        return this.task().name + '-switch';
    }

    static mapStateToProps(state) {
        return {
            tasks: state.tasks 
        };
    }
    
    static matchDispatchToProps(dispatch){
        return bindActionCreators(
            {
                updateTasks: updateTasks
            }, dispatch);
    }    
}