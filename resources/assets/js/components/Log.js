import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class Log extends Component {
    
    render() {                
        return (
            <div className="logItems">                
                <ul>
                    {this.renderLogItems()}
                    {this.renderPendingItems()}                                                                        
                </ul>
            </div>
        );
    }

    renderLogItems() {
        return this.props.queue.finished.map((item, index) => {
            return( 
                <li key={index}><i className={`fa ${this.icons("succeded")}`}></i> {item.data.name}</li>
            );
        });
    }

    renderPendingItems() {
        if(this.props.queue.pending) {
            return (
                <li key="pending"><i className={`fa ${this.icons("pending")}`}></i> {this.props.queue.pending.data.name}</li>                
            );
        }
    }    

    icons(icon) {
        return {
            "queued": "fa-refresh fa-spin log-pending",
            "pending": "fa-refresh fa-spin log-pending",
            "succeded": "fa-check-circle log-ok",
            "failed": "fa-exclamation-circle log-error"
        }[icon];
    }    
}

function mapStateToProps(state) {
    return {
        queue: state.queue
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Log);
