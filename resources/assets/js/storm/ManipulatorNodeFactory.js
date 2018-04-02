import { ManipulatorNodeModel } from "./ManipulatorNodeModel";
import * as React from "react";
import ManipulatorNodeWidget from "./ManipulatorNodeWidget";
import { DiagramEngine } from "storm-react-diagrams";
import { AbstractNodeFactory } from "storm-react-diagrams";
/**
 * @author Dylan Vorster
 */
export class ManipulatorNodeFactory extends AbstractNodeFactory {
	constructor() {
		super("manipulator");
	}

	generateReactWidget(diagramEngine, node) {
		return React.createElement(ManipulatorNodeWidget, {
			node: node,
			diagramEngine: diagramEngine
		});
	}

	getNewInstance(initialConfig) {
		return new ManipulatorNodeModel();
	}
}