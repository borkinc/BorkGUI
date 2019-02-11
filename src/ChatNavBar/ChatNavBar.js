import React, {Component} from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler} from "reactstrap";
import Chats from "../Chats/Chats";
import ChatNavItems from "../ChatNavItems/ChatNavItems";

export default class ChatNavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            collapsed: true
        };
        this.toggleNavBar = this.toggleNavBar.bind(this)
    }

    toggleNavBar() {
        // Hides/ displays navbar
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <React.Fragment>
                <Navbar color="faded" light>
                    <NavbarBrand href="/" className="mr-auto">Bork</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavBar} className="mr-2"/>
                    <Collapse isOpen={!this.state.collapsed} navbar>
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