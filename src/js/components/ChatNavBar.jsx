import React, {Component} from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler} from "reactstrap";
import ChatNavItems from "./ChatNavItems.jsx";
import Chats from "./Chats.jsx";
import {connect} from "react-redux";
import {toggleNavBar} from "../actions/chat-actions";

function mapDispatchToProps(dispatch) {
    return {
        toggleNavBar: () => dispatch(toggleNavBar())
    }
}

function mapStateToProps(state) {
    const {chatState} = state;
    return {
        collapsed: chatState.collapsed
    }
}

class ConnectedChatNavBar extends Component {

    constructor(props) {
        super(props);
    }

    toggleNavBar = () => {
        this.props.toggleNavBar();
    };

    render() {
        return (
            <React.Fragment>
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