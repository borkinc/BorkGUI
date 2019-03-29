import {combineReducers} from "redux";
import UserAuthReducer from "./user-auth-reducer";
import ChatReducer from "./chat-reducer";

export default combineReducers({
    userState: UserAuthReducer,
    chatState: ChatReducer
})