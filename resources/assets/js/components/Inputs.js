import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Database from './Database';
import CreateMigrationsTask from './tasks/CreateMigrationsTask';
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
                <CreateDatabaseTask />
                <CreateMigrationsTask />
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
