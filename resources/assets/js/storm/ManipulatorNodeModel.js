import { DefaultPortModel } from "storm-react-diagrams";
import { Toolkit } from "storm-react-diagrams";
import * as _ from "lodash";

import { NodeModel } from "storm-react-diagrams";


/**
 * @author Dylan Vorster
 */
export class ManipulatorNodeModel extends NodeModel {

	constructor(name){
		super("manipulator");
		this.name = name;		
	}

	addInPort(label) {
		return this.addPort(new DefaultPortModel(true, Toolkit.UID(), label));
	}

	addOutPort(label) {
		return this.addPort(new DefaultPortModel(false, Toolkit.UID(), label));
	}

	deSerialize(object, engine) {
		super.deSerialize(object, engine);
		this.name = object.name;
	}

	serialize() {
		return _.merge(super.serialize(), {
			name: this.name,
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