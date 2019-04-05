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
            // TODO: Remove this line after Phase 2. Only setting user for convenience.
            localStorage.setItem('uid', action.payload.chat[0].uid);
            const chat = action.payload.chat[0];
            const date = new Date(chat.created_on);
            chat.created_on = date.toDateString().substring(4, 10);
            return Object.assign({}, state, {
                // TODO: Show all chats after finishing Phase 2. Dummy placeholder for testing purposes.
                chats: [action.payload.chat[0]],
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
            // TODO: Revert after phase 2.
            // let currentUser = localStorage.getItem('uid');
            // let messages = state.chatMessages.slice();
            // let chatIndex = messages.findIndex(message => message.mid === action.payload.messageID);
            // let isLikedByMe = action.data.likers.findIndex(liker => liker.uid === currentUser) > -1;
            // if(!isLikedByMe){
            //     messages[chatIndex].likes += 1;
            // }
            let messages = state.chatMessages.slice();
            let chatIndex = messages.findIndex(message => message.mid === action.payload.messageID);
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
            let chatIndex = messages.findIndex(message => message.mid === action.payload.messageID);
            messages[chatIndex].dislikes += 1;
            return Object.assign({}, state, {
                chatMessages: messages
            })
        }
        case POST_MESSAGE: {
            console.log(action.payload);
            console.log(action.data);
            // let date = new Date();
            let message = {
                // TODO: After phase 2, must get id from DB
                mid: action.data.message,
                // TODO: Revert after Phase 2
                // uid: JSON.parse(localStorage.getItem('user')).uid,
                uid: action.payload.userID,
                message: action.payload.message,
                created_on: action.payload.created_on,
                likes: 0,
                dislikes: 0,
                img: null
            };
            return Object.assign({}, state, {
                chatMessages: [message, ...state.chatMessages]
            })
        }
        default: {
            return state
        }
    }
}