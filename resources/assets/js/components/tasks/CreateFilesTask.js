import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PseudoCodeTransformer from '../../PseudoCodeTransformer';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../actions/index';
import Template from './../../Template';
import BaseTask from './BaseTask'

export default class CreateFilesTask extends BaseTask {
    setupEditor() {
        this.php = ace.edit(this.editorName());
        this.php.$blockScrolling = Infinity;
        this.php.setTheme("ace/theme/monokai");
        this.php.getSession().setMode({
            path: "ace/mode/php",
            inline: true
        });

        this.php.setValue(Template.phpPlaceholder(), 0);
        
        this.php.setOptions({
            readOnly: true,
            highlightActiveLine: false,
            highlightGutterLine: false
        });        
        this.php.renderer.$cursorLayer.element.style.opacity=0;        

        this.php.setShowPrintMargin(false);
        this.php.renderer.setShowGutter(false);
    }  

    editorName() {
        return this.task().name + '-editor';
    }

    renderPhpTabs() {
        var tabs = this.props.tasks.SetObjectModel.transformedPseudoCode.filter(this.tabsToRender());
        return tabs.map(this.renderPhpTab.bind(this));
    }

    transformedPseudoCode() {
        return this.props.tasks.SetObjectModel.transformedPseudoCode;
    }

    tabsToRender() {
        return this.constructor.getDefaultParameters().shouldDisplayFilesOfType
    }

    renderPhpTab(block) {
        var tabName = Template.file(this.fileTypeToGenerate(), block).tabName;
        var tabClass = "editor-tab" + this.getClassForActiveTab(block.name);                
        return (
            <li key={block.table} className={tabClass}>
                <a onClick={this.clickTab.bind(this)} data-model={block.name} href="#">{tabName}</a>
            </li>
        );        
    }

    fileTypeToGenerate() {
        return this.constructor.getDefaultParameters().fileTypeToGenerate;
    }

    getClassForActiveTab(blockName) {
        if(blockName == this.props.tasks.SetObjectModel.activeTab) {
            return " " + "editor-tab-active"; // Space to separate classes
        }
        return "";        
    }

    clickTab(e) {
        e.preventDefault();
        this.props.tasks.SetObjectModel.activeTab = e.target.getAttribute("data-model");
        this.props.updateTasks(this.props.tasks);        
    }

    activeTab() {
        return this.props.tasks.SetObjectModel.activeTab;
    }

    activeBlock() {
        return this.props.tasks.SetObjectModel.transformedPseudoCode.all().find((model) => {
            return model.name == this.props.tasks.SetObjectModel.activeTab;
        });
    }

    renderPhpCode() {
        var file = Template.file(this.fileTypeToGenerate(), this.activeBlock());
        if(!file) {
            this.php.setValue("", 1);
            return;
        }
        this.php.setValue(file.body, 1);
    }
}