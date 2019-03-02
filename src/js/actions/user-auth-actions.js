import {LOG_IN_USER} from "../constants/action-types";
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