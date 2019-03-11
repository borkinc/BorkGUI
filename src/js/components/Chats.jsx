import React, {Component} from 'react';
import '../../css/Chats.css'
import {Col, Input, InputGroup, InputGroupAddon, InputGroupText, ListGroup, ListGroupItem, Spinner} from "reactstrap";
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";
import Chat from "./Chat.jsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {getChats, toggleChat} from "../actions/chat-actions";
import {connect} from "react-redux";

function mapDispatchToProps(dispatch) {
    return {
        toggleChat: chat => dispatch(toggleChat(chat)),
        getChats: () => dispatch(getChats())
    }
}

function mapStateToProps(state) {
    const {chatState} = state;
    return {
        isChatting: chatState.isChatting,
        chats: chatState.chats,    // keys = [cid, name, participants]
        isLoading: chatState.isLoading
    }
}

class ConnectedChats extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getChats()
    }

    toggleChat(chatID, chatName) {
        this.props.toggleChat({chatID, chatName});

        // Using javascript to change background color of selected chat
        let chatActive = document.getElementsByClassName("chat-active");
        if (chatActive.length > 0) {
            chatActive[0].classList.remove("chat-active");
        }
        document.getElementById("chat-" + chatID).classList.add("chat-active");
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
                                    {!this.props.isLoading ? (
                                        this.props.chats.map(chat => {
                                            return (
                                                <ListGroupItem className="justify-content-between" tag="button"
                                                               action key={chat.cid} id={"chat-" + chat.cid}
                                                               onClick={() => this.toggleChat(chat.cid, chat.name)}
                                                               value={chat.name}>
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
                                    ) : (<Spinner color="secondary"/>)}
                                </ListGroup>
                            </Col>
                            {/*Edit this part for chat messages*/}
                            <Col className="chats-container">
                                {this.props.isChatting ? (<Chat/>) : (
                                    <br/>)
                                }
                            </Col>
                        </Row></div>
                </Container>
            </React.Fragment>
        )
            ;
    }
}

const Chats = connect(mapStateToProps, mapDispatchToProps)(ConnectedChats);
export default Chats;
