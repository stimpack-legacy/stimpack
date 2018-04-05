import { DefaultPortModel } from "storm-react-diagrams";
import { Toolkit } from "storm-react-diagrams";
import * as _ from "lodash";

import { NodeModel } from "storm-react-diagrams";

export class ManipulatorNodeModel extends NodeModel {

	constructor(manipulator){
		super("manipulator");
		this.state = {
			manipulator
		};
	}

	addInPort(label) {
		return this.addPort(new DefaultPortModel(true, Toolkit.UID(), label));
	}

	addOutPort(label) {
		return this.addPort(new DefaultPortModel(false, Toolkit.UID(), label));
	}

	deSerialize(object, engine) {
		super.deSerialize(object, engine);
		// fix manipulator
		this.name = object.name;
	}

	serialize() {		

		return _.merge(super.serialize(), {			
			manipulator: this.state.manipulator
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