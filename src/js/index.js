import store from "../js/store/index";
import {dismissUserAlert, logInUser, registerUser, toggleUserAuthTab} from "./actions/user-auth-actions";
import {
    addChat,
    addContact,
    dislikeMessage,
    dismissChatAlert,
    getChats,
    likeMessage,
    postMessage,
    toggleAttachment,
    toggleChat,
    toggleContactModal,
    toggleGroupModal,
    toggleNavBar
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
window.addContact = addContact;
window.dismissUserAlert = dismissUserAlert;
window.dismissChatAlert = dismissChatAlert;