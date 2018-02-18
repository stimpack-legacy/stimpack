import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Log extends Component {
    render() {
        return (
            <div className="logItems">                
                <ul>
                    {this.renderTaskBatchItems()}                                
                </ul>

                {this.renderSiteUrl()}
            </div>
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
            return (<li key={task.taskName}><i className={`fa ${icons[task.status]}`}></i> {task.taskName}</li>)
        })
    }

    renderSiteUrl() {
        if(this.props.taskBatch.presentSiteUrl) {
            return (<a className="siteUrlLink" target="_blank" href={this.props.taskBatch.presentSiteUrl}> {this.props.taskBatch.presentSiteUrl}</a>);
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
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Log);
