import React, {Component} from 'react';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    ListGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    NavItem,
    Spinner
} from "reactstrap";
import {
    addChat,
    addContact,
    getContacts,
    removeContact,
    toggleAdded,
    toggleContactModal,
    toggleContacts,
    toggleGroupModal
} from "../actions/chat-actions";
import {connect} from "react-redux";
import ListGroupItem from "reactstrap/es/ListGroupItem";

function mapDispatchToProps(dispatch) {
    return {
        addChat: chat => dispatch(addChat(chat)),
        addContact: contact => dispatch(addContact(contact)),
        toggleGroupModal: () => dispatch(toggleGroupModal()),
        toggleContactModal: () => dispatch(toggleContactModal()),
        toggleAdded: () => dispatch(toggleAdded()),
        toggleContacts: () => dispatch(toggleContacts()),
        getContacts: () => dispatch(getContacts()),
        removeContact: contact_id => dispatch(removeContact(contact_id)),
        // dismissChatAlert: () => dispatch(dismissChatAlert())
    }
}

function mapStateToProps(state) {
    const {chatState} = state;
    return {
        groupModal: chatState.groupModal,
        contactModal: chatState.contactModal,
        added: chatState.added,
        add_msg: chatState.add_msg,
        contactsModal: chatState.contactsModal,
        isLoading: chatState.isLoading,
        contacts: chatState.contacts,
        // chatError: chatState.chatError,
        // chatAlertVisible: chatState.chatAlertVisible
    }
}

class ConnectedChatNavItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chatName: '',
            contactFirstName: '',
            contactLastName: '',
            contactPhoneNumber: '',
            contactEmail: '',
            group_members: [],
        };
    }

    toggleGroup = () => {
        this.props.toggleGroupModal();
        this.props.getContacts();
    };

    toggleContact = () => {
        this.props.toggleContactModal();
    };

    toggleAddedContact = () => {
        this.props.toggleAdded();
    };

    toggleGroupSubmit = () => {
        const {chatName, group_members} = this.state;
        this.props.addChat({chatName, group_members});
        this.toggleGroup();
    };

    toggleContactSubmit = () => {
        const {contactFirstName, contactLastName, contactPhoneNumber, contactEmail} = this.state;
        this.props.addContact({contactFirstName, contactLastName, contactPhoneNumber, contactEmail});
        this.toggleContact();
    };

    toggleContactList = () => {
        this.props.toggleContacts();
        this.props.getContacts();
    };

    removeContact = event => {
        const contact_id = event.target.value;
        this.props.removeContact(contact_id);
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
        this.setState({contactPhoneNumber: event.target.value})
    };

    handleMembersSelect = event => {
        const options = event.target.options;
        const values = [];
        for (var i = 0; i<options.length; i++){
            if (options[i].selected) {
                values.push(options[i].value);
            }
        }
        this.setState({group_members: values});
    };

    render() {
        const {add_msg, isLoading, contacts} = this.props;
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
                                    <Label for="users-add-chat">Select users to add</Label>
                                    <Input type="select" name="selectMulti" onChange={this.handleMembersSelect} multiple>
                                        {this.props.contacts.map(contact => {
                                            return (
                                                <option key={contact.uid} value={contact.uid}>{contact.first_name + " " + contact.last_name}</option>
                                            )

                                            })
                                        }
                                    </Input>

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
                        <ModalHeader>{add_msg}</ModalHeader>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggleAddedContact}>Ok</Button>
                        </ModalFooter>
                    </Modal>
                </NavItem>
                <NavItem>
                    <Button color="link" onClick={this.toggleContactList}>Contacts</Button>
                    <Modal isOpen={this.props.contactsModal} className={this.props.className}>
                        <ModalBody>
                            <ListGroup>
                                {!isLoading ? (
                                    contacts.map(contact => {
                                        return (<ListGroupItem key={"contact-" + contact.contact_id}
                                                               className="justify-content-between"
                                                               id={"contact-" + contact.contact_id}>
                                            <h5>{contact.first_name + " " + contact.last_name}</h5>
                                            <Button color="link" onClick={this.removeContact}
                                                    value={contact.uid}>Remove me</Button>
                                        </ListGroupItem>)
                                    })
                                ) : (<Spinner color="secondary"/>)}
                            </ListGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.toggleContactList}>Ok</Button>
                        </ModalFooter>
                    </Modal>
                </NavItem>
            </React.Fragment>
        )
    }
}


const ChatNavItems = connect(mapStateToProps, mapDispatchToProps)(ConnectedChatNavItems);
export default ChatNavItems;