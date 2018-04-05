import { ManipulatorNodeModel } from "./ManipulatorNodeModel";
import AllManipulators from "./AllManipulators"
import * as React from "react";
//import ManipulatorNodeWidget from "./ManipulatorNodeWidget";
import { DiagramEngine } from "storm-react-diagrams";
import { AbstractNodeFactory } from "storm-react-diagrams";

export class ManipulatorNodeFactory extends AbstractNodeFactory {
	constructor() {
		super("manipulator");
	}

	generateReactWidget(diagramEngine, node) {
		var element = AllManipulators[node.state.manipulator.name];
		return React.createElement(element, {
			node: node,
			diagramEngine: diagramEngine
		});
	}	

	getNewInstance(initialConfig) {		
		return new ManipulatorNodeModel();
	}
}