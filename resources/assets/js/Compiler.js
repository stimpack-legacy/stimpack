export default class Compiler {
    constructor(engine) {
        this.engine = engine;
    }

    compile() {        
        // compile sequences
        var sequences = this.starters().map((starter) => {
            return this.compileNode(starter);                        
        });

        // attach context (starter) to each manipulator in sequence
        sequences.forEach(sequence => {
            var starter = sequence[0];
            sequence.forEach(manipulator => {
                var context = Object.assign({}, starter.data);
                delete context["context"]; // Avoid circular context
                manipulator.data.context = context;               
            });
        });

        // flatten
        var compiled = this.flatten(sequences).map(manipulator => {
            return manipulator.data;
        });
        return compiled;
    }

    compileNode(node) {
        var sequence = [node];
        // Assume only one output port at this stage
        var out = node.getOutPorts()[0];
        // Execution order determined by node y, then x.            
        var links = this.sortLinks(Object.values(out.links));
        var directChildren = links.map(link => {
            return link.targetPort.parent;
        });
        var allChildren = directChildren.map(child => {
            return this.compileNode(child);
        });
        sequence = this.flatten(sequence.concat(allChildren));
        
        return sequence;       
    }

    flatten(a) {
        return a.reduce((f,i)=>f.concat(Array.isArray(i)?this.flatten(i):[i]),[]);
    }

    starters() {
        return Object.values(this.engine.diagramModel.nodes).filter((node) => {
            return node.isStarter();
        }).sort((first, second) => {
            if(first.y < second.y) {
                return -1;
            }
        
            if(first.y > second.y) {
                return 1;
            }
        
            if(first.x < second.x) {
                return -1;
            }
        
            if(first.x > second.x) {
                return 1;
            }            
        });
    }
    
    globalParameters() {
        return Object.values(this.engine.diagramModel.nodes).find((node) => {
            return node.isGlobalParametersNode();
        }).data.globalParameters;        
    }

    sortLinks(links) {
        return links.sort((first, second) => {
            if(first.points[1].y < second.points[1].y) {
                return -1;
            }
        
            if(first.points[1].y > second.points[1].y) {
                return 1;
            }
        
            if(first.points[1].x < second.points[1].x) {
                return -1;
            }
        
            if(first.points[1].x > second.points[1].x) {
                return 1;
            }
        })        
    }    
}