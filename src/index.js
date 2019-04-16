import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import store from "./js/store";
import {Router} from "react-router";
import history from "./js/history"
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <SnackbarProvider maxSnack={3}>
                <App/>
            </SnackbarProvider>
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
