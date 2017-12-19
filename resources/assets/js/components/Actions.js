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
                // "createDatabase",
                //      "update .env"
                // "purgeMigrations"
                // "purgeModels"
                // ""
                "makeMigrations",
                "migrate"
            ]
        };

        stimRequest.tasks.map( (task) => {
            $.ajax({
                url: "/stimpack/perform/" + task,
                data: stimRequest, 
                success: function(result){
                    console.log(result);                    
            }});
        })
    }
}