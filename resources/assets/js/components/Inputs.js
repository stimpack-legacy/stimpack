import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Code from './Code';
import Database from './Database';
import CreateModelsTask from './tasks/CreateModelsTask';
import SampleTask from './SampleTask';

export default class Inputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <SampleTask />
            </div>
        );
    }
}

/*
<Code />
<CreateModelsTask />

<Database />
<Code />                
<Models />
<Migrations />
<Controllers />
<API Controllers />
<CRUD />

*/
