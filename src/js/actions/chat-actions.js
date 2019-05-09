import {
    ADD_CHAT,
    ADD_CHAT_ERROR,
    ADD_CONTACT,
    DISLIKE_MESSAGE,
    DISMISS_CHAT_ALERT_ERROR,
    FILTER_CHATS,
    GET_CHAT_MESSAGES,
    GET_CHATS,
    GET_CONTACTS,
    LIKE_MESSAGE,
    POST_MESSAGE,
    POST_MESSAGE_REPLY,
    REMOVE_USER_FROM_GROUP,
    TOGGLE_ADD_USER,
    TOGGLE_ATTACHMENT,
    TOGGLE_CHAT,
    TOGGLE_CONTACT_MODAL,
    TOGGLE_CONTACTS,
    TOGGLE_GROUP_MODAL,
    TOGGLE_NAVBAR,
    TOGGLE_REPLY
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
        const access_token = JSON.parse(localStorage.getItem('user')).access_token;
        axios.get(`${process.env.REACT_APP_API_URL}api/chats`, {
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
        data.append('chat_name', payload.chatName);
        if (payload.group_members.length !== 0) {
            data.append('members', payload.group_members);
        }
        axios.post(`${process.env.REACT_APP_API_URL}api/chats`, data, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                }
            }
        ).then(response => {
            dispatch({type: ADD_CHAT, payload: response.data});
        }).catch(error => {
            dispatch({type: ADD_CHAT_ERROR, payload: error.response.data.message})
        })
    }
}

export function dismissChatAlert() {
    return {type: DISMISS_CHAT_ALERT_ERROR}
}

export function addContact(payload) {
    return function (dispatch) {
        const data = new FormData();
        data.append('first_name', payload.contactFirstName);
        data.append('last_name', payload.contactLastName);
        data.append('email', payload.contactEmail);
        data.append('phone_number', payload.contactPhoneNumber);
        const access_token = JSON.parse(localStorage.getItem('user')).access_token;
        axios.post(`${process.env.REACT_APP_API_URL}api/contacts`, data, {
            headers: {
                'Authorization':
                    `Bearer ${access_token}`
            }
        }).then(response => {

                return dispatch({type: ADD_CONTACT, payload: response.data});

            }
        ).catch(error => {
            return dispatch({type: ADD_CONTACT, payload: error.response.data});
        })
    }
}

export function getContacts() {
    return function (dispatch) {
        const uid = JSON.parse(localStorage.getItem('user')).uid;
        const access_token = JSON.parse(localStorage.getItem('user')).access_token;
        axios.get(`${process.env.REACT_APP_API_URL}api/contacts/${uid}`, {
            headers: {
                'Authorization':
                    `Bearer ${access_token}`
            }
        }).then(response => {
            return dispatch({type: GET_CONTACTS, payload: response.data})

        })
    }
}

export function removeContact(payload) {
    return function (dispatch) {
        const data = new FormData();
        data.append('contact_id', payload);
        const access_token = JSON.parse(localStorage.getItem('user')).access_token;
        axios.delete(`${process.env.REACT_APP_API_URL}api/contacts`, {
            data: data, headers: {
                'Authorization':
                    `Bearer ${access_token}`
            }
        }).then(response => {
            return dispatch({type: GET_CONTACTS, payload: response.data})
        })
    }
}

export function toggleGroupModal(payload) {
    return {type: TOGGLE_GROUP_MODAL, payload}
}

export function toggleContactModal(payload) {
    return {type: TOGGLE_CONTACT_MODAL, payload}
}

export function toggleAdded(payload) {
    return {type: ADD_CONTACT, payload}
}

export function toggleContacts(payload) {
    return {type: TOGGLE_CONTACTS, payload}
}

export function toggleAddUser(payload) {
    return {type: TOGGLE_ADD_USER, payload}
}

export function getChatMessages(payload) {
    return function (dispatch) {
        const access_token = JSON.parse(localStorage.getItem('user')).access_token;
        axios.get(`${process.env.REACT_APP_API_URL}api/chats/${payload}/messages`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            }
        ).then(response => {
            dispatch({type: GET_CHAT_MESSAGES, payload: response.data, chatID: payload});
        })
    }
}

export function likeMessage(payload) {
    // TODO: Revert after Phase 2
    const {messageID} = payload;
    return function (dispatch) {
        const access_token = JSON.parse(localStorage.getItem('user')).access_token;

        axios.post(`${process.env.REACT_APP_API_URL}api/messages/${messageID}/like`, {}, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }).then(response => {
            dispatch({type: LIKE_MESSAGE, payload, data: response.data})
        })

    };
}

export function dislikeMessage(payload) {
    // TODO: Revert after Phase 2
    const {messageID} = payload;
    return function (dispatch) {
        const access_token = JSON.parse(localStorage.getItem('user')).access_token;

        axios.post(`${process.env.REACT_APP_API_URL}api/messages/${messageID}/dislike`, {}, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then(response =>
                dispatch({type: DISLIKE_MESSAGE, payload, data: response.data}))
    }
}

export function postMessage(payload) {
    return function (dispatch) {
        const access_token = JSON.parse(localStorage.getItem('user')).access_token;
        const data = new FormData();
        data.append('uid', payload.userID);
        data.append('message', payload.message);
        data.append('created_on', payload.datePosted);
        data.append('img', payload.picture);

        axios.post(`${process.env.REACT_APP_API_URL}api/chats/${payload.chatID}/messages`, data, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }).then(response =>
            dispatch({type: POST_MESSAGE, payload, data: response.data}))
    }
}

export function addUserToGroup(payload) {
    return function (dispatch) {
        const access_token = JSON.parse(localStorage.getItem('user')).access_token;
        const data = new FormData();
        data.append('contact_id', payload.contactID);

        axios.post(`${process.env.REACT_APP_API_URL}api/chats/${payload.chatID}/members`, data, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }).then(response =>
            dispatch({type: ADD_CONTACT, payload: response.data}))
    }
}


export function removeUserFromGroup(payload) {
    return function (dispatch) {
        const access_token = JSON.parse(localStorage.getItem('user')).access_token;
        const data = new FormData();
        data.append('contact_id', payload.contactID);

        axios.delete(`${process.env.REACT_APP_API_URL}api/chats/${payload.chatID}/members`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            },
            data: data
        }).then(response =>
            dispatch({type: REMOVE_USER_FROM_GROUP, payload: response.data}))
    }
}

export function deleteChat(payload) {
    return function () {
        const access_token = JSON.parse(localStorage.getItem('user')).access_token;
        axios.delete(`${process.env.REACT_APP_API_URL}api/chats/${payload}`, {
            headers: {'Authorization': `Bearer ${access_token}`}
        })
    }
}

export function postMessageReply(payload) {
    return function (dispatch) {
        const access_token = JSON.parse(localStorage.getItem('user')).access_token;
        const data = new FormData();
        data.append('uid', payload.userID);
        data.append('mid', payload.replyToID);
        data.append('message', payload.message);
        data.append("cid", payload.chatID);
        data.append('img', payload.image);

        axios.post(`${process.env.REACT_APP_API_URL}api/messages/${payload.replyToID}/replies`, data, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then(response =>
                dispatch({type: POST_MESSAGE_REPLY, payload, data: response.data}))
    }
}


export function toggleReply(payload) {
    return {type: TOGGLE_REPLY, payload}
}

export function filterChats(payload) {
    return {type: FILTER_CHATS, payload}
}