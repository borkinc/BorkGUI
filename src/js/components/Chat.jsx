import React, {Component} from 'react';
import '../../css/Chat.css';
import {Badge, Button, Card, CardBody, CardImg, CardText, Input, InputGroup, InputGroupAddon} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {dislikeMessage, getChatMessages, likeMessage, postMessage} from "../actions/chat-actions";
import {connect} from "react-redux";
import Moment from "react-moment";
import jstz from "jstimezonedetect";
import 'moment-timezone';
import TimerMixin from "react-timer-mixin"


function mapDispatchToProps(dispatch) {
    return {
        getChatMessages: chatID => dispatch(getChatMessages(chatID)),
        likeMessage: userMessageID => dispatch(likeMessage(userMessageID)),
        dislikeMessage: userMessageID => dispatch(dislikeMessage(userMessageID)),
        postMessage: message => dispatch(postMessage(message))
    }
}

function mapStateToProps(state) {
    const {chatState} = state;
    return {
        chatMessages: chatState.chatMessages,
        chatID: chatState.chatID
    }
}

class ConnectedChat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    componentDidMount() {
        this.timer = TimerMixin.setInterval(
            () => {
                this.props.getChatMessages(this.props.chatID)
            }, 500)
    }

    componentWillUnmount() {
        TimerMixin.clearTimeout(this.timer);
    }

    toggleLike = (userID, messageID) => {
        this.props.likeMessage({userID, messageID});
    };

    toggleDisLike = (userID, messageID) => {
        this.props.dislikeMessage({userID, messageID})
    };

    handleMessage = (event) => {
        this.setState({message: event.target.value})
    };

    postMessage = (event) => {
        event.preventDefault();
        const message = this.state.message;
        const userID = parseInt(localStorage.getItem('uid'));
        let date = new Date();
        this.props.postMessage(
            {
                message: message, chatID: this.props.chatID,
                userID: userID,
                datePosted: date
            });
        this.setState({message: ''});
    };

    renderMessage = m => {
        const {mid, created_on, message, uid, likes, dislikes, image} = m;
        const date = new Date(created_on);
        const tz = jstz.determine().name();
        const currentUser = parseInt(localStorage.getItem('uid'));
        const messageFromMe = uid === currentUser;
        const msgContentDate = <span className={"msg-content-date"}><Moment tz={tz} fromNow>{date}</Moment></span>;
        const hasImage = image != null;
        return (
            <React.Fragment key={mid}>
                {!messageFromMe ? (
                    <div className={"incoming-msg"}>
                        <div className={"incoming-msg-img"}>
                            <FontAwesomeIcon icon="user-circle"/>
                        </div>
                        <div className={"received-msg"}>
                            <Card>
                                {hasImage ? <CardImg top width="100%"
                                                     src={`${process.env.REACT_APP_API_URL}${image}`}
                                                     alt="Card image cap"/>
                                    : <br/>}
                                <CardBody>
                                    <CardText>{message}</CardText>
                                    <Button onClick={() => this.toggleLike(uid, mid)}>
                                        <FontAwesomeIcon icon={"thumbs-up"}/>
                                        <Badge color="secondary">{likes}</Badge>
                                    </Button>
                                    <Button onClick={() => this.toggleDisLike(uid, mid)}>
                                        <FontAwesomeIcon icon={"thumbs-down"}/>
                                        <Badge color="secondary">{dislikes}</Badge>
                                    </Button>
                                    {msgContentDate}
                                </CardBody>
                            </Card>
                        </div>

                    </div>) : (
                    <div className={"outgoing-msg"}>
                        <div className={"sent-msg"}>
                            <Card>
                                {/*TODO: Detect if message has image to display in chat.*/}
                                {/*<CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />*/}
                                <CardBody>
                                    <CardText>{message}</CardText>
                                    <Button onClick={() => this.toggleLike(uid, mid)}>
                                        <FontAwesomeIcon icon={"thumbs-up"}/>
                                        <Badge color="secondary">{likes.length}</Badge>
                                    </Button>
                                    <Button onClick={() => this.toggleDisLike(uid, mid)}>
                                        <FontAwesomeIcon icon={"thumbs-down"}/>
                                        <Badge color="secondary">{dislikes.length}</Badge>
                                    </Button>
                                    {msgContentDate}
                                </CardBody>
                            </Card>
                        </div>
                    </div>)}
            </React.Fragment>
        );
    };

    render() {
        return (
            <React.Fragment>
                {/*<h2 className={"text-center"}>Chatting with {this.props.name}</h2>*/}
                <div className={"chat-messages"}>
                    <div className={"chat-history"}>
                        {this.props.chatMessages.map(m => this.renderMessage(m))}
                    </div>
                </div>
                <div className={"msg-input"}>
                    <InputGroup>
                        <Input value={this.state.message} onChange={this.handleMessage}/>
                        <InputGroupAddon addonType="append">
                            <Button color="secondary" onClick={this.postMessage}><FontAwesomeIcon icon={"paper-plane"}/></Button>
                        </InputGroupAddon>
                    </InputGroup>
                    <br/>
                </div>

            </React.Fragment>
        )
    }
}

const Chat = connect(mapStateToProps, mapDispatchToProps)(ConnectedChat);
export default Chat;