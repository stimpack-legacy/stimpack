import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { ManipulatorNodeModel } from "../../storm/ManipulatorNodeModel";
import AllManipulators from "../../storm/AllManipulators";

class AddManipulator extends Component {
    constructor(props) {
        super(props);
        Modal.setAppElement('#main');
        this.state = {};        
    }

    render() {        
        return (
            <span onClick={this.openModal.bind(this)}>
                <i title="Add manipulator" className="fa fa-plus icon-control-bar"></i>    
                {this.renderModal()}
            </span>
        );
    }

    addManipulator(event) {        
        let { engine } = this.props;		
        let model = engine.getDiagramModel();
        
        var node = new ManipulatorNodeModel({ 
            name: event.target.value
        });
        node.x = 500;
        node.y = 350;
        model.addNode(node);

        this.closeModal();
        this.props.forceUpdateCallback();
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
                {this.renderManipulators()}                    
            </Modal>
        );
    }

    renderManipulators() {
        return Object.values(AllManipulators).map((manipulator) => {
            return (
                <div key={manipulator.getDefaultManipulatorParameters().name}>
                    <button value={manipulator.getDefaultManipulatorParameters().name} onClick={this.addManipulator.bind(this)} className="btn btn-light add-manipulator-button">
                        {manipulator.getDefaultManipulatorParameters().name}
                    </button>
                </div>
            )
        })
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
        engine: state.engine,
        foo: state.foo 
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
)(AddManipulator);