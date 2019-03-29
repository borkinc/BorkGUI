import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, NavItem} from "reactstrap";
import axios from "axios";
import API_URL from "../index";

export default class ChatNavItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalGroup: false,
            modalContact: false,
        };
        // this.toggleGroup = this.toggleGroup.bind(this);
        this.toggleContact = this.toggleContact.bind(this);
        // this.toggleGroupSubmit = this.toggleGroupSubmit.bind(this);
        this.toggleContactSubmit = this.toggleContactSubmit.bind(this);
    }

    toggleGroup = () => {
        // Hides/displays "New Group" modal
        this.setState(prevState => ({
            modalGroup: !prevState.modalGroup
        }));
    }

    toggleContact() {
        // Hides/display "New Contact" modal
        this.setState(prevState => ({
            modalContact: !prevState.modalContact
        }));
    }

    toggleGroupSubmit = () => {
        // Dummy post to API to simulate adding a new group chat
        axios.post(API_URL + "/chats").then(response => {
            this.toggleGroup();
            this.props.onNewChat(response.data.chat);
        });
    }

    toggleContactSubmit() {
        // Dummy post to API to simulate adding a new contact
        axios.post(API_URL + "/chats").then(response => {
            this.toggleContact();
            this.setState({chats: [...this.state.chats, response.data.chat]})
        });
    }

    handleChatNameChange = event => {
        this.setState({chatName: event.target.value})
    };

    render() {
        return (
            <React.Fragment>
                <NavItem>
                    <Button color="link" onClick={this.toggleGroup}>New group</Button>
                    <Modal isOpen={this.state.modalGroup} toggle={this.toggleGroup}
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
                    <Modal isOpen={this.state.modalContact} toggle={this.toggleContact}
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