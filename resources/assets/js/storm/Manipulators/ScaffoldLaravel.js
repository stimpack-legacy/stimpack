import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as _ from "lodash"

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/php';
import 'brace/theme/monokai';


class ScaffoldLaravel extends BaseManipulator {
	constructor(props) {
        super(props);
        // keys directly on state are just for component managment
        this.state.selectedStub = Object.keys(data.manipulatorData.ScaffoldLaravel.stubs).find(()=>true)
        this.state.selectedResult = 'default';
	}

    //  keys to be transfered to this.state.data
    static getDefaultManipulatorParameters() {
        return {
            name: "ScaffoldLaravel",
            pseudoCode: "",
            stubs: data.manipulatorData.ScaffoldLaravel.stubs,
            settings: {},
            result: []
        }
    }
   
    renderSettings() {

        //onChangeTab={this.select.bind(this)}

        return (
            <div>               
                <Tabs>
                    <TabList>
                        <Tab><h6>PseudoCode</h6></Tab>
                        <Tab><h6>Stubs</h6></Tab>
                        <Tab><h6>Settings</h6></Tab>
                        <Tab onClick={this.refreshResult.bind(this)}><h6>Result</h6></Tab>
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
                    <textarea rows="15" name="pseudoCode" placeholder="Some Code Here..." value={this.state.data.pseudoCode} type="text" className="form-control" onChange={this.setDataParameter.bind(this)} />
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

    renderResultSelect() {
        return (
            <select name="resultToEdit" value={this.state.selectedResult} onChange={this.changeSelectedResult.bind(this)} className="form-control">
                <option value='default' disabled>Select file</option>
                {Object.keys(this.state.data.result).map((resultName, index) => {                    
                    return (
                        <option key={resultName} value={resultName}> {resultName} </option>
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
            height='400px'
            width='100%'                    
            showPrintMargin={false}
            highlightActiveLine={false}
            onChange={this.setStubContent.bind(this)}
            value={this.valueForSelectedStub()}
            name={this.props.node.data.name + "-" + this.props.node.id}
            editorProps={
                {$blockScrolling: true}
            }            
        />            
        )
    }

    renderResultEditor() {
        return (
            <AceEditor
            mode="php"
            theme="monokai"
            showGutter={false}
            height='300px'
            width='100%'                    
            showPrintMargin={false}
            highlightActiveLine={false}
            onChange={this.setResultContent.bind(this)}
            value={this.valueForSelectedResult()}
            name={this.props.node.data.name + "-result-" + this.props.node.id}
            editorProps={
                {$blockScrolling: true}
            }            
        />            
        )
    }    

    refreshResult() {
        if(!this.shouldRefreshResult()) {
            return
        }

        $.ajax({
            type: "POST",
            url: "/manipulators/ScaffoldLaravel/preview",
            data: {
                data: JSON.stringify({
                    pseudoCode: this.state.data.pseudoCode,
                    stubs: this.state.data.stubs,
                    settings: this.state.data.settings,
                    context: {
                        targetProjectName: ""
                    }
                }),
            },
            success: function(result){
                var data = this.state.data;
                var selectedResult = 'default'
                data.result = result;

                var latestInputs = {
                    pseudoCode: this.state.data.pseudoCode,
                    stubs: _.clone(this.state.data.stubs, true),
                    settings: this.state.data.settings
                }

                this.setState({
                    data,
                    selectedResult,
                    latestInputs
                })


            }.bind(this),
            error: function(error) {
            }.bind(this)
        });        
    }

    shouldRefreshResult() {
        var currentInputs = {
            pseudoCode: this.state.data.pseudoCode,
            stubs: this.state.data.stubs,
            settings: this.state.data.settings
        }
        
        console.log({
            shouldRefresh: !_.isEqual(currentInputs, this.state.latestInputs),
            currentInputs: currentInputs,
            latestInputs: this.state.latestInputs
        });

        return !_.isEqual(currentInputs, this.state.latestInputs);
    }

    setStubContent(newValue) {
        //var stubs = this.state.data.stubs;
        //stubs[this.state.selectedStub] = newValue;

        //this.props.node.data = this.state.data;

        var data = this.state.data
        data.stubs[this.state.selectedStub] = newValue

        this.setState({
            data
        })

        this.props.node.data = this.state.data;
    }

    setResultContent(newValue) {
        //var result = this.state.data.result;
        //result[this.state.selectedResult] = newValue;

        var data = this.state.data
        data.result[this.state.selectedResult] = newValue

        this.setState({
            data
        })

        this.props.node.data = this.state.data;
    }

    valueForSelectedStub() {
        return this.state.data.stubs[this.state.selectedStub]
    }

    valueForSelectedResult() {
        return this.state.data.result[this.state.selectedResult]
    }    

    changeSelectedStub(event) {
        var selectedStub = event.target.value;
        this.setState({
            selectedStub
        })
    }

    changeSelectedResult(event) {
        var selectedResult = event.target.value;
        this.setState({
            selectedResult
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
                {this.renderResultSelect()}
                {this.renderResultEditor()}
            </TabPanel>                
        )
    }
}

export default connect(
    BaseManipulator.mapStateToProps,
    BaseManipulator.matchDispatchToProps
)(ScaffoldLaravel);
