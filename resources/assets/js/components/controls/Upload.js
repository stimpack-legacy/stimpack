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
import Compiler from "../../Compiler"

class Upload extends Component {
    constructor(props) {
        super(props);
        Modal.setAppElement('#main');
        this.state = {
            name: "new-awesome-project"
        };        
    }
    
    render() {        
        return (
            <span onClick={this.openModal.bind(this)}>
                <i title="Share this pack to stimpack.io" className="fa fa-upload icon-control-bar"></i>
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
                <h4>Upload pack to stimpack.io</h4>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={this.state.name} onChange={this.changeName.bind(this)} type="text" className="form-control" id="name" />
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

    changeName(event) {
        this.setState({
            name: event.target.value
        });
    }

    save() {
        var compiler = new Compiler(this.props.engine);
        var compiled = compiler.compile();
        $.ajax({
            type: "POST",
            url: "/save/" + this.state.name + ".json",
            data: {
                fileContent: nonCircularStringify({
                    // Used to redraw the diagram
                    diagram: this.props.engine.diagramModel.serializeDiagram(),
                    // Used to run the pack from command line
                    compiled: compiled
                }, null, 4)
            },
            success: function(result){
                console.log(result);
            },
            error: function(error) {
                //var a = JSON.parse(error);
                console.log("Failed with message: '" + error.responseJSON.message + "'");
            }
        });                
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
)(Upload);