import {applyMiddleware, compose, createStore} from "redux";
import reducer from "../reducers/index";
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    storeEnhancers(applyMiddleware(thunk))
);
export default store;