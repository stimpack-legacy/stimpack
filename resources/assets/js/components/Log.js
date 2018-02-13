import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Log extends Component {
    render() {
        return (                
            <ul>
                {/*                        
                <li><i className="fa fa-check-circle log-ok"></i> Some task</li>
                <li><i className="fa fa-check-circle log-ok"></i> Another task</li>
                <li><i className="fa fa-exclamation-circle log-error"></i> Some failded task!</li>
                <li><i className="fa fa-refresh fa-spin log-pending"></i> Some pending task!</li>
                */}
                {this.renderTaskBatchItems()}            
            </ul>
        );
    }

    renderTaskBatchItems() {
        var icons = {
            "queued": "fa-refresh fa-spin log-pending",
            "pending": "fa-refresh fa-spin log-pending",
            "succeded": "fa-check-circle log-ok",
            "failed": "fa-exclamation-circle log-error"
        }

        return this.props.taskBatch.tasks.filter(task => task.status != "queued" ).map((task) => {
            return (<li key={task.taskName}><i className={`fa ${icons[task.status]}`}></i> Some task</li>)
        })
    }
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks,
        taskBatch: state.taskBatch
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Log);
