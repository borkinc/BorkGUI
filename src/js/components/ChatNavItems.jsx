import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, NavItem} from "reactstrap";
import {addChat, toggleContactModal, toggleGroupModal, addContact, toggleAdded} from "../actions/chat-actions";
import {connect} from "react-redux";
import { withSnackbar } from 'notistack';

function mapDispatchToProps(dispatch) {
    return {
        addChat: chat => dispatch(addChat(chat)),
        addContact: contact => dispatch(addContact(contact)),
        toggleGroupModal: () => dispatch(toggleGroupModal()),
        toggleContactModal: () => dispatch(toggleContactModal()),
        toggleAdded: () => dispatch(toggleAdded())
    }
}

function mapStateToProps(state) {
    const {chatState} = state;
    return {
        groupModal: chatState.groupModal,
        contactModal: chatState.contactModal,
        added: chatState.added
    }
}

class ConnectedChatNavItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chatName: '',
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
        };
    }

    toggleGroup = () => {
        this.props.toggleGroupModal();
    };

    toggleContact = () => {
        this.props.toggleContactModal();
    };

    toggleAddedContact = () => {
        this.props.toggleAdded();
    };

    toggleGroupSubmit = () => {
        const {chatName} = this.state;
        this.props.addChat(chatName);
        this.toggleGroup();
    };

    toggleContactSubmit = () => {
        const {first_name, last_name, phone, email} = this.state;
        this.props.addContact({first_name, last_name, phone, email});
        this.toggleContact();
    };

    handleChatNameChange = event => {
        this.setState({chatName: event.target.value})
    };

    handleContactFirstNameChange = event => {
        this.setState({contactFirstName: event.target.value})
    };

    handleContactLastNameChange = event => {
        this.setState({contactLastName: event.target.value})
    };

    handleContactEmailChange = event => {
        this.setState({contactEmail: event.target.value})
    };

    handleContactPhoneNumberChange = event => {
        this.setState({contactPhoneNumberName: event.target.value})
    };

    render() {
        if(this.state.added === true){
            this.props.enqueueSnackbar('Added Contact');
            this.state.added = false;
        }
        if(this.state.not_added === true){
            this.props.enqueueSnackbar('Did not add contact');
            this.state.not_added = false;
        }

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
                                    <Label for="new-chat-group">First Name</Label>
                                    <Input type="text" name="chat-contact" id="id_contact_first_name"
                                           placeholder="Enter first name..."
                                           onChange={this.handleContactFirstNameChange}/>
                                    <Label for="new-chat-group">Last Name</Label>
                                    <Input type="text" name="chat-contact" id="id_contact_last_name"
                                           placeholder="Enter last name..."
                                           onChange={this.handleContactLastNameChange}/>
                                    <Label for="new-chat-group">Phone Number</Label>
                                    <Input type="text" name="chat-contact" id="id_contact_phone_number"
                                           placeholder="Enter phone number..."
                                           onChange={this.handleContactPhoneNumberChange}/>
                                    <Label for="new-chat-group">Email</Label>
                                    <Input type="text" name="chat-contact" id="id_contact_email"
                                           placeholder="Enter email..."
                                           onChange={this.handleContactEmailChange}/>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggleContactSubmit}>Create
                                Contact</Button>{' '}
                            <Button color="secondary" onClick={this.toggleContact}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.props.added} className={this.props.className}>
                        <ModalHeader>Added contact</ModalHeader>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggleAddedContact}>Ok</Button>
                        </ModalFooter>
                    </Modal>
                </NavItem>
            </React.Fragment>
        )
    }
}

const ChatNavItems = connect(mapStateToProps, mapDispatchToProps)(ConnectedChatNavItems);
export default ChatNavItems;