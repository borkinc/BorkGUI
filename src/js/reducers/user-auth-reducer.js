import {
    DISMISS_USER_ALERT_ERROR,
    LOG_IN_USER,
    LOGOUT,
    REGISTER_USER,
    TOGGLE_USER_AUTH_TAB,
    USER_ERROR
} from "../constants/action-types";
import history from "../history";

const initialState = {
    activeTab: '1',
    userAuthError: '',
    userAlertVisible: false,
    invalidFields: []

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
        case USER_ERROR: {
            return Object.assign({}, state, {
                userAuthError: action.payload.message,
                userAlertVisible: true,
                invalidFields: action.payload.fields
            })
        }
        case REGISTER_USER: {
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            history.push("/chats");
            return state
        }
        case TOGGLE_USER_AUTH_TAB: {
            if (state.activeTab !== action.activeTab) {
                return Object.assign({}, state, {
                    activeTab: action.activeTab,
                    invalidFields: []
                })
            }
            return state
        }
        case DISMISS_USER_ALERT_ERROR: {
            return Object.assign({}, state, {
                userAlertVisible: !state.userAlertVisible,
                userAuthError: ''
            })
        }
        case LOGOUT: {
            localStorage.clear();
            history.push('/');
            return Object.assign({}, state, {})
        }
        default:
            return state
    }
}
