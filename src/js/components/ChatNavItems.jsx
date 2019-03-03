import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, NavItem} from "reactstrap";
import {addChat, toggleContactModal, toggleGroupModal} from "../actions/chat-actions";
import {connect} from "react-redux";

function mapDispatchToProps(dispatch) {
    return {
        addChat: chat => dispatch(addChat(chat)),
        toggleGroupModal: () => dispatch(toggleGroupModal()),
        toggleContactModal: () => dispatch(toggleContactModal())
    }
}

function mapStateToProps(state) {
    const {chatState} = state;
    return {
        groupModal: chatState.groupModal,
        contactModal: chatState.contactModal
    }
}

class ConnectedChatNavItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chatName: ''
        };
    }

    toggleGroup = () => {
        this.props.toggleGroupModal();
    };

    toggleContact = () => {
        this.props.toggleContactModal();
    };

    toggleGroupSubmit = () => {
        const {chatName} = this.state;
        this.props.addChat(chatName);
        this.toggleGroup();
    };

    toggleContactSubmit = () => {
        const {chatName} = this.state;
        this.props.addChat(chatName);
        this.toggleContact();
    };

    handleChatNameChange = event => {
        this.setState({chatName: event.target.value})
    };

    render() {
        return (
            <React.Fragment>
                <NavItem>
                    <Button color="link" onClick={this.toggleGroup}>New group</Button>
                    <Modal isOpen={this.props.groupModal} toggle={this.toggleGroup}
                           className={this.props.className}>
                        <ModalHeader toggle={this.toggleGroup}>Create New Group</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="new-chat-group">Group name</Label>
                                    <Input type="text" name="chat-group" id="new-chat-group"
                                           placeholder="Enter group name..."
                                           onChange={this.handleChatNameChange}/>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggleGroupSubmit}>Create
                                Group</Button>{' '}
                            <Button color="secondary" onClick={this.toggleGroup}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </NavItem>
                <NavItem>
                    <Button color="link" onClick={this.toggleContact}>New contact</Button>
                    <Modal isOpen={this.props.contactModal} toggle={this.toggleContact}
                           className={this.props.className}>
                        <ModalHeader toggle={this.toggleContact}>Create new contact</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="new-chat-group">Contact name</Label>
                                    <Input type="text" name="chat-contact" id="new-chat-contact"
                                           placeholder="Enter contact name..."
                                           onChange={this.handleChatNameChange}/>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggleContactSubmit}>Create
                                Contact</Button>{' '}
                            <Button color="secondary" onClick={this.toggleContact}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </NavItem>
            </React.Fragment>
        )
    }
}

const ChatNavItems = connect(mapStateToProps, mapDispatchToProps)(ConnectedChatNavItems);
export default ChatNavItems;