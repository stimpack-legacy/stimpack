import { DefaultPortModel } from "storm-react-diagrams";
import { Toolkit } from "storm-react-diagrams";
import * as _ from "lodash";

import { NodeModel } from "storm-react-diagrams";


/**
 * @author Dylan Vorster
 */
export class TaskNodeModel extends NodeModel {

	constructor(name: string = "Untitled", color: string = "rgb(0,192,255)") {
		super("task");
		this.name = name;
		this.color = color;
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
		this.color = object.color;
	}

	serialize() {
		return _.merge(super.serialize(), {
			name: this.name,
			color: this.color
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