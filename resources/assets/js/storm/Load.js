import * as React from "react";
import { DefaultPortModel } from "storm-react-diagrams";
import { Toolkit } from "storm-react-diagrams";
import * as _ from "lodash";

import { ManipulatorNodeModel } from "./ManipulatorNodeModel";


/**
 * @author Dylan Vorster
 */
export default class Load extends ManipulatorNodeModel {

	constructor(name){
		super("manipulator");
		this.name = name;		
    }
    
    renderSettingsX() {
        console.log(this);        
        return 123;
    }

    renderSettings() {        
        return (
                <div className="container">
                    <h4>Workspace / Manipulators / Migrate / #13 </h4>
                    <div className="form-group">
                        <label htmlFor="comment">Comment:</label>
                        <textarea className="form-control" rows="5" id="comment"></textarea>
                    </div>
                </div>
        );
    }        
}

/*
    renderSettings() {        
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal.bind(this)}
                onRequestClose={this.closeModal.bind(this)}
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
*/