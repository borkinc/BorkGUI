import store from "../js/store/index";
import {logInUser, registerUser, toggleUserAuthTab} from "./actions/user-auth-actions";

window.store = store;
window.logInUser = logInUser;
window.toggleUserAuthTab = toggleUserAuthTab;
window.registerUser = registerUser;