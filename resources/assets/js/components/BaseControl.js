import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setParameters} from '../actions/index';
import {openLog} from '../actions/index';
import {setQueue} from '../actions/index';

export default class BaseControl extends Component {
	constructor(props) {
        super(props)
        Modal.setAppElement('#main')
        this.state = {}
    }

	render() {
		return this.controlBarItem()
	}

	renderModal() {
		return (
			<Modal
	            isOpen={this.state.modalIsOpen}
	            onAfterOpen={this.afterOpenModal.bind(this)}
	            onRequestClose={this.closeModal.bind(this)}
	            contentLabel="Example Modal"
	            overlayClassName="no-overlay"
	            className="control-modal"
			>

				<div className="stim-modal-container">
					<div className="stim-modal-header">
						 <h4>{this.title}</h4>
					</div>

					<div className="stim-modal-body">
						 {this.modalBody()}
					</div>

					<div className="stim-modal-footer">
						{this.modalFooter()}
					</div>
				</div>
            </Modal>
		)
    }

	controlBarItem() {
        return (
            <span onClick={this.openModal.bind(this)} className="control-bar-item">
                <i title="Set parameters" className={"fa " + this.icon + " icon-control-bar"}></i><span className="control-bar-item-text">{this.title}</span>
                {this.renderModal()}
            </span>
        )
    }

	defaultFooter() {
        return(
            <button onClick={this.closeModal.bind(this)} className="btn modal-buttons-style">
                Done
            </button>
        )
    }

	openModal() {
        this.setState({
            modalIsOpen: true,
        });
        // Prevent focus bug
        this.props.engine.diagramModel.setLocked(true);
    }

    afterOpenModal() {
        //
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            message: null
        });

        // Prevent focus bug
        this.props.engine.diagramModel.setLocked(false);
    }

	static mapStateToProps(state) {
	    return {
	        engine: state.engine,
	        foo: state.foo,
	        parameters: state.parameters,
			queue: state.queue
	    };
	}

	static matchDispatchToProps(dispatch){
	    return bindActionCreators(
	        {
	            openLog: openLog,
	            setQueue: setQueue
	        }, dispatch);
	}
}
