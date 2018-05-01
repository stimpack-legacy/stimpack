import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { ManipulatorNodeModel } from "../../storm/ManipulatorNodeModel";
import AllManipulators from "../../storm/AllManipulators";
import {reDrawDiagram} from '../../actions/index'
import {registerLatestNode} from '../../actions/index'

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

        node.addPorts();
        
        node.setPosition(100+Math.random()*100, 100+Math.random()*100);
        model.addNode(node);
        
        var latestNode = model.nodes[this.props.latestNode];
        if(latestNode) {
            node.setPosition(latestNode.x+200, latestNode.y);
            setTimeout(function() {                
                if(node.isNormal() && !latestNode.isIndependent) {
                    var fromPort = latestNode.getOutPorts()[0]; // Assume 1 port only
                    var toPort = node.getInPorts()[0]; // Assume 1 port only
                    var link = fromPort.link(toPort);            
                    model.addAll(link);                    
                    this.props.reDrawDiagram(Date.now());
                }
            }.bind(this), 0);
        }

        this.props.registerLatestNode(node.id);
        this.props.reDrawDiagram(Date.now());
        if (!event.shiftKey) {
            this.closeModal();
        }
    }


    renderModal() {
        return (
            <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal.bind(this)}
            onRequestClose={this.closeModal.bind(this)}
            contentLabel="Example Modal"
            overlayClassName="no-overlay"
            className="manipulator-modal small"
            >
                {this.renderStarters()}
                <hr />                
                {this.renderManipulators()}             
            </Modal>
        );
    }

    renderStarters() {
        return Object.values(AllManipulators).filter(manipulator => {
                return Boolean(manipulator.getDefaultManipulatorParameters().isStarter);
            }).map((manipulator) => {
            return (
                <div key={manipulator.getDefaultManipulatorParameters().name}>
                    <button value={manipulator.getDefaultManipulatorParameters().name} onClick={this.addManipulator.bind(this)} className="btn btn-light add-manipulator-button">
                        {manipulator.getDefaultManipulatorParameters().name}
                    </button>
                </div>
            )
        })
    }

    renderManipulators() {
        return Object.values(AllManipulators).filter(manipulator => {
                return !Boolean(manipulator.getDefaultManipulatorParameters().isStarter);
            }).map((manipulator) => {
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
        latestNode: state.latestNode 
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            reDrawDiagram: reDrawDiagram,
            registerLatestNode: registerLatestNode
        }, dispatch);
}

export default connect(
    mapStateToProps, 
    matchDispatchToProps
)(AddManipulator);