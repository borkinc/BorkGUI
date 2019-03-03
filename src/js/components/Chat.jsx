import React, {Component} from 'react';
import '../../css/Chat.css';
import {Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getChatMessages} from "../actions/chat-actions";
import {connect} from "react-redux";

function mapDispatchToProps(dispatch) {
    return {
        getChatMessages: chatID => dispatch(getChatMessages(chatID))
    }
}

function mapStateToProps(state) {
    const {chatState} = state;
    return {
        chatMessages: chatState.chatMessages
    }
}

class ConnectedChat extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getChatMessages(this.props.chatID)
    }

    renderMessage = message => {
        const currentUser = localStorage.getItem('user_id');
        const messageFromMe = message.user_id === currentUser;
        let msgContentDate = <span className={"msg-content-date"}> 11:01 AM    |    June 9</span>;
        return (
            <React.Fragment key={message.message_id}>
                {!messageFromMe ? (
                    <div className={"incoming-msg"}>
                        <div className={"incoming-msg-img"}>
                            <FontAwesomeIcon icon="user-circle"/>
                        </div>
                        <div className={"received-msg"}>
                            <div className={"msg-content"}>
                                <p>{message.message}</p>
                                {msgContentDate}
                            </div>
                        </div>
                    </div>) : (
                    <div className={"outgoing-msg"}>
                        <div className={"sent-msg"}>
                            <p>{message.message}</p>
                            {msgContentDate}
                        </div>
                    </div>)}
            </React.Fragment>
        )
            ;
    };

    render() {
        return (
            <React.Fragment>
                {/*<h2 className={"text-center"}>Chatting with {this.props.name}</h2>*/}
                <div className={"chat-messages"}>
                    <div className={"chat-history"}>
                        {this.props.chatMessages.map(m => this.renderMessage(m))}
                        <div className={"msg-input"}>
                            <InputGroup>
                                <Input/>
                                <InputGroupAddon addonType="append">
                                    <Button color="secondary">To the Right!</Button>
                                </InputGroupAddon>
                            </InputGroup>
                            <br/>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

const Chat = connect(mapStateToProps, mapDispatchToProps)(ConnectedChat);
export default Chat;