import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tabs from './Tabs';
import Tab from './Tab';
import Editors from './Editors';
import Actions from './Actions';

export default class Workspace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                { name: "help", content: "", active: true }
            ]
        };
    }

    getInitialState() {
        return {
            tabs: [
                { name: "help", content: "", active: true }
            ]
        }
    }

    getActiveTab() {
        return this.state.tabs.find(tab => tab.active);
    }

    render() {
        return (
            <div>
                <Editors content={this.getActiveTab().content} />                
                <div className="container">
                    <div className="panel-group" id="accordion">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" href="#collapse1">
                                Migrations</a>
                            </h4>
                            </div>
                            <div id="collapse1" className="panel-collapse collapse">
                            <div className="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.</div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                            <h4 className="panel-title">
                                <div className="checkbox">
                                    <label><input type="checkbox" value="" />
                                        <a data-toggle="collapse" href="#collapse2">Controllers</a>
                                    </label>
                                </div>                                
                                
                            </h4>
                            </div>
                            <div id="collapse2" className="panel-collapse collapse">
                            <div className="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.</div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" href="#collapse3">
                                Configuration</a>
                            </h4>
                            </div>
                            <div id="collapse3" className="panel-collapse collapse">
                            <div className="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.</div>
                            </div>
                        </div>
                    </div>
                </div>                
                <Actions />
            </div>
        );
    }
}