import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";

class CreateDatabase extends BaseManipulator {
	constructor(props) {
        super("srd-default-node", props);        
        this.state = {};
        this.state = {
            data: CreateDatabase.getDefaultManipulatorParameters()
        }        
        this.props.node.data = this.state.data;
    }
    
    static getDefaultManipulatorParameters() {
        return {
            name: "CreateDatabase",
            path: "/home/anders/Code/something-new",
            lolid: Math.floor(Math.random()*100)                                    
        }
    }    

    renderSettings() {        
        return (
            <div className="container">
                <h4>Create Database {this.state.data.lolid}</h4>
                <div className="form-group">
                    <select className="form-control" id="inputGroupSelect01">                                                  
                        <option value="mysql" >MySQL</option>
                        <option value="sqlite">Sqlite</option>
                        <option value="postgres">PostgreSQL</option>
                    </select>
              </div>
            </div>
        );
    }
}

export default connect(
    BaseManipulator.mapStateToProps, 
    BaseManipulator.matchDispatchToProps
)(CreateDatabase);