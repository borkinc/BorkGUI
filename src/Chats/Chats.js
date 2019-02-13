import React, {Component} from 'react';
import './Chats.css'
import {Col, Input, InputGroup, InputGroupAddon, InputGroupText, ListGroup, ListGroupItem} from "reactstrap";
import axios from "axios";
import API_URL from '../index'
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";
import dog from "../img/dog.svg";
import Chat from "../Chat/Chat";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default class Chats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            isLoading: true,
            errors: null,
            chatName: '',
            isChatting: false
        };
        this.toggleChat = this.toggleChat.bind(this);
    }

    componentDidMount() {
        // Fetches all chat groups from API to be rendered
        axios.get(API_URL + "/chats").then(response =>
            // Maps response data to array
            response.data.results.map(chat => ({
                name: `${chat.chat_name}`,
                id: `${chat.id}`,
            }))
        ).then(chats => {
            this.setState({
                chats,
                isLoading: false
            });
        }).catch(error => this.setState({error, isLoading: false}));
    }

    toggleChat = event => {
        this.setState({
            isChatting: true,
            chatName: event.target.value
        });
        console.log(event.target.id);
        let chatActive = document.getElementsByClassName("chat-active");
        if (chatActive.length > 0) {
            chatActive[0].classList.remove("chat-active");
        }
        document.getElementById(event.target.id).classList.add("chat-active");
    };

    render() {
        return (
            <React.Fragment>
                <Container className={"chats"}>
                    <div className={"chat-box"}>
                        <Row>
                            <Col xs="6" sm="4" className={"chat-inbox"}>
                                <InputGroup className={"chat-header"}>
                                    <h4 className={"chat-heading"}>Recent</h4>
                                    <Input className={"chat-searchbar"} placeholder={"Search"}
                                           style={{"boxShadow": "none"}}/>
                                    <InputGroupAddon addonType="append">
                                        <InputGroupText className={"search-icon"}><FontAwesomeIcon
                                            icon="search"/></InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                <ListGroup className={"chat-groups"}>
                                    {!this.state.isLoading ? (
                                        this.state.chats.map(chat => {
                                            return (
                                                <ListGroupItem className="justify-content-between" tag="button"
                                                               action key={chat.id} id={"chat-" + chat.id}
                                                               onClick={this.toggleChat} value={chat.name}>
                                                    <div className={"chat-group"}>
                                                        <div className={"chat-img"}>
                                                            <FontAwesomeIcon icon="user-circle"/>
                                                        </div>
                                                        <div className={"chat-ib"}>
                                                            <h5>{chat.name}
                                                                <span className={"chat-date"}>25 Dec</span>
                                                            </h5>
                                                            <p>This is a test message!</p>
                                                        </div>
                                                    </div>
                                                    {/*<Badge pill>0</Badge>*/}
                                                </ListGroupItem>);
                                        })
                                    ) : (<p>Loading......</p>)}
                                </ListGroup>
                            </Col>
                            {/*Edit this part for chat messages*/}
                            <Col className="chats-container">
                                {this.state.isChatting ? (<Chat name={this.state.chatName}/>) : (
                                    <img src={dog} className="UserAuth-logo" alt=""/>)}
                            </Col>
                        </Row></div>
                </Container>
            </React.Fragment>
        )
            ;
    }
}
