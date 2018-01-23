import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Code from './Code';
import Database from './Database';
import CreateModelsTask from './tasks/CreateModelsTask';
import CreateDatabaseTask from './tasks/CreateDatabaseTask';
import SampleTask from './tasks/SampleTask';

export default class Inputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="inputs">
                <Code />                
                <CreateDatabaseTask />
                <CreateModelsTask />
            </div>
        );
    }
}

/*
<Code />
<CreateModelsTask />
<SampleTask />


<Database />
<Code />                
<Models />
<Migrations />
<Controllers />
<API Controllers />
<CRUD />

*/
