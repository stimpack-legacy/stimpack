import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index'
import BaseTask from '../BaseTask'

class CreateDatabase extends BaseTask {

    body() {
        return (
            <select value={this.props.tasks.CreateDatabase.type} onChange={this.changeDatabaseType.bind(this)} className="form-control" id="inputGroupSelect01">                                                  
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
            name: "CreateDatabase",
            enabled: true,
            type: "sqlite"
        };        
    }    
}

export default connect(BaseTask.mapStateToProps, BaseTask.matchDispatchToProps)(CreateDatabase);