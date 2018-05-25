import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { ManipulatorNodeModel } from "../../storm/ManipulatorNodeModel";
import AllManipulators from "../../storm/AllManipulators";
import {reDrawDiagram} from '../../actions/index';
import {registerLatestNode} from '../../actions/index';
import Queue from "../../Queue";
import {nonCircularStringify} from "../../Helpers";
import Compiler from "../../Compiler";
import BaseControl from "../BaseControl";

class Save extends BaseControl {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            description: "",
            message: null
        }
        this.title = "Save",
        this.icon = "fa-save"
    }

    modalBody() {
        return (
            <wrapper>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input placeholder="new-pack" value={this.state.name} onChange={this.changeName.bind(this)} type="text" className="form-control" id="name" />
                </div>
                <div className="form-group m-b-sm">
                    <label htmlFor="description">Description</label>
                    <textarea  placeholder="What does it do?" value={this.state.description} onChange={this.changeDescription.bind(this)} type="textarea" className="form-control save-description" id="description" />
                </div>
                {this.renderMessage()}
            </wrapper>
        )
    }

    modalFooter() {
        return (
            <wrapper>
                <button onClick={this.save.bind(this)} className="btn modal-buttons-style">
                    Save locally
                </button>
                <button onClick={this.upload.bind(this)} className="btn modal-buttons-style">
                    Upload to stimpack.io
                </button>
                <button onClick={this.closeModal.bind(this)} className="btn button-cancel modal-buttons-style">
                    Close
                </button>
            </wrapper>
        )
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
            url: "/save/" + this.state.name,
            data: {
                name: this.state.name,
                description: this.state.description,
                content: nonCircularStringify({
                    diagram: this.props.engine.diagramModel.serializeDiagram(),
                    compiled: compiled,
                    parameters: JSON.parse(this.props.parameters)
                }, null, 4)
            },
            success: function(result){
                this.setState({
                    message: "Succesfully stored pack!"
                })
                console.log(result);
            }.bind(this),
            error: function(error) {
                this.setState({
                    message: "Could not store!"
                })
                //var a = JSON.parse(error);
                console.log("Failed with message: '" + error.responseJSON.message + "'");
            }.bind(this)
        })
    }

    upload() {
        var compiler = new Compiler(this.props.engine);
        var compiled = compiler.compile();
        $.ajax({
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("stimpack-io-token", data.stimpack_io_token);
            },
            url: data.stimpack_data_url + "/packs/upload/",
            data: {
                name: this.state.name,
                description: this.state.description,
                content: nonCircularStringify({
                    diagram: this.props.engine.diagramModel.serializeDiagram(),
                    compiled: compiled,
                    parameters: JSON.parse(this.props.parameters)
                }, null, 4)
            },
            success: function(result){
                this.setState({
                    message: "Succesfully uploaded pack!"
                })
                console.log(result);
            }.bind(this),
            error: function(error) {
                this.setState({
                    message: "Could not upload pack!"
                })
                console.log(error);
            }.bind(this)
        })
    }
}

export default connect(
    BaseControl.mapStateToProps,
    BaseControl.matchDispatchToProps
)(Save);
