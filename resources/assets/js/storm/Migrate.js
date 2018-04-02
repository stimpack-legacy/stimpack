import * as React from "react";
import { DefaultPortModel } from "storm-react-diagrams";
import { Toolkit } from "storm-react-diagrams";
import * as _ from "lodash";

import { ManipulatorNodeModel } from "./ManipulatorNodeModel";


/**
 * @author Dylan Vorster
 */
export default class Migrate extends ManipulatorNodeModel {

	constructor(name){
		super("manipulator");
		this.name = name;		
    }

    renderSettings() {        
        return (
                <div className="container">
                    <h4>M I G R A T E </h4>
                    <div className="form-group">
                        <label htmlFor="comment">With flags:</label>
                        <textarea className="form-control" rows="5" id="comment"></textarea>
                    </div>
                </div>
        );
    }        
}