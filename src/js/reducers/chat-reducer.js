import {
    ADD_CHAT,
    ADD_CHAT_ERROR,
    ADD_CONTACT,
    DISLIKE_MESSAGE,
    DISMISS_CHAT_ALERT_ERROR,
    GET_CHAT_MESSAGES,
    GET_CHATS,
    GET_CONTACTS,
    LIKE_MESSAGE,
    POST_MESSAGE,
    REMOVE_USER_FROM_GROUP,
    TOGGLE_ADD_USER,
    TOGGLE_ATTACHMENT,
    TOGGLE_CHAT,
    TOGGLE_CONTACT_MODAL,
    TOGGLE_CONTACTS,
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
    attachmentModal: false,
    chatMessages: [],
    added: false,
    contactsModal: false,
    contacts: [],
    chatError: '',
    chatAlertVisible: false,
    addUserModal: false
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
            return Object.assign({}, state, {
                chatMessages: action.payload.messages
            })
        }
        case LIKE_MESSAGE: {
            // TODO: Revert after phase 2.
            // let currentUser = localStorage.getItem('uid');
            // let messages = state.chatMessages.slice();
            // let chatIndex = messages.findIndex(message => message.mid === action.payload.messageID);
            // let isLikedByMe = action.data.likers.findIndex(liker => liker.uid === currentUser) > -1;
            // if(!isLikedByMe){
            //     messages[chatIndex].likes += 1;
            // }
            let messages = state.chatMessages.slice();
            let chatIndex = messages.findIndex(message_ => message_.mid === action.payload.messageID);
            messages[chatIndex].likes += 1;
            return Object.assign({}, state, {
                chatMessages: messages
            })
        }
        case DISLIKE_MESSAGE: {
            // TODO: Revert after phase 2.
            // console.log(action.data);
            // let currentUser = localStorage.getItem('uid');
            // let messages = state.chatMessages.slice();
            // let chatIndex = messages.findIndex(message => message.mid === action.payload.messageID);
            // let isDislikedByMe = action.data.dislikers.findIndex(disliker => disliker.uid === currentUser) > -1;
            // if(!isDislikedByMe){
            //     messages[chatIndex].dislikes += 1;
            // }
            let messages = state.chatMessages.slice();
            let chatIndex = messages.findIndex(message_ => message_.mid === action.payload.messageID);
            messages[chatIndex].dislikes += 1;
            return Object.assign({}, state, {
                chatMessages: messages
            })
        }
        case POST_MESSAGE: {
            // let date = new Date();
            let message = {
                // TODO: After phase 2, must get id from DB
                mid: action.data.message,
                // TODO: Revert after Phase 2
                // uid: JSON.parse(localStorage.getItem('user')).uid,
                uid: action.payload.userID,
                message: action.payload.message,
                created_on: action.payload.datePosted,
                likes: 0,
                dislikes: 0,
                img: action.payload.picture
            };
            return Object.assign({}, state, {
                chatMessages: [message, ...state.chatMessages]
            })
        }
        case ADD_CONTACT: {
            if(action.payload === undefined){
                return Object.assign({}, state, {
                    added: !state.added,
                })
            }
            else{
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
        default: {
            return state
        }
    }
}