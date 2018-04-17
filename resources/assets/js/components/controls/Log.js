import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { ManipulatorNodeModel } from "../../storm/ManipulatorNodeModel";
import AllManipulators from "../../storm/AllManipulators";
import {reDrawDiagram} from '../../actions/index'
import {registerLatestNode} from '../../actions/index'
import Queue from "../../Queue";

class Log extends Component {
    constructor(props) {
        super(props);
        Modal.setAppElement('#main');
        this.state = {};        
    }

    render() {        
        return (
            <span onClick={this.openModal.bind(this)}>
                <i title="View log" className="fa fa-align-left icon-control-bar"></i>    
                {this.renderModal()}
            </span>
        );
    }

    renderModal() {
        return (
            <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal.bind(this)}
            onRequestClose={this.closeModal.bind(this)}
            contentLabel="Example Modal"
            overlayClassName="no-overlay"
            className="manipulator-modal medium"
            >
                <div className="logItems">                
                    <ul>
                        {this.renderLogItems()}
                        {this.renderPendingItems()}
                        {this.renderFailedItems()}
                    </ul>
                </div>
                <button onClick={this.closeModal.bind(this)} className="btn btn-light">
                    Close
                </button>                                    
            </Modal>
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

    renderFailedItems() {
        if(this.props.queue.failed) {
            return (
                <li key="failed"><i className={`fa ${this.icons("failed")}`}></i> {this.props.queue.failed.data.name}</li>                
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

    openModal() {
        this.setState({
            modalIsOpen: true,
        });
    }
    
    afterOpenModal() {
        // 
    }
    
    closeModal() {
        this.setState({modalIsOpen: false});        
    }
    
    componentWillReceiveProps(nextProps) {
        if(!_.isEqual(this.props.queue, nextProps.queue)) {            
            // React/redux cant save classes - recreate it.
            var queue = Queue.deSerialize(nextProps.queue);
            if(queue.isAboutToRun()) {
                this.setState({
                    modalIsOpen: true,
                });
            }

        }
    }
}

function mapStateToProps(state) {
    return {
        queue: state.queue
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            //
        }, dispatch);
}

export default connect(
    mapStateToProps, 
    matchDispatchToProps
)(Log);