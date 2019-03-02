import {combineReducers} from "redux";
import UserAuthReducer from "./user-auth-reducer";

export default combineReducers({
    userState: UserAuthReducer
})