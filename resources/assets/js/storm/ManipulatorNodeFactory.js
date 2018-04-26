import { ManipulatorNodeModel } from "./ManipulatorNodeModel";
import AllManipulators from "./AllManipulators"
import * as React from "react";
import { DiagramEngine } from "storm-react-diagrams";
import { AbstractNodeFactory } from "storm-react-diagrams";

export class ManipulatorNodeFactory extends AbstractNodeFactory {
	constructor() {
		super("manipulator");
	}

	generateReactWidget(diagramEngine, node) {
		console.log(1.5, node.data);
		var element = AllManipulators[node.manipulator.name];
		return React.createElement(element, {
			node: node,
			diagramEngine: diagramEngine
		});
	}	

	getNewInstance(initialConfig) {		
		return new ManipulatorNodeModel();
	}
}