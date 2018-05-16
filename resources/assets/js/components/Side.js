import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AddManipulator from "./controls/AddManipulator";

export default class Side extends Component {
    render() {
        return (
            <div id="side" className="side">
                <button className="side-button">Create</button>
                <button className="side-button">Load</button>
                <button className="side-button">CreateFile</button>
                <button className="side-button">Delete</button>
                <button className="side-button">ReplaceInFile</button>
                <button className="side-button">ScaffoldLaravel</button>
                <button className="side-button">ThrowBackEndError</button>
                <AddManipulator />

            </div>
        );
    }

}
