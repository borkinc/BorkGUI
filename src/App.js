import React from 'react';
import './App.css';
import UserAuth from './UserAuth/UserAuth';
import {Route} from "react-router";
import Chats from "./Chats/Chats";

const App = () => {

  return (
      <div className="App">
        <Route exact path="/" component={UserAuth}/>
        <Route exact path="/chats" component={Chats}/>
      </div>
  );
};


export default App;
