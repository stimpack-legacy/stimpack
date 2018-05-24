import * as React from "react";
import {connect} from 'react-redux';
import BaseStarterManipulator from "../BaseStarterManipulator";

import {epicNewName} from '../../epicNewName.js'

class Create extends BaseStarterManipulator {

    static getDefaultManipulatorParameters() {
        return {
            name: "Create",
            targetProjectName: epicNewName(),
            isStarter: true,
            provider: "Laravel"
        }
    }

    renderSettings() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="provider">Provider</label>                
                    <select name="provider" onChange={this.setDataParameter.bind(this)} value={this.state.data.targetProjectName} className="form-control" id="inputGroupSelect01">
                        <option key="laravel-as-a-zip" value="laravel-as-a-zip">Laravel</option>
                        <option disabled key="Django" value="Django">Django</option>
                        <option disabled key="Express<" value="Express<">Express</option>
                        <option disabled key="Ruby-on-rails" value="Ruby-on-rails">Ruby-on-rails</option>
                    </select>
                </div>
                <div className="form-group">                
                    <label htmlFor="provider">Target project name</label>
                    <input name="targetProjectName" size="40" value={this.state.data.targetProjectName} onChange={this.setDataParameter.bind(this)} type="text" className="form-control" />
                </div>
            </div>
        );
    }

}

export default connect(
    BaseStarterManipulator.mapStateToProps,
    BaseStarterManipulator.matchDispatchToProps
)(Create);
