import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index'
import BaseTask from '../BaseTask'

class CreateEpicSplashPage extends BaseTask {

    body() {
        return(
            <div className="form-group">                            
                <input onChange={this.updateBackgroundImage.bind(this)} type="text" className="form-control" id="usr" placeholder="bg-image-url" />
            </div>
        );
    }

    updateBackgroundImage(event) {
        this.props.tasks.CreateEpicSplashPage.imageUrl = event.target.value
        this.props.updateTasks(this.props.tasks);
    }
    
    static getDefaultParameters() {
        return {
            name: "CreateEpicSplashPage",
            enabled: true,
            imageUrl: "https://img.wallpapersafari.com/desktop/1920/1080/16/65/JDGTWx.jpg"
        }
    }    
}

export default connect(BaseTask.mapStateToProps, BaseTask.matchDispatchToProps)(CreateEpicSplashPage);