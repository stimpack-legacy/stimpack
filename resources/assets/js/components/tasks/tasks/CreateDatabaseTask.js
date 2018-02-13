import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index'
import BaseTask from '../BaseTask'

class CreateDatabaseTask extends BaseTask {
    componentDidMount() {
    }

    render() {
        return (
            <div className="container">                              
                <div className="card">
                    <div className="card-header">
                        <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id="CreateDatabaseTask-switch" checked={this.props.tasks.CreateDatabaseTask.enabled} onChange={this.enableTask.bind(this)} />
                            <label htmlFor="CreateDatabaseTask-switch">Create Database</label>                    
                        </span>
                    </div>
                    <div className="card-body">                                            
                        <select value={this.props.tasks.CreateDatabaseTask.type} onChange={this.changeDatabaseType.bind(this)} className="form-control" id="inputGroupSelect01">                                                  
                            <option value="mysql" >MySQL</option>
                            <option value="sqlite">Sqlite</option>
                            <option value="postgres">PostgreSQL</option>
                        </select>                       
                        </div>
                </div>                
            </div>
        );
    }

    changeDatabaseType(e) {
        var updatedTasks = this.props.tasks;
        updatedTasks.CreateDatabaseTask.type = e.target.value;
        this.props.updateTasks(updatedTasks);        
    }

    static getDefaultParameters() {
        return {
            taskName: "CreateDatabaseTask",
            enabled: true,
            type: "sqlite"
        };        
    }    
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        pseudoCode: state.pseudoCode,
        tasks: state.tasks
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({updateTasks: updateTasks}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(CreateDatabaseTask);


/*

*/