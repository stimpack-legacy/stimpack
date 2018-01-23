import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTask} from '../../actions/index'

class CreateDatabaseTask extends Component {
    componentDidMount() {
        console.log(this.props.tasks[0].enabled);
    }

    render() {
        return (
            <div className="container">                              
                <div className="card">
                    <div className="card-header">
                        <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id="switch-id" checked={this.props.tasks[0].enabled} onChange={this.enableTask.bind(this)} />
                            <label htmlFor="switch-id">Create Database</label>                    
                        </span>
                    </div>
                    <div className="card-body">                                            
                        <select className="form-control" id="inputGroupSelect01">                      
                            <option value="volvo" disabled selected>Select database type</option>
                            <option value="sqlite">Sqlite</option>
                            <option value="mysql" disabled>MySQL</option>
                            <option value="postgres" disabled>PostgreSQL</option>
                        </select>                       
                        </div>
                </div>                
            </div>
        );
    }
    enableTask() {
        //console.log(this.props.tasks[0].enabled);

        var extracted = this.props.tasks;
        var updatedTasks = this.props.tasks;
        updatedTasks[0].enabled = !updatedTasks[0].enabled;
        this.props.updateTask(updatedTasks);
        //console.log(this.props.tasks[0].enabled);
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
    return bindActionCreators({updateTask: updateTask}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(CreateDatabaseTask);


/*

*/