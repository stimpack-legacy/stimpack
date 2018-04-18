import * as React from "react";
import { DefaultPortModel } from "storm-react-diagrams";
import { Toolkit } from "storm-react-diagrams";
import * as _ from "lodash";

import { NodeModel } from "storm-react-diagrams";

export class ManipulatorNodeModel extends NodeModel {

	constructor(manipulator){
		super("manipulator");
		this.manipulator = manipulator;
        //this.addInPort(" ");
        //this.addOutPort(" ");		
	}

	addInPort(label) {
		return this.addPort(new DefaultPortModel(true, Toolkit.UID(), label));
	}

	addOutPort(label) {
		return this.addPort(new DefaultPortModel(false, Toolkit.UID(), label));
	}

    isStarter() {
        return typeof this.data.isStarter !== 'undefined' && this.data.isStarter;
    }	

	deSerialize(object, engine) {
		super.deSerialize(object, engine);
		this.manipulator = object.manipulator;
		this.data = object.data;
	}

	serialize() {		

		return _.merge(super.serialize(), {			
			data: this.data,
			manipulator: this.manipulator
		});
	}

	getInPorts() {
		return _.filter(this.ports, portModel => {
			return portModel.in;
		});
	}

	getOutPorts() {
		return _.filter(this.ports, portModel => {
			return !portModel.in;
		});
	}
}