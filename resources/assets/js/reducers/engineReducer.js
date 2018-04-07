import {
	DiagramEngine,
	DiagramModel,
	DefaultNodeModel,
	LinkModel,
	DefaultPortModel,
	DiagramWidget
} from "storm-react-diagrams";
import * as React from "react";

// import the custom models
import { ManipulatorNodeModel } from "../storm/ManipulatorNodeModel";
import { ManipulatorNodeFactory } from "../storm/ManipulatorNodeFactory";

function defaultEngine() {
	//1) setup the diagram engine
	var engine = new DiagramEngine();
	engine.installDefaultFactories();

	// register some other factories as well
	engine.registerNodeFactory(new ManipulatorNodeFactory());

	//2) setup the diagram model
	var model = new DiagramModel();

	//3-A) create a default node
	var node1 = new ManipulatorNodeModel({ 
		path: "/home/anders/Code/something-new",
		name: "Create"
	});
	var port0 = node1.addInPort(" ");
	var port1 = node1.addOutPort(" ");
	node1.setPosition(100, 150);

	//3-B) create our new custom node
	var node2 = new ManipulatorNodeModel({
		force: true,
		name: "CreateDatabase"
	});

	var port2 = node2.addInPort(" ");
	node2.setPosition(350, 150);

	//3-C) link the 2 nodes together
	var link = port1.link(port2);


	//4) add the models to the root graph
	//model.addAll(node1, node2, link);

	//5) load model into engine
	engine.setDiagramModel(model);

	// Prevent delete model on text edits
	//model.setLocked(true);
	return engine;
}



export default function (state = defaultEngine(), action) {
	
	if(action.type == "UPDATE_DIAGRAM_ENGINE") {
		state = Object.assign({}, action.payload);
	}

    return state;
}