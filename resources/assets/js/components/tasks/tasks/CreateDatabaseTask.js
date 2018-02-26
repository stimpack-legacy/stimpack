import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index'
import BaseTask from '../BaseTask'

class CreateDatabaseTask extends BaseTask {

    body() {
        return (
            <select value={this.props.tasks.CreateDatabaseTask.type} onChange={this.changeDatabaseType.bind(this)} className="form-control" id="inputGroupSelect01">                                                  
            <option value="mysql" disabled>MySQL</option>
            <option value="sqlite">Sqlite</option>
            <option value="postgres" disabled>PostgreSQL</option>
            </select>
        );
    }

    changeDatabaseType(e) {
        var updatedTasks = this.props.tasks;
        updatedTasks.CreateDatabaseTask.type = e.target.value;
        this.props.updateTasks(updatedTasks);        
    }

    static getDefaultParameters() {
        return {
            name: "CreateDatabaseTask",
            enabled: true,
            type: "sqlite"
        };        
    }    
}

export default connect(BaseTask.mapStateToProps, BaseTask.matchDispatchToProps)(CreateDatabaseTask);