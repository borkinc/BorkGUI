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
    POST_MESSAGE_ERROR,
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

const initialState = {
    collapsed: true,
    isChatting: false,
    chatName: '',
    chatID: null,
    chats: [],
    isLoading: true,
    groupModal: false,
    contactModal: false,
    attachmentModal: false,
    chatMessages: [],
    added: false,
    contactsModal: false,
    contacts: [],
    chatError: '',
    chatAlertVisible: false,
    addUserModal: false,
    replyModal: false,
    replyToID: null,
    filteredChats: [],
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
                chatID: action.payload.chatID,
                chatMessages: []
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
        case TOGGLE_ATTACHMENT: {
            return Object.assign({}, state, {
                attachmentModal: !state.attachmentModal
            })
        }
        case TOGGLE_ADD_USER: {
            return Object.assign({}, state, {
                addUserModal: !state.addUserModal
            })
        }
        case TOGGLE_REPLY: {
            return Object.assign({}, state, {
                replyModal: !state.replyModal,
                replyToID: action.payload
            })
        }
        case GET_CHATS: {
            return Object.assign({}, state, {
                chats: action.payload.chats,
                filteredChats: action.payload.chats,
                isLoading: false
            })
        }
        case ADD_CHAT: {
            return {
                ...state,
                chats: [...state.chats, action.payload.chat]
            }
        }
        case ADD_CHAT_ERROR: {
            return Object.assign({}, state, {
                chatError: action.payload,
                chatAlertVisible: !state.chatAlertVisible
            })
        }
        case DISMISS_CHAT_ALERT_ERROR: {
            return Object.assign({}, state, {
                chatAlertVisible: !state.chatAlertVisible
            })
        }
        case GET_CHAT_MESSAGES: {
            if (state.chatID === action.chatID) {
                state = Object.assign({}, state, {
                    chatMessages: action.payload.messages
                })
            } else {
                state = Object.assign({}, state, {
                    chatMessages: []
                })
            }
            return state
        }
        case LIKE_MESSAGE: {
            let messages = state.chatMessages.slice();
            let chatIndex = messages.findIndex(message_ => message_.mid === action.payload.messageID);
            messages[chatIndex].likes += 1;
            return Object.assign({}, state, {
                chatMessages: messages
            })
        }
        case DISLIKE_MESSAGE: {
            let messages = state.chatMessages.slice();
            let chatIndex = messages.findIndex(message_ => message_.mid === action.payload.messageID);
            messages[chatIndex].dislikes += 1;
            return Object.assign({}, state, {
                chatMessages: messages
            })
        }
        case ADD_CONTACT: {
            if (action.payload === undefined) {
                return Object.assign({}, state, {
                    added: !state.added,
                })
            } else {
                return Object.assign({}, state, {
                    added: !state.added,
                    add_msg: action.payload.msg
                })
            }
        }
        case TOGGLE_CONTACTS: {
            return Object.assign({}, state, {
                contactsModal: !state.contactsModal
            })
        }
        case GET_CONTACTS: {
            return Object.assign({}, state, {
                contacts: action.payload.contacts,
                isLoading: false
            })
        }
        case REMOVE_USER_FROM_GROUP: {
            return Object.assign({}, state, {
                contacts: state.contacts
            })
        }
        case FILTER_CHATS: {
            let filteredChatsList = state.chats.slice();
            if (action.payload) {
                filteredChatsList = filteredChatsList.filter(item => {
                    return item.name.toLowerCase().includes(action.payload.toLowerCase())
                });
            }
            return Object.assign({}, state, {
                filteredChats: filteredChatsList
            })
        }
        case POST_MESSAGE_ERROR: {
            return Object.assign({}, state, {
                chatError: action.payload.message,
                chatAlertVisible: true
            })
        }
        default: {
            return state
        }
    }
}