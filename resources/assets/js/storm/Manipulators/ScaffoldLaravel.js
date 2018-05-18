import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class ScaffoldLaravel extends BaseManipulator {

    static getDefaultManipulatorParameters() {
        return {
            name: "ScaffoldLaravel",
            pseudoCode: ""
        }
    }

    renderSettings() {
        return (
            <div>               
                <Tabs>
                    <TabList>
                        <Tab><h4>PseudoCode</h4></Tab>
                        <Tab><h4>Stubs</h4></Tab>
                        <Tab><h4>Settings</h4></Tab>
                        <Tab><h4>Result</h4></Tab>
                    </TabList>

                    <TabPanel>
                        <div className="form-group code-text-area">
                            <textarea rows="20" name="pseudoCode" placeholder="Some Code Here..." value={this.state.data.pseudoCode} type="text" className="form-control" onChange={this.setDataParameter.bind(this)} />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="form-group code-text-area">
                            <textarea rows="20" name="pseudoCode" placeholder="Some Code Here..." value={this.state.data.pseudoCode} type="text" className="form-control" onChange={this.setDataParameter.bind(this)} />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <p> This is some settings for you to change </p>
                    </TabPanel>
                    <TabPanel>
                    <div className="form-group code-text-area">
                        <textarea rows="20" name="pseudoCode" placeholder="Some Code Here..." value={this.state.data.pseudoCode} type="text" className="form-control" onChange={this.setDataParameter.bind(this)} />
                    </div>
                    </TabPanel>
                </Tabs>
                <button onClick={this.preview} >See preview!</button>
            </div>
        );
    }

    preview() {
        console.log("Sending request!");
        $.ajax({
            type: "POST",
            url: "/manipulators/ScaffoldLaravel/preview",
            data: {
                data: JSON.stringify({
                    pseudoCode: "Car",
                    context: {
                        targetProjectName: ""
                    }
                }),
            },
            success: function(result){
                console.log("Success!", result);

            }.bind(this),
            error: function(error) {
                console.log("Failiure!", error);
            }.bind(this)
        });
    }
}

export default connect(
    BaseManipulator.mapStateToProps,
    BaseManipulator.matchDispatchToProps
)(ScaffoldLaravel);
