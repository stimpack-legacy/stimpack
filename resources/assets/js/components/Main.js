import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Generator from './Generator';
//import Footer from './Footer';
//import Tabs from './Tabs';
//import Tab from './Tab';
//import Actions from './Actions';
//import Workspace from './Workspace';

export default class Main extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <Generator />
            </div>
        );
    }
}

//if (document.getElementById('main')) {
//    ReactDOM.render(<Main />, document.getElementById('main'));
//}

/*
<Header />
<Generator />
<Footer />


<Main>
    <Header />
    <Generator>
        <Inputs>
            <Code>
                //<PseudoCode />
                //<PHPCode />
                //<Manipulators />
            </Code>
            <GlobalConfig />
            <TaskConfig />
            <TaskConfig />
            ...
        </Inputs>
        <StimButton />
    </Generator>
    <Footer />
</Main>

*/