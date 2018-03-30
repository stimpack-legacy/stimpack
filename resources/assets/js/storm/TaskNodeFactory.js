import { TaskNodeModel } from "./TaskNodeModel";
import * as React from "react";
import TaskNodeWidget from "./TaskNodeWidget";
import { DiagramEngine } from "storm-react-diagrams";
import { AbstractNodeFactory } from "storm-react-diagrams";
/**
 * @author Dylan Vorster
 */
export class TaskNodeFactory extends AbstractNodeFactory<TaskNodeModel> {
	constructor() {
		super("task");
	}

	generateReactWidget(diagramEngine, node) {
		return React.createElement(TaskNodeWidget, {
			node: node,
			diagramEngine: diagramEngine
		});
	}

	getNewInstance(initialConfig) {
		return new TaskNodeModel();
	}
}