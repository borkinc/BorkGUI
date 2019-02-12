import React from 'react';
import './App.css';
import UserAuth from './UserAuth/UserAuth';
import {Route} from "react-router";
import ChatNavBar from "./ChatNavBar/ChatNavBar";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

library.add(faSearch);

const App = () => {

    return (
        <div className="App">
            <Route exact path="/" component={UserAuth}/>
            <Route exact path="/chats" component={ChatNavBar}/>
        </div>
    );
};


export default App;
