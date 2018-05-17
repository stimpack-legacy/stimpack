import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setParameters} from '../../actions/index';


class Parameters extends Component {
    constructor(props) {
        super(props);
        Modal.setAppElement('#main');
        this.state = {};
    }

    render() {
        return (
            <span onClick={this.openModal.bind(this)} className="header-menu-item">
                <i title="Set parameters" className="fa fa-wrench icon-control-bar icon-control-bar"></i><span className="header-menu-item-text">Parameters</span>
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
            className="manipulator-modal"
            >
                <h4>Set global parameters</h4>
                <hr />
                <div className="form-group">
                    <textarea placeholder="content" value={this.props.parameters} onChange={this.setParameters.bind(this)} type="text" className="form-control parameters-code" />
                </div>
                <div className="modal-footer modal-buttons">
                    <button onClick={this.closeModal.bind(this)} className="btn modal-buttons-style">
                        Done
                    </button>
                </div>
            </Modal>
        );
    }

    setParameters(event) {
        this.props.setParameters(event.target.value);
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
        this.setState({modalIsOpen: false});

        // Prevent focus bug
        this.props.engine.diagramModel.setLocked(false)
    }
}

function mapStateToProps(state) {
    return {
        engine: state.engine,
        parameters: state.parameters
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            setParameters: setParameters
        }, dispatch);
}

export default connect(
    mapStateToProps,
    matchDispatchToProps
)(Parameters);
