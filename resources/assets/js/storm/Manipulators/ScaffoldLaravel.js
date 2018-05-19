import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/php';
import 'brace/theme/monokai';


class ScaffoldLaravel extends BaseManipulator {
	constructor(props) {
        super(props);
        // Note the distinction keys directly on state are just for component managment
        // The data for the actual processing is stored on this.state.data.<key>
        // A
        this.state.selectedStub = Object.keys(data.manipulatorData.ScaffoldLaravel.stubs).find(()=>true)
	}

    static getDefaultManipulatorParameters() {
        return {
            name: "ScaffoldLaravel",
            pseudoCode: "",
            stubs: data.manipulatorData.ScaffoldLaravel.stubs,
            targetProjectName: "bajsy"
        }
    }
   
    renderSettings() {
        return (
            <div>               
                <Tabs>
                    <TabList>
                        <Tab><h6>PseudoCode</h6></Tab>
                        <Tab><h6>Stubs</h6></Tab>
                        <Tab><h6>Settings</h6></Tab>
                        <Tab><h6>Result</h6></Tab>
                    </TabList>

                    {this.renderPseudoCodePanel()}
                    {this.renderStubsPanel()}
                    {this.renderSettingsPanel()}
                    {this.renderResultPanel()}
                </Tabs>                
            </div>
        );
    }
    

    renderPseudoCodePanel() {
        return (
            <TabPanel>
                <div className="form-group code-text-area">
                    <textarea rows="5" name="pseudoCode" placeholder="Some Code Here..." value={this.state.data.pseudoCode} type="text" className="form-control" onChange={this.setDataParameter.bind(this)} />
                </div>
            </TabPanel>
        )
    }

    renderStubsPanel() {
        return (
            <TabPanel>
                {this.renderStubSelect()}
                {this.renderStubEditor()}
            </TabPanel>                
        )
    }

    renderStubSelect() {
        console.log(this.state.selectedStub + "<---");
        return (
            <select name="stubToEdit" value={this.state.selectedStub} onChange={this.changeSelectedStub.bind(this)} className="form-control">
                {Object.keys(this.state.data.stubs).map((stubName, index) => {
                    return (
                        <option key={stubName} value={stubName}> {stubName} </option>
                    )
                })}    
            </select>            
        )
    }

    renderStubEditor() {
        return (
            <AceEditor
            mode="php"
            theme="monokai"
            showGutter={false}
            height='700px'
            width='100%'                    
            showPrintMargin={false}
            highlightActiveLine={false}
            onChange={this.setStubContent.bind(this)}
            value={this.valueForSelectedStub()}
            name={this.props.node.data.name + "-" + this.props.node.id}
            editorProps={
                {$blockScrolling: true}
            }
            onChangeTab={this.select.bind(this)}
        />            
        )
    }

    select() {
        console.log("Selection!");
    }

    setStubContent(newValue) {
        var stubs = this.state.data.stubs;
        stubs[this.state.selectedStub] = newValue;

        this.props.node.data = this.state.data;
    }

    valueForSelectedStub() {
        return this.state.data.stubs[this.state.selectedStub]
    }

    changeSelectedStub(event) {
        var selectedStub = event.target.value;
        this.setState({
            selectedStub
        })
    }

    renderSettingsPanel() {
        return (
            <TabPanel>
                <p> This is some settings for you to change </p>
            </TabPanel>
        )
    }

    renderResultPanel() {
        return (
            <TabPanel>
                <p> Here is the result </p>
                <button onClick={this.preview} >Update!</button>
            </TabPanel>
        )
    }

    preview() {
        $.ajax({
            type: "POST",
            url: "/manipulators/ScaffoldLaravel/preview",
            data: {
                data: JSON.stringify({
                    pseudoCode: "Car\n\nHuman",
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
