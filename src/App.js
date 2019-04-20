import React from 'react';
import './App.css';
import {Route} from "react-router";
import ChatNavBar from "./js/components/ChatNavBar.jsx";
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faEllipsisH,
    faPaperclip,
    faPaperPlane,
    faSearch,
    faThumbsDown,
    faThumbsUp,
    faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import UserAuth from "./js/components/UserAuth";


library.add(faSearch, faUserCircle, faThumbsUp, faThumbsDown, faPaperPlane, faPaperclip, faEllipsisH);

const App = () => {

    return (
        <div className="App">
            {/*TODO: Revert back for phase 3*/}
            <Route exact path="/" component={UserAuth}/>
            <Route path="/chats" component={ChatNavBar}/>
        </div>
    );
};
export default App;
