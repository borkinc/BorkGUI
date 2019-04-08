import {
    ADD_CHAT,
    DISLIKE_MESSAGE,
    GET_CHAT_MESSAGES,
    GET_CHATS,
    LIKE_MESSAGE,
    POST_MESSAGE,
    TOGGLE_ATTACHMENT,
    TOGGLE_CHAT,
    TOGGLE_CONTACT_MODAL,
    TOGGLE_GROUP_MODAL,
    TOGGLE_NAVBAR
} from "../constants/action-types";
import axios from "axios";

export function toggleNavBar(payload) {
    return {type: TOGGLE_NAVBAR, payload}
}

export function toggleChat(payload) {
    return {type: TOGGLE_CHAT, payload}
}

export function toggleAttachment(payload) {
    return {type: TOGGLE_ATTACHMENT, payload}
}

export function getChats() {
    return function (dispatch) {
        // const access_token = JSON.parse(localStorage.getItem('user')).access_token;
        // TODO: Must get all chats for current user after phase 2.
        axios.get(`${process.env.REACT_APP_API_URL}` + 'api/chats/7'
            // {
            //         headers: {
            //             'Authorization': `Bearer ${access_token}`
            //         }
            //     }
        )
            .then(response => {
                dispatch({type: GET_CHATS, payload: response.data});
            })
    }
}

export function addChat(payload) {
    return function (dispatch) {
        // const access_token = JSON.parse(localStorage.getItem('user')).access_token;
        const data = new FormData();
        data.append('chat_name', payload);

        // Dummy post to API to simulate adding a new group chat
        axios.post(`${process.env.REACT_APP_API_URL}` + "api/chats", data
            // {
            //         headers: {
            //             'Authorization': `Bearer ${access_token}`
            //         }
            //     }
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
        // const access_token = JSON.parse(localStorage.getItem('user')).access_token;
        axios.get(`${process.env.REACT_APP_API_URL}` + 'api/messages'
            // {
            //         headers: {
            //             'Authorization': `Bearer ${access_token}`
            //         }
            //     }
        ).then(response => {
            dispatch({type: GET_CHAT_MESSAGES, payload: response.data});
        })
    }
}

export function likeMessage(payload) {
    // TODO: Revert after Phase 2
    // const {messageID} = payload;
    // return function(dispatch){
    //     axios.get(`${process.env.REACT_APP_API_URL}` + '/messages/' + messageID + '/like')
    //         .then(response =>
    //             dispatch({type: LIKE_MESSAGE, payload, data: response.data}))
    // }
    return {type: LIKE_MESSAGE, payload}
}

export function dislikeMessage(payload) {
    // TODO: Revert after Phase 2
    // const {messageID} = payload;
    // return function(dispatch){
    //     axios.get(`${process.env.REACT_APP_API_URL}` + '/messages/' + messageID + '/dislike')
    //         .then(response =>
    //             dispatch({type: DISLIKE_MESSAGE, payload, data: response.data}))
    // }
    return {type: DISLIKE_MESSAGE, payload}
}

export function postMessage(payload) {
    return function (dispatch) {
        const data = new FormData();
        data.append('uid', payload.userID);
        data.append('message', payload.message);
        data.append('created_on', payload.datePosted);
        data.append('img', payload.picture);

        axios.post(`${process.env.REACT_APP_API_URL}` + 'api/chats/' + payload.chatID + '/messages', data,)
            .then(response =>
                dispatch({type: POST_MESSAGE, payload, data: response.data}))
    }
}