import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { ManipulatorNodeModel } from "../storm/ManipulatorNodeModel";
import Search from "./controls/Search";
import AddManipulator from "./controls/AddManipulator";
import Run from "./controls/Run";

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
                
            </div>
        );
    }

    renderAddManipulatorModal() {
        return (
            <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal.bind(this)}
            onRequestClose={this.closeModal.bind(this)}
            contentLabel="Example Modal"
            overlayClassName="no-overlay"
            className="settings-modal small"
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
                <AddManipulator forceUpdateCallback={this.props.forceUpdateCallback.bind(this)} />
                <span onClick={this.addManipulator}>
                    <i title="Remove all manipulators" className="far fa-trash-alt icon-control-bar"></i>
                </span>
                <span onClick={this.save.bind(this)}>
                    <i title="Save this pack" className="far fa-save icon-control-bar"></i>
                </span>
                <span onClick={this.addManipulator}>
                    <i title="Share this pack to stimpack.io" className="fa fa-upload icon-control-bar"></i>
                </span>
                <Search />
            </wrapper>
        );
    }

    addManipulator() {
        
        var manipulatorToAdd = "Create";
        let { engine } = this.props;		
        let model = engine.getDiagramModel();
        
        var node = new ManipulatorNodeModel({ 
            path: "/home/anders/Code/something-new",
            name: "Create"
        });
        node.x = 500;
        node.y = 350;
        model.addNode(node);

        this.props.forceUpdateCallback();
    }

    save() {
        console.log(JSON.stringify(this.props.engine.diagramModel.serializeDiagram(), null, 4));        
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
)(ControlBar);