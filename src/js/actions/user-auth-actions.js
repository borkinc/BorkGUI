import {LOG_IN_USER, REGISTER_USER, TOGGLE_USER_AUTH_TAB} from "../constants/action-types";
import axios from "axios";
import API_URL from "../../index";

export function logInUser(payload) {
    return function (dispatch) {
        // Creating form to be sent to API
        const data = new FormData();
        data.append('username', payload.username);
        data.append('password', payload.password);

        // Contacting API to validate user password
        axios.post(API_URL + `/login`, data, {
            headers: {'Content-Type': 'application/json',}
        })
            .then(response => {
                dispatch({type: LOG_IN_USER, payload: response.data})
            })
    }
}

export function registerUser(payload) {
    return function (dispatch) {
        // Creating form to be sent to API
        const data = new FormData();
        data.append('username', payload.username);
        data.append('email', payload.email);
        data.append('password', payload.password);

        // Contacting api to add new user
        axios.post(API_URL + `/register`, data, {
            headers: {'Content-Type': 'application/json',}
        })
            .then(response => {
                dispatch({type: REGISTER_USER, payload: response.data});
            })
    }
}

export function toggleUserAuthTab(payload) {
    return {type: TOGGLE_USER_AUTH_TAB, activeTab: payload}
}