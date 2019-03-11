import {
    ADD_CHAT,
    GET_CHAT_MESSAGES,
    GET_CHATS,
    TOGGLE_CHAT,
    TOGGLE_CONTACT_MODAL,
    TOGGLE_GROUP_MODAL,
    TOGGLE_NAVBAR
} from "../constants/action-types";
import axios from "axios";
import API_URL from "../../index";

export function toggleNavBar(payload) {
    return {type: TOGGLE_NAVBAR, payload}
}

export function toggleChat(payload) {
    return {type: TOGGLE_CHAT, payload}
}

export function getChats(payload) {
    return function (dispatch) {
        const access_token = JSON.parse(localStorage.getItem('user')).access_token;
        axios.get(API_URL + '/chats', {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            }
        )
            .then(response => {
                dispatch({type: GET_CHATS, payload: response.data});
            })
    }
}

export function addChat(payload) {
    return function (dispatch) {
        const access_token = JSON.parse(localStorage.getItem('user')).access_token;
        const data = new FormData();
        data.append('chat_name', payload);

        // Dummy post to API to simulate adding a new group chat
        axios.post(API_URL + "/chats", data, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            }
        ).then(response => {
            dispatch({type: ADD_CHAT, payload: response.data});
        });
    }
}

export function toggleGroupModal(payload) {
    return {type: TOGGLE_GROUP_MODAL, payload}
}

export function toggleContactModal(payload) {
    return {type: TOGGLE_CONTACT_MODAL, payload}
}

export function getChatMessages(payload) {
    return function (dispatch) {
        const access_token = JSON.parse(localStorage.getItem('user')).access_token;
        axios.get(API_URL + '/chat/1/messages', {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            }
        ).then(response => {
            dispatch({type: GET_CHAT_MESSAGES, payload: response.data});
        })
    }
}