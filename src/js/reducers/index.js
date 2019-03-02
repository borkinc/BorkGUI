import {LOG_IN_USER} from "../constants/action-types";
import history from "../history"

function rootReducer(state = {}, action) {
    switch (action.type) {
        case LOG_IN_USER: {
            if (action.payload.is_authenticated) {
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                history.push("/chats")
            }
            // TODO: Must handle un-authenticated requests
            return state
        }
        default:
            return state
    }
}

export default rootReducer;