import React from 'react';
import './App.css';
import UserAuth from './js/components/UserAuth.jsx';
import {Route} from "react-router";
import ChatNavBar from "./js/components/ChatNavBar";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faSearch, faUserCircle} from '@fortawesome/free-solid-svg-icons';

library.add(faSearch, faUserCircle);

const App = () => {

    return (
        <div className="App">
            <Route exact path="/" component={UserAuth}/>
            <Route exact path="/chats" component={ChatNavBar}/>
        </div>
    );
};
export default App;
