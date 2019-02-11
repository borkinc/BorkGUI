import React, {Component} from 'react';
import './Chats.css'
import {Badge, Col, ListGroup, ListGroupItem} from "reactstrap";
import axios from "axios";
import API_URL from '../index'
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";
import dog from "../img/dog.svg";
import Chat from "../Chat/Chat";

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
        })
    };

    render() {
        return (
            <React.Fragment>
                <Container fluid={true}>
                    <Row>
                        <Col xs="6" sm="4">
                            <ListGroup>
                                {!this.state.isLoading ? (
                                    this.state.chats.map(chat => {
                                        return (
                                            <ListGroupItem className="justify-content-between" tag="button"
                                                           action key={chat.id} id={"chat-" + chat.id}
                                                           onClick={this.toggleChat} value={chat.name}>{chat.name}
                                                <Badge pill>0</Badge>
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
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}
