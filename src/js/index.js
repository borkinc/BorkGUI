import store from "../js/store/index";
import {logInUser} from "./actions/user-auth-actions";

window.store = store;
window.logInUser = logInUser;