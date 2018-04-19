import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Search from "./controls/Search";
import AddManipulator from "./controls/AddManipulator";
import Run from "./controls/Run";
import Log from "./controls/Log";
import Save from "./controls/Save";
import Upload from "./controls/Upload";

export default class ControlBar extends Component {
    render() {        
        return (
            <div id="controlBar" className="controlBar">            
                <span className="heading-app-name">LARAVEL <i className="fa fa-2x fa-syringe"></i> STIMPACK</span>                
                <Run />
                <AddManipulator />
                <Log />
                <Save />
                <Upload />                                                      
                <Search />
            </div>
        );
    }    
}