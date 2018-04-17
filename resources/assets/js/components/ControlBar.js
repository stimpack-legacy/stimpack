import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { ManipulatorNodeModel } from "../storm/ManipulatorNodeModel";
import Search from "./controls/Search";
import AddManipulator from "./controls/AddManipulator";
import Run from "./controls/Run";
import Log from "./controls/Log";
import Save from "./controls/Save";
import {navigate} from '../actions/index'

class ControlBar extends Component {
    constructor(props) {
        super(props);
        Modal.setAppElement('#main');
        this.state = {};        
    }

    render() {        
        return (
            <div id="controlBar" className="controlBar">            
                <span className="heading-app-name">LARAVEL <i className="fa fa-2x fa-syringe"></i> STIMPACK</span>                
                {this.renderButtons()}
                {this.renderAddManipulatorModal()}
                {this.renderLogModal()}
                
            </div>
        );
    }

    renderAddManipulatorModal() {
        return (
            <Modal
            isOpen={this.state.addManipulator}
            onRequestClose={this.closeModal.bind(this)}
            contentLabel="Example Modal"
            overlayClassName="no-overlay"
            className="settings-modal small"
            value="addManipulator"
            >                
                <h4>Choose manipulator</h4>
                <div className="form-group">                
                    <select className="form-control">
                        <option>Create</option>
                        <option>CreateDatabase</option>
                    </select>
                </div>
                <div className="container settings-modal-buttons">                    
                    <button className="btn btn-stimpack" onClick={this.closeModal.bind(this)}>Close</button>
                </div>                    
            </Modal>
        );
    }

    renderLogModal() {
        return (
            <Modal
            isOpen={this.state.log}
            onRequestClose={this.closeModal.bind(this)}
            contentLabel="Example Modal"
            overlayClassName="no-overlay"
            className="settings-modal small"
            value="log"
            >                
                <h4>Choose manipulator</h4>
                <div className="form-group">                
                    <select className="form-control">
                        <option>Create</option>
                        <option>CreateDatabase</option>
                    </select>
                </div>
                <div className="container settings-modal-buttons">                    
                    <button className="btn btn-stimpack" onClick={this.closeModal.bind(this)}>Close</button>
                </div>                    
            </Modal>
        );        
    }

    renderButtons() {
        //{/* <i className="fa fa-refresh fa-spin log-pending icon"></i> */}
        return (
            <wrapper>            
                <Run />
                <AddManipulator />
                <Log />
                <Save />
                <span>
                    <i title="Share this pack to stimpack.io" className="fa fa-upload icon-control-bar"></i>
                </span>                                                                
                <Search />
            </wrapper>
        );
    }

    navigate(event) {
        this.props.navigate(event.currentTarget.dataset.value);
    }

    save() {
        console.log(JSON.stringify(this.props.engine.diagramModel.serializeDiagram(), null, 4));        
    }

    openModal(event) {
        var stateToSet = {};
        stateToSet[event.target.value] = true

        this.setState(stateToSet);
    }
    
    closeModal(event) {
        var stateToSet = {};
        stateToSet[event.target.value] = false

        this.setState(stateToSet);
    }    
}

function mapStateToProps(state) {
    return {
        engine: state.engine,
        foo: state.foo 
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            navigate: navigate
        }, dispatch);
}

export default connect(
    mapStateToProps, 
    matchDispatchToProps
)(ControlBar);