import * as React from "react";
import {connect} from 'react-redux';
import BaseManipulator from "../BaseManipulator";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as _ from "lodash"

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/php';
import 'brace/theme/monokai';

import sampleApp from '../../templates/sampleApp'
import userSystem from '../../templates/userSystem'


class ScaffoldLaravel extends BaseManipulator {
	constructor(props) {
        super(props);
        // keys directly on state are just for component managment
        this.state.selectedStub = 'model'
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
                    <TabList className="tab-background">                        
                        <Tab><h6>PseudoCode</h6></Tab>
                        <Tab><h6>Stubs</h6></Tab>                                                
                        <Tab onClick={this.refreshResult.bind(this)}><h6>Result</h6></Tab>
                        <Tab><h6>Help</h6></Tab>
                    </TabList>

                    {this.renderPseudoCodePanel()}
                    {this.renderStubsPanel()}                    
                    {this.renderResultPanel()}
                    {this.renderHelpPanel()}
                </Tabs>
            </div>
        );
    }


    renderPseudoCodePanel() {
        return (
            <TabPanel>
                <div className="form-group code-text-area">
                    <textarea name="pseudoCode" placeholder="Some Code Here..." value={this.state.data.pseudoCode} type="text" className="form-control textarea-scaffold" onChange={this.setDataParameter.bind(this)} />
                </div>
                <span onClick={this.addUserSystem.bind(this)} className="control-bar-item">
                    <i title="Set parameters" className={"fas fa-user icon-control-bar"}></i><span className="control-bar-item-text">Add User system</span>
                </span>
                <span onClick={this.sampleApp.bind(this)} className="control-bar-item">
                    <i title="Set parameters" className={"fas fa-question-circle icon-control-bar"}></i><span className="control-bar-item-text">Sample app</span>
                </span>
            </TabPanel>
        )
    }

    addUserSystem() {
        var data = this.state.data
        data.pseudoCode = data.pseudoCode + userSystem
        this.setState({
            data
        })
    }

    sampleApp() {
        var data = this.state.data
        data.pseudoCode = sampleApp
        this.setState({
            data
        })
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
            height='410px'
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
            height='410px'
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

    renderHelpPanel() {
        return (
            <TabPanel>
                <div className="help-tab">
                    <ul>
                        <li><p> In the PseudoCode tab, press the sample app button to see an example of valid syntax. </p></li>
                        <li><p> Press Add user system to add the default Laravel auth. </p></li>
                        <li><p> Define any number of segments as group of rows separated by two newlines. </p></li>
                        <li><p> The first line in each segment determins the type. </p></li>
                        <li><p> Use pascal case to create a Model. Example: "CarBrands" </p></li>
                        <li><p> Use model1_model2 in snake case for manyToMany relationship, for instance "car_passenger" </p></li>
                        <li><p> Use snake case for pure tables. Example: "password_resets" </p></li>
                        <li><p> Please note this manipulator is a part of the stimpack Alfa release and is a experimental feature</p></li>
                        <li><p> Limitations include no support multiple one-to-many between two models and no one-to-one distinction</p></li>
                    </ul>
                </div>
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

    // ENSURE RESULT IS UPDATED EVEN IF THE RESULT PANEL IS NOT VISITED
    closeModal() {
        this.refreshResult()
        super.closeModal()
    }
}

export default connect(
    BaseManipulator.mapStateToProps,
    BaseManipulator.matchDispatchToProps
)(ScaffoldLaravel);
