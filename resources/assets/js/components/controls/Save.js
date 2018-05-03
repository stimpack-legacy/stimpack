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

class Save extends Component {
    constructor(props) {
        super(props);
        Modal.setAppElement('#main');
        this.state = {
            name: "",
            description: "",
            message: null
        };        
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
                <hr />
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input placeholder="new-pack" value={this.state.name} onChange={this.changeName.bind(this)} type="text" className="form-control" id="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea rows="4" placeholder="What does it do?" value={this.state.description} onChange={this.changeDescription.bind(this)} type="textarea" className="form-control" id="description" />
                </div>
                {this.renderMessage()} 
                <div className="modal-buttons">                
                    <button onClick={this.save.bind(this)} className="btn btn-light">
                        Save locally
                    </button>
                    <button onClick={this.upload.bind(this)} className="btn btn-light">
                        Upload to stimpack.io
                    </button>                                
                    <button onClick={this.closeModal.bind(this)} className="btn btn-light">
                        Cancel
                    </button>
                </div>                                       
            </Modal>
        );
    }

    renderMessage() {
        if(this.state.message != null)  {
            return (
                <div className="messageBox">
                    <p className="message"><b>{this.state.message}</b></p>
                </div>
            );
        }
    }

    changeName(event) {
        this.setState({
            name: event.target.value
        });
    }

    changeDescription(event) {
        this.setState({
            description: event.target.value
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
                    name: this.state.name,
                    created: (new Date(Date.now()).toLocaleString()),
                    // Used to redraw the diagram
                    diagram: this.props.engine.diagramModel.serializeDiagram(),
                    // Used to run the pack from command line
                    compiled: compiled,
                    parameters: JSON.parse(this.props.parameters)
                }, null, 4)
            },
            success: function(result){
                this.setState({
                    message: "Succesfully stored pack!"
                });
                console.log(result);
            }.bind(this),
            error: function(error) {
                this.setState({
                    message: "Could not store!"
                });                
                //var a = JSON.parse(error);
                console.log("Failed with message: '" + error.responseJSON.message + "'");
            }.bind(this)
        });                
    }
    
    upload() {        
        var compiler = new Compiler(this.props.engine);
        var compiled = compiler.compile();
        $.ajax({
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("stimpack-io-token", data.stimpack_io_token);
            },
            url: "http://data.stimpack.test/packs/upload/",
            data: {
                name: this.state.name,
                description: this.state.description,
                fileContent: nonCircularStringify({
                    name: this.state.name,
                    description: this.state.description,
                    created: (new Date(Date.now()).toLocaleString()),
                    // Used to redraw the diagram
                    diagram: this.props.engine.diagramModel.serializeDiagram(),
                    // Used to run the pack from command line
                    compiled: compiled,
                    parameters: JSON.parse(this.props.parameters)
                }, null, 4)
            },
            success: function(result){
                this.setState({
                    message: "Succesfully uploaded pack!"
                });                
                console.log(result);
            }.bind(this),
            error: function(error) {
                this.setState({
                    message: "Could not upload pack!"
                });
                //console.log("Failed with message: '" + error.responseJSON.message + "'");
            }.bind(this)
        });                
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
            //
        }, dispatch);
}

export default connect(
    mapStateToProps, 
    matchDispatchToProps
)(Save);