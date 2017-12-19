import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tab from './Tab';

export default class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            tabs: [
                "help",
                "Car",
                "Owner",
                "Garage"
            ]
        };
    }

    getInitialState() {
        return {
            tabs: [
                "help",
                "Car",
                "Owner",
                "Garage"
            ]
        }
    }

    renderTab(tab) {
        return <li key={tab.name}><Tab content={tab.name} /></li>
    }

    render() {
        return (
            <div>                
                <button className="btn btn-primary">Help</button>
                <button className="btn btn-primary">Models</button>
                <button className="btn btn-primary">Schema</button>
            </div>
        );
    }
}
