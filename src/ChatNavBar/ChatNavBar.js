import React, {Component} from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler} from "reactstrap";
import ChatNavItems from "../ChatNavItems/ChatNavItems";
import axios from "axios";
import API_URL from "../index";
import Chats from "../Chats/Chats";

export default class ChatNavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chats: [],
            collapsed: true,
            isLoading: true
        };
        this.toggleNavBar = this.toggleNavBar.bind(this)
    }

    componentDidMount() {
        // Fetches all chat groups from API to be rendered
        console.log("Running axios");
        axios.get(API_URL + '/chats').then(response => {
            this.setState({
                chats: response.data.chats,    // Keys = [id, chat_name]
                isLoading: false
            })
        })

        // axios.get(API_URL + "/chats").then(response =>
        //     // Maps response data to array
        //     response.data.results.map(chat => ({
        //         name: `${chat.chat_name}`,
        //         id: `${chat.id}`,
        //     }))
        // ).then(chats => {
        //     this.setState({
        //         chats,
        //         isLoading: false
        //     });
        // }).catch(error => this.setState({error, isLoading: false}));
    }

    handleChats = (chat) => {
        this.setState({chats: [...this.state.chats, chat]});
    };

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
                            <ChatNavItems onNewChat={this.handleChats}/>
                        </Nav>
                    </Collapse>
                </Navbar>
                {/* Load chats from Chats component */}
                <Chats isLoading={this.state.isLoading} chats={this.state.chats}/>
            </React.Fragment>
        )
    }
}