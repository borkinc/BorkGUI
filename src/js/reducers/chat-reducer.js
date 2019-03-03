import {
    ADD_CHAT,
    GET_CHAT_MESSAGES,
    GET_CHATS,
    TOGGLE_CHAT,
    TOGGLE_CONTACT_MODAL,
    TOGGLE_GROUP_MODAL,
    TOGGLE_NAVBAR
} from "../constants/action-types";

const initialState = {
    collapsed: true,
    isChatting: false,
    chatName: '',
    chatID: null,
    chats: [],
    isLoading: true,
    groupModal: false,
    contactModal: false,
    chatMessages: []
};

export default function ChatReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_NAVBAR: {
            return Object.assign({}, state, {
                collapsed: !state.collapsed
            })
        }
        case TOGGLE_CHAT: {
            return Object.assign({}, state, {
                isChatting: true,
                chatName: action.payload.chatName,
                chatID: action.payload.chatID
            })
        }
        case TOGGLE_GROUP_MODAL: {
            return Object.assign({}, state, {
                groupModal: !state.groupModal
            })
        }
        case TOGGLE_CONTACT_MODAL: {
            return Object.assign({}, state, {
                contactModal: !state.contactModal
            })
        }
        case GET_CHATS: {
            return Object.assign({}, state, {
                chats: action.payload.chats,
                isLoading: false
            })
        }
        case ADD_CHAT: {
            return {
                ...state,
                chats: [...state.chats, action.payload.chat]
            }
        }
        case GET_CHAT_MESSAGES: {
            return Object.assign({}, state, {
                chatMessages: action.payload.messages
            })
        }
        default: {
            return state
        }
    }
}