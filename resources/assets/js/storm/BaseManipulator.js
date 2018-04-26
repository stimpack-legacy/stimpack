import * as React from "react";
import * as _ from "lodash";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { DefaultNodeModel } from "storm-react-diagrams";
import { DefaultPortLabel } from "storm-react-diagrams";
import { DiagramEngine } from "storm-react-diagrams";
import { BaseWidget, BaseWidgetProps } from "storm-react-diagrams";
import Modal from 'react-modal';
import AllManipulators from "./AllManipulators";

export default class BaseManipulator extends BaseWidget {
	constructor(className, props) {
        super("srd-default-node", props);                
        Modal.setAppElement('#main');        
        this.state = {};
        console.log(2, this.props.node.data);
        if(!(typeof(this.props.node.data) == "object")) {
            this.state.data = AllManipulators[this.constructor.name].getDefaultManipulatorParameters();            
            // attach data to node
            this.props.node.data = this.state.data;
            console.log("Also here.......");
        } else {
            console.log("It makes it in here...");
            this.state.data = this.props.node.data; 
        }        
	}

	generatePort(port) {
		return <DefaultPortLabel model={port} key={port.id} />;
    }

	render() {        
		return (
            
			<div onDoubleClick={this.openModal.bind(this)} {...this.getProps()}>
                {this.renderNode()}
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal.bind(this)}
                    onRequestClose={this.closeModal.bind(this)}
                    contentLabel="Example Modal"
                    overlayClassName="no-overlay"
                    className="settings-modal"
                >                
                    {this.renderSettings()}
                    <div className="container settings-modal-buttons">                    
                        <button className="btn btn-stimpack" onClick={this.closeModal.bind(this)}>Close</button>
                    </div>                    
                </Modal>
			</div> 
		);
    }

    renderNode() {
        return (
            <wrapper>
                
                <div className={this.bem("__title")}>
                    <div className={this.bem("__name")}>{this.props.node.manipulator.name}</div>
                </div>
                <div className={this.bem("__ports")}>
                    <div className={this.bem("__in")}>
                        {_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
                    </div>
                    <div className={this.bem("__out")}>
                        {_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
                    </div>
                </div>
            </wrapper>
        );
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
        this.props.engine.diagramModel.setLocked(false);        
    }

    isStarter() {
        return typeof this.state.isStarter !== 'undefined' && this.state.isStarter;
    }

    manipulator() {
        return this.props.node.state.manipulator;
    }
    
    static mapStateToProps(state) {
        return {
            engine: state.engine,
            foo: state.foo
        };
    }
    
    static matchDispatchToProps(dispatch){
        return bindActionCreators(
            {
                //
            }, dispatch);
    }    
}