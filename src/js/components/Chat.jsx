import React, {Component} from 'react';
import '../../css/Chat.css';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardImg,
    CardText,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    ListGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    UncontrolledButtonDropdown
} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    addUserToGroup,
    dislikeMessage,
    getChatMessages,
    getContacts,
    likeMessage,
    postMessage,
    removeUserFromGroup,
    toggleAddUser,
    toggleAttachment
} from "../actions/chat-actions";
import {connect} from "react-redux";
import Moment from "react-moment";
import jstz from "jstimezonedetect";
import 'moment-timezone';
import TimerMixin from "react-timer-mixin"

import ImageUploader from 'react-images-upload';
import ListGroupItem from "reactstrap/es/ListGroupItem";


function mapDispatchToProps(dispatch) {
    return {
        getChatMessages: chatID => dispatch(getChatMessages(chatID)),
        likeMessage: userMessageID => dispatch(likeMessage(userMessageID)),
        dislikeMessage: userMessageID => dispatch(dislikeMessage(userMessageID)),
        postMessage: message => dispatch(postMessage(message)),
        toggleAttachment: () => dispatch(toggleAttachment()),
        getContacts: () => dispatch(getContacts()),
        toggleAddUser: () => dispatch(toggleAddUser()),
        addUserToGroup: contactID => dispatch(addUserToGroup(contactID)),
        removeUserFromGroup: contactID => dispatch(removeUserFromGroup(contactID))
    }
}

function mapStateToProps(state) {
    const {chatState} = state;
    return {
        chatMessages: chatState.chatMessages,
        chatID: chatState.chatID,
        attachmentModal: chatState.attachmentModal,
        addUserModal: chatState.addUserModal,
        contacts: chatState.contacts
    }
}

class ConnectedChat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            picture: null,
            username: ''
        }
    }

    componentDidMount() {
        const {chatID} = this.props;
        this.timer = TimerMixin.setInterval(
            () => {
                this.props.getChatMessages(chatID)
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

    toggleAddUser = () => {
        this.props.toggleAddUser();
        this.props.getContacts();
    };

    // toggleUserSubmit = event => {
    //     event.preventDefault();
    //     this.toggleAddUser();
    // };

    addContact = event => {
        event.preventDefault();
        const {chatID} = this.props;
        this.props.addUserToGroup({chatID: chatID, contactID: event.target.value});
    };

    removeContact = event => {
        event.preventDefault();
        const {chatID} = this.props;
        this.props.removeUserFromGroup({chatID: chatID, contactID: event.target.value});
    };

    renderMessage = m => {
        const {mid, created_on, message, uid, likes, dislikes, image} = m;
        const date = new Date(created_on);
        const tz = jstz.determine().name();
        const currentUser = JSON.parse(localStorage.getItem('user')).uid;
        const messageFromMe = uid === currentUser;
        const msgContentDate = <span className={"msg-content-date"}><Moment tz={tz} fromNow>{date}</Moment></span>;
        const hasImage = image != null;
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
        const {chatMessages, contacts} = this.props;
        return <React.Fragment>
            <UncontrolledButtonDropdown className={"float-right"}>
                <DropdownToggle>
                    <FontAwesomeIcon icon={"ellipsis-h"}/>
                </DropdownToggle>
                <DropdownMenu>
                    {/*<DropdownItem header>Header</DropdownItem>*/}
                    {/*<DropdownItem disabled>Action</DropdownItem>*/}
                    <DropdownItem onClick={this.toggleAddUser}>Add user to group</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
            </UncontrolledButtonDropdown>
            <Modal isOpen={this.props.addUserModal} toggle={this.toggleAddUser}
                   className={this.props.className}>
                <ModalHeader toggle={this.toggleAddUser}>Add user</ModalHeader>
                <ModalBody>
                    <ListGroup>
                        {contacts.map(contact =>
                            <ListGroupItem key={"add-contact-" + contact.contact_id} className="justify-content-between"
                                           id={"contact-" + contact.contact_id}>
                                <h5>{contact.first_name + " " + contact.last_name}</h5>
                                <Button color="link" onClick={this.addContact}
                                        value={contact.uid}>Add to group</Button>
                                <Button color="link" onClick={this.removeContact}
                                        value={contact.uid}>Remove from group</Button>
                            </ListGroupItem>)}
                    </ListGroup>
                </ModalBody>
                <ModalFooter>
                    {/*<Button color="primary" onClick={this.toggleUserSubmit}>Add user</Button>*/}
                    {/*<Button color="secondary" onClick={this.toggleAddUser}>Cancel</Button>*/}
                </ModalFooter>
            </Modal>
            <div className={"chat-messages"}>
                <div className={"chat-history"}>
                    {chatMessages.map(m => this.renderMessage(m))}
                </div>
            </div>
            <div className={"msg-input"}>
                <InputGroup>
                    <Input value={this.state.message} onChange={this.handleMessage}/>
                    <InputGroupAddon addonType="append">
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
                        <Button color="secondary" onClick={this.postMessage}><FontAwesomeIcon
                            icon={"paper-plane"}/></Button>
                    </InputGroupAddon>
                </InputGroup>
                <br/>
            </div>

        </React.Fragment>
    }
}

const Chat = connect(mapStateToProps, mapDispatchToProps)(ConnectedChat);
export default Chat;