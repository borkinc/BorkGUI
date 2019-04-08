import React, {Component} from 'react';
import '../../css/Chat.css';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardImg,
    CardText,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    NavItem
} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {dislikeMessage, getChatMessages, likeMessage, postMessage, toggleAttachment} from "../actions/chat-actions";
import {connect} from "react-redux";
import Moment from "react-moment";
import jstz from "jstimezonedetect";
import 'moment-timezone';
import TimerMixin from "react-timer-mixin"

import ImageUploader from 'react-images-upload';


function mapDispatchToProps(dispatch) {
    return {
        getChatMessages: chatID => dispatch(getChatMessages(chatID)),
        likeMessage: userMessageID => dispatch(likeMessage(userMessageID)),
        dislikeMessage: userMessageID => dispatch(dislikeMessage(userMessageID)),
        postMessage: message => dispatch(postMessage(message)),
        toggleAttachment: () => dispatch(toggleAttachment())
    }
}

function mapStateToProps(state) {
    const {chatState} = state;
    return {
        chatMessages: chatState.chatMessages,
        chatID: chatState.chatID,
        attachmentModal: chatState.attachmentModal
    }
}

class ConnectedChat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            picture: null
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
        if (message) {
            if (message.replace(/\s/g, '').length) {
                this.props.postMessage(
                    {
                        message: message,
                        chatID: this.props.chatID,
                        userID: userID,
                        datePosted: date,
                        picture: this.state.picture
                    });
            }
        }
        this.setState({message: '', picture: null});
    };

    onDrop = (picture) => {
        this.setState({
            picture: picture[0],
        });
    };

    toggleAttachment = () => {
        this.props.toggleAttachment();
    };

    toggleAttachmentSubmit = (event) => {
        event.preventDefault();
        this.toggleAttachment();
    };

    toggleAttachmentCancel = (event) => {
        event.preventDefault();
        this.setState({
            picture: null
        });
        this.toggleAttachment();
    };

    renderMessage = m => {
        const {mid, created_on, message, uid, likes, dislikes, image} = m;
        const date = new Date(created_on);
        const tz = jstz.determine().name();
        const currentUser = parseInt(localStorage.getItem('uid'));
        const messageFromMe = uid === currentUser;
        const msgContentDate = <span className={"msg-content-date"}><Moment tz={tz} fromNow>{date}</Moment></span>;
        const hasImage = image != null;
        let imgSource = null;
        let imgHTML = null;
        if (hasImage) {
            if (typeof image.name == 'string') {
                imgHTML =
                    <CardImg top height="100%" width="100%" src={URL.createObjectURL(image)} alt="Card image cap"/>
            } else {
                imgHTML = <CardImg top height="100%" width="100%"
                                   src={`${process.env.REACT_APP_API_URL}${image}`}
                                   alt="Card image cap"/>
            }
        }
        return (
            <React.Fragment key={mid}>
                {!messageFromMe ? (
                    <div className={"incoming-msg"}>
                        <div className={"incoming-msg-img"}>
                            <FontAwesomeIcon icon="user-circle"/>
                        </div>
                        <div className={"received-msg"}>
                            <Card>
                                {hasImage ? imgHTML : <br/>}
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
                                {hasImage ? imgHTML : <br/>}
                                <CardBody>
                                    {/*{recentImage ? <CardImg top height="100%" width="100%" src={imgSource}*/}
                                    {/*                        alt="Card image cap"/> : <br/>}*/}
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
                            <NavItem>
                                <Button color="secondary" onClick={this.toggleAttachment}><FontAwesomeIcon
                                    icon={"paperclip"}/></Button>
                                <Modal isOpen={this.props.attachmentModal} toggle={this.toggleAttachment}
                                       className={this.props.className}>
                                    <ModalHeader toggle={this.toggleAttachment}>Add image/video</ModalHeader>
                                    <ModalBody>
                                        <Form>
                                            <FormGroup>
                                                <ImageUploader
                                                    withIcon={true}
                                                    buttonText='Choose images'
                                                    onChange={this.onDrop}
                                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                                    maxFileSize={5242880}
                                                    withPreview={true}
                                                />
                                            </FormGroup>
                                        </Form>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.toggleAttachmentSubmit}>Add
                                            Attachment</Button>
                                        <Button color="secondary" onClick={this.toggleAttachmentCancel}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                            </NavItem>
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