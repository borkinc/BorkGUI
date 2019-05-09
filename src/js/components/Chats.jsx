import React, {Component} from 'react';
import '../../css/Chats.css'
import {Col, Input, InputGroup, InputGroupAddon, InputGroupText, ListGroup, ListGroupItem, Spinner} from "reactstrap";
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";
import Chat from "./Chat.jsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {filterChats, getChats, toggleChat} from "../actions/chat-actions";
import {connect} from "react-redux";
import TimerMixin from "react-timer-mixin";
import {Scrollbars} from 'react-custom-scrollbars'
import 'simplebar/dist/simplebar.min.css';

function mapDispatchToProps(dispatch) {
    return {
        toggleChat: chat => dispatch(toggleChat(chat)),
        getChats: () => dispatch(getChats()),
        filterChats: (search) => dispatch(filterChats(search))
    }
}

function mapStateToProps(state) {
    const {chatState} = state;
    return {
        isChatting: chatState.isChatting,
        chats: chatState.chats,    // keys = [cid, name, participants]
        isLoading: chatState.isLoading,
        filteredChats: chatState.filteredChats
    }
}

class ConnectedChats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    componentDidMount() {
        this.timer = TimerMixin.setInterval(
            () => {
                this.props.getChats()
            }, 3000)
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
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

    handleSearch = (event) => {
        this.props.filterChats(event.target.value);
    };

    render() {
        const {isLoading, filteredChats, isChatting} = this.props;
        const chatsHTML = filteredChats !== undefined ? <ListGroup className={"chat-groups"}>
            {!isLoading ? filteredChats.map(chat => {
                const chatDate = new Date(chat.created_on).toDateString();
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
                                    <span className={"chat-date"}>{chatDate}</span>
                                </h5>
                                <p>{chat.message}</p>
                            </div>
                        </div>
                        {/*<Badge pill>0</Badge>*/}
                    </ListGroupItem>);
            }) : <Spinner color="secondary"/>}
        </ListGroup> : null;
        return <React.Fragment>
            <Container className={"chats"}>
                <div className={"chat-box"}>
                    <Row>
                        <Col xs="6" sm="4" className={"chat-inbox"}>
                            <InputGroup className={"chat-header"}>
                                <h4 className={"chat-heading"}>Recent</h4>
                                <Input className={"chat-searchbar"} placeholder={"Search"}
                                       style={{"boxShadow": "none"}} onChange={this.handleSearch}/>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText className={"search-icon"}><FontAwesomeIcon
                                        icon="search"/></InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            <Scrollbars style={{height: "calc(100vh - 115px)"}}>
                                {chatsHTML}
                            </Scrollbars>
                        </Col>
                        {/*Edit this part for chat messages*/}
                        <Col className="chats-container">
                            {isChatting ? <Chat/> : null}
                        </Col>
                    </Row></div>
            </Container>
        </React.Fragment>
            ;
    }
}

const Chats = connect(mapStateToProps, mapDispatchToProps)(ConnectedChats);
export default Chats;

