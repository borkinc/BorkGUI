import React, {Component} from 'react';
import {Alert, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler} from "reactstrap";
import ChatNavItems from "./ChatNavItems.jsx";
import Chats from "./Chats.jsx";
import {connect} from "react-redux";
import {dismissChatAlert, toggleNavBar} from "../actions/chat-actions";
import '../../css/ChatNavBar.css';

function mapDispatchToProps(dispatch) {
    return {
        toggleNavBar: () => dispatch(toggleNavBar()),
        dismissChatAlert: () => dispatch(dismissChatAlert())
    }
}

function mapStateToProps(state) {
    const {chatState} = state;
    return {
        collapsed: chatState.collapsed,
        chatError: chatState.chatError,
        chatAlertVisible: chatState.chatAlertVisible
    }
}

class ConnectedChatNavBar extends Component {

    toggleNavBar = () => {
        this.props.toggleNavBar();
    };

    onDismiss = () => {
        this.props.dismissChatAlert()
    };

    render() {
        const {chatError, chatAlertVisible} = this.props;
        const hasError = chatError.length > 0;
        return (
            <React.Fragment>
                {hasError ?
                    <Alert color="danger" className={"sticky"} isOpen={chatAlertVisible} toggle={this.onDismiss}>
                        {chatError}
                    </Alert> : null}
                <Navbar color="faded" light>
                    <NavbarBrand href="/" className="mr-auto">Bork</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavBar} className="mr-2"/>
                    <Collapse isOpen={!this.props.collapsed} navbar>
                        <Nav navbar>
                            <ChatNavItems/>
                        </Nav>
                    </Collapse>
                </Navbar>
                {/* Load chats from Chats component */}
                <Chats/>
            </React.Fragment>
        )
    }
}

const ChatNavBar = connect(mapStateToProps, mapDispatchToProps)(ConnectedChatNavBar);
export default ChatNavBar;