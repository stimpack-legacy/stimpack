import * as React from "react";
import { DefaultPortModel } from "storm-react-diagrams";
import { Toolkit } from "storm-react-diagrams";
import * as _ from "lodash";
import AllManipulators from "./AllManipulators";

import { NodeModel } from "storm-react-diagrams";

export class ManipulatorNodeModel extends NodeModel {

	constructor(manipulator){
		super("manipulator");
		this.manipulator = manipulator;
	}

	addInPort(label) {
		return this.addPort(new DefaultPortModel(true, Toolkit.UID(), label));
	}

	addOutPort(label) {
		return this.addPort(new DefaultPortModel(false, Toolkit.UID(), label));
	}
	addPorts() {
		if(this.isIndependent()) {
			return;
		}

		if(this.isStarter()) {
			this.addOutPort(' ');
			return;
		}

		this.addInPort(' ');
		this.addOutPort(' ');

	}


    isStarter() {
        return AllManipulators[this.manipulator.name].getDefaultManipulatorParameters().isStarter;
	}
	
	isIndependent() {
		return AllManipulators[this.manipulator.name].getDefaultManipulatorParameters().isIndependent;
	}

	isNormal() {
		return (!this.isStarter()) && (!this.isIndependent())
	}

	deSerialize(object, engine) {
		super.deSerialize(object, engine);
		this.manipulator = object.manipulator;
		this.data = object.data;
		console.log(1, this.data);
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