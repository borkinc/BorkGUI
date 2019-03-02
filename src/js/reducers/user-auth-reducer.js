import {LOG_IN_USER, REGISTER_USER, TOGGLE_USER_AUTH_TAB} from "../constants/action-types";
import history from "../history";

const initialState = {
    activeTab: '1'
};

export default function UserAuthReducer(state = initialState, action) {
    switch (action.type) {
        case LOG_IN_USER: {
            if (action.payload.is_authenticated) {
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                history.push("/chats")
            }
            // TODO: Must handle un-authenticated requests
            return state
        }
        case REGISTER_USER: {
            history.push("/chats");
            return state
        }
        case TOGGLE_USER_AUTH_TAB: {
            if (state.activeTab !== action.activeTab) {
                return Object.assign({}, state, {
                    activeTab: action.activeTab
                })
            }
            return state
        }
        default:
            return state
    }
}
