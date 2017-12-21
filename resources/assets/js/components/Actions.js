import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Actions extends Component {
    render() {
        return (
            <div className="actions">
                <button onClick={this.stim} id="12345" className="btn btn-success btn-cool">Stim!</button>
            </div>
        );
    }

    stim(e) {        
        var stimRequest = {
            tasks: [
                "CreateDatabaseIfNotExistsTask",
                //      "update .env"
                // "purgeMigrations"
                // "purgeModels"
                // ""
                "CreateMigrationsTask"
                //migrate ...
            ]
        };

        //this.performTasks(stimRequest.tasks);
    }
/*
    performTasks(tasks) {
        var index = 0;
        this.perform(tasks[index], function (index) {
            this.perform(tasks[0]
        });    
    }

    performTask(task, callback) {
        $.ajax({
            url: "/stimpack/perform/" + task,
            data: stimRequest, 
            success: function(result){
                console.log(result);
                callback();                    
            }
        });        
    }
*/
}