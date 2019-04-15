import {LOG_IN_USER, REGISTER_USER, TOGGLE_USER_AUTH_TAB} from "../constants/action-types";
import axios from "axios";

export function logInUser(payload) {
    return function (dispatch) {
        // Creating form to be sent to API
        const data = new FormData();
        data.append('username', payload.username);
        data.append('password', payload.password);

        // Contacting API to validate user password
        axios.post(`${process.env.API_URL}` + `/login`, data, {
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
        data.append('phone_number', payload.phone_number);
        data.append('first_name', payload.first_name);
        data.append('last_name', payload.last_name);

        // Contacting api to add new user
        axios.post(`${process.env.REACT_APP_API_URL}` + `api/register`, data, {
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