import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EditorManager from '../EditorManager';

export default class Editors extends Component {
    componentDidMount() {
        var editors = new EditorManager;
        editors.setup();
        editors.test();        
    }

    render() {
        return (
            <div>            
                <div id="pseudo-wrapper">
                    <div>
                        <ul>
                            <li><a href="#">Input</a></li>
                        </ul>
                    </div>
                    <div id="pseudo-editor" />
                </div>
                <div id="php-wrapper">
                    <div>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#news">News</a></li>
                            <li><a href="#contact">Contact</a></li>
                            <li><a href="#about">About</a></li>                                                                                                                                                                                               
                    </ul>
                    </div>

                    <div id="php-editor" />
                </div>            
            </div>
        );
    }
}
