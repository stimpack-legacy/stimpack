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




function engineWithLoadedModel() {
	//1) setup the diagram engine
	var engine = new DiagramEngine();
	engine.installDefaultFactories();

	// register some other factories as well
	engine.registerNodeFactory(new ManipulatorNodeFactory());

	//2) setup the diagram model
	var model = new DiagramModel();
	
	model.deSerializeDiagram(data.pack.content.diagram, engine);
	engine.setDiagramModel(model);
	return engine;	
}


function defaultEngine() {
	//1) setup the diagram engine
	var engine = new DiagramEngine();
	engine.installDefaultFactories();

	// register some other factories as well
	engine.registerNodeFactory(new ManipulatorNodeFactory());

	//2) setup the diagram model
	var model = new DiagramModel();

	var latestNode = new ManipulatorNodeModel({ 
		name: "Create"
	});
	latestNode.addInPort(" ");
    latestNode.addOutPort(" ");

	latestNode.setPosition(300, 300);
	//model.addNode(latestNode);

	var node = new ManipulatorNodeModel({ 
		name: "CreateDatabase"
	});
	node.addInPort(" ");
    node.addOutPort(" ");	

	node.setPosition(500+Math.random()*100, 350+Math.random()*100);
	//model.addNode(node);

	if(latestNode) {
		var fromPort = latestNode.getOutPorts()[0];
		var toPort = node.getInPorts()[0];
		var link = fromPort.link(toPort);

		//model.addAll(link);		
	}


	//4) add the models to the root graph
	//model.addAll(node1, node2, link);

	//5) load model into engine
	engine.setDiagramModel(model);

	// Prevent delete model on text edits
	//model.setLocked(true);
	return engine;
}

//console.log(defaultEngine());
//console.log(engineWithLoadedModel());



function getEngine() {
	if(!(typeof data.pack == "undefined")) {
		return engineWithLoadedModel();
	}

	return defaultEngine();
}


export default function (state = getEngine(), action) {
//export default function (state = engineWithLoadedModel(), action) {
	
	if(action.type == "UPDATE_DIAGRAM_ENGINE") {
		state = Object.assign({}, action.payload);
	}

    return state;
}