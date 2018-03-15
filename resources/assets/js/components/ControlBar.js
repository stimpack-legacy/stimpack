import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ControlBar extends Component {
    render() {
        return (
            <div className="controlBar">            
                <p>Target project:</p>                
                <form className="controlItem">
                    <div className="form-group controlItem">                        
                        <input type="text" list="projects" className="controlItem" />
                        <datalist  id="projects" placeholder="my-new-project" className="controlItem">
                        </datalist>                            
                    </div>
                </form>

                <p>Using pack:</p>                
                <form className="controlItem">
                    <div className="form-group controlItem">                        
                        <input type="text" list="projects" className="controlItem" />
                        <datalist  id="projects" placeholder="my-new-project" className="controlItem">
                        </datalist>                            
                    </div>

                    <p>Add Task</p>                
                    <p>Run All!</p>
                    <p>Save</p>
                    <p>Share</p>
                    <p>Help</p>
                </form>

                <i className="fa fa-syringe icon controlItem"></i>
                <i className="fa fa-refresh fa-spin log-pending icon controlItem"></i>
                <i className="fa fa-save icon controlItem"></i>
                <i className="fa fa-play icon controlItem"></i>
                <i className="fa fa-syringe icon controlItem"></i>
                <i className="fas fa-cloud-upload-alt icon controlItem"></i>
            </div>
        );
    }
}

/*
            <div className="controlBar">
                <form>
                    <div className="form-group">                        
                        <input type="text" list="projects" />
                        <datalist  id="projects" placeholder="my-new-project">
                        </datalist>                            
                    </div>
                </form>

                <form>
                    <div className="form-group">                        
                        <input type="text" list="projects2" />
                        <datalist  id="projects2" placeholder="my-new-project">
                        </datalist>                            
                    </div>
                </form>                
            </div>
*/