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
import {nonCircularStringify} from "../../Helpers";

class Save extends Component {
    constructor(props) {
        super(props);
        Modal.setAppElement('#main');
        this.state = {};        
    }

    render() {        
        return (
            <span onClick={this.openModal.bind(this)}>
                <i title="Save this pack" className="far fa-save icon-control-bar"></i>
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
                <h4>Save as a pack</h4>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" />
                </div>
                <button onClick={this.save.bind(this)} className="btn btn-light">
                    Save
                </button>                
                <button onClick={this.closeModal.bind(this)} className="btn btn-light">
                    Cancel
                </button>                        
            </Modal>
        );
    }

    save() {
        console.log(nonCircularStringify(this.props.engine.diagramModel.serializeDiagram(), null, 4));        
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

}

function mapStateToProps(state) {
    return {
        engine: state.engine
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
)(Save);