import store from "../js/store/index";
import {logInUser, registerUser, toggleUserAuthTab} from "./actions/user-auth-actions";
import {
    addChat,
    dislikeMessage,
    getChats,
    likeMessage,
    postMessage,
    postMessageReply,
    toggleAttachment,
    toggleChat,
    toggleContactModal,
    toggleGroupModal,
    toggleNavBar,
    toggleReply
} from "./actions/chat-actions";

window.store = store;
window.logInUser = logInUser;
window.toggleUserAuthTab = toggleUserAuthTab;
window.registerUser = registerUser;
window.toggleNavBar = toggleNavBar;
window.toggleChat = toggleChat;
window.getChats = getChats;
window.addChat = addChat;
window.toggleGroupModal = toggleGroupModal;
window.toggleContactModal = toggleContactModal;
window.likeMessage = likeMessage;
window.dislikeMessage = dislikeMessage;
window.postMessage = postMessage;
window.toggleAttachment = toggleAttachment;
window.toggleReply = toggleReply;
window.postMessageReply = postMessageReply;