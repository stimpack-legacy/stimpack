import * as React from "react";
import * as _ from "lodash";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../actions/index'

import { DefaultNodeModel } from "storm-react-diagrams";
import { DefaultPortLabel } from "storm-react-diagrams";
import { DiagramEngine } from "storm-react-diagrams";
import { BaseWidget, BaseWidgetProps } from "storm-react-diagrams";
import Modal from 'react-modal';

Modal.setAppElement('#main')

const customStyles = {
    content : {
        background: "black"
      //top: '20px',
      //left: '20px'
    }
};

class ManipulatorNodeWidget extends BaseWidget {
	constructor(props) {
		super("srd-default-node", props);
		this.state = {};
	}

	generatePort(port) {
		return <DefaultPortLabel model={port} key={port.id} />;
	}

	render() {
		return (
            
			<div onDoubleClick={this.openModal.bind(this)} {...this.getProps()} style={{ background: this.props.node.color }}>
                {this.renderNode()}
                {this.renderSettings()}
			</div>
		);
    }

    renderNode() {
        return (
            <wrapper>
                <div className={this.bem("__title")}>
                    <div className={this.bem("__name")}>{this.props.node.name}</div>
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

    renderSettings() {        
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal.bind(this)}
                onRequestClose={this.closeModal.bind(this)}
                //style={customStyles}
                contentLabel="Example Modal"
                overlayClassName="no-overlay"
                className="settings-modal small"
            >
                <div className="container">
                    <h4>Workspace / Manipulators / Migrate / #13 </h4>
                    <div className="form-group">
                        <label htmlFor="comment">Comment:</label>
                        <textarea className="form-control" rows="5" id="comment"></textarea>
                    </div>
                    <div className="settings-modal-buttons">                    
                        <button className="btn btn-stimpack" onClick={this.closeModal.bind(this)}>Save</button>                                    
                        <button className="btn btn-stimpack" onClick={this.closeModal.bind(this)}>Cancel</button>
                    </div>
                </div>        

            </Modal>
        );
    }

    openModal() {
        this.setState({
            modalIsOpen: true,
        });
    }
    
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
        //var str = JSON.stringify(model.serializeDiagram());
    }
    
    closeModal() {
        this.setState({modalIsOpen: false});
        console.log(JSON.stringify(this.props.diagramEngine.diagramModel.serializeDiagram(), null, 4));        
        
    }     
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks 
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            updateTasks: updateTasks
        }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ManipulatorNodeWidget);