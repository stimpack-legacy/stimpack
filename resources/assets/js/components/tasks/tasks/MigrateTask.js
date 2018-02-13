import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index'

class MigrateTask extends Component {
    render() {
        return (
            <div className="container">                              
                <div className="card">
                    <div className="card-header">
                        <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id="MigrateTask-switch" checked={this.props.tasks.MigrateTask.enabled} onChange={this.enableTask.bind(this)} />
                            <label htmlFor="MigrateTask-switch">Migrate</label>                    
                        </span>
                    </div>
                </div>                
            </div>
        );
    }
    enableTask() {
        var updatedTasks = this.props.tasks;
        updatedTasks.MigrateTask.enabled = !updatedTasks.MigrateTask.enabled; // ^= 1
        this.props.updateTasks(updatedTasks);
    }     
}

function mapStateToProps(state) {
    return {
        pseudoCode: state.pseudoCode,
        tasks: state.tasks 
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            updateTasks: updateTasks
        }, dispatch);
}



// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps,matchDispatchToProps)(MigrateTask);


/*

*/