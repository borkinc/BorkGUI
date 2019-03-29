import {
    ADD_CHAT,
    DISLIKE_MESSAGE,
    GET_CHAT_MESSAGES,
    GET_CHATS,
    LIKE_MESSAGE,
    POST_MESSAGE,
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
                // TODO: Show all chats after finishing Phase 2. Dummy placeholder for testing purposes.
                chats: [action.payload.chats[0]],
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
        case LIKE_MESSAGE: {
            let messages = state.chatMessages.slice();
            let chatIndex = messages.findIndex(message => message.message_id === action.payload.messageID);
            if (!(messages[chatIndex].likes.indexOf(action.payload.userID) > -1)) {
                let dislikesIndex = messages[chatIndex].dislikes.indexOf(action.payload.userID);
                if (dislikesIndex > -1) {
                    messages[chatIndex].dislikes.splice(dislikesIndex, 1);
                }
                messages[chatIndex].likes = [...messages[chatIndex].likes, action.payload.userID];
            }
            return Object.assign({}, state, {
                chatMessages: messages
            })
        }
        case DISLIKE_MESSAGE: {
            let messages = state.chatMessages.slice();
            let chatIndex = messages.findIndex(message => message.message_id === action.payload.messageID);
            if (!(messages[chatIndex].dislikes.indexOf(action.payload.userID) > -1)) {
                let likesIndex = messages[chatIndex].likes.indexOf(action.payload.userID);
                if (likesIndex > -1) {
                    messages[chatIndex].likes.splice(likesIndex, 1);
                }
                messages[chatIndex].dislikes = [...messages[chatIndex].dislikes, action.payload.userID]
            }
            return Object.assign({}, state, {
                chatMessages: messages
            })
        }
        case POST_MESSAGE: {
            let date = new Date();
            let message = {
                message_id: parseInt(state.chatMessages[state.chatMessages.length - 1].message_id + 1),
                user_id: JSON.parse(localStorage.getItem('user')).uid,
                message: action.payload,
                created_on: date.toISOString(),
                likes: [],
                dislikes: [],
                img: null
            };
            return Object.assign({}, state, {
                chatMessages: [...state.chatMessages, message]
            })
        }
        default: {
            return state
        }
    }
}