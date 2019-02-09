import React, {Component} from 'react';
import './Chats.css'
import {
    Badge,
    Button,
    Col,
    Collapse,
    Form,
    FormGroup,
    Input,
    Label,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem
} from "reactstrap";
import axios from "axios";
import API_URL from '../index'
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";

export default class Chats extends Component {

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            modalGroup: false,
            modalContact: false,
            chats: [],
            isLoading: true,
            errors: null,
            chatName: ''
        };
        this.toggleGroup = this.toggleGroup.bind(this);
        this.toggleGroupSubmit = this.toggleGroupSubmit.bind(this);
        this.toggleContact = this.toggleContact.bind(this);
        this.toggleContactSubmit = this.toggleContactSubmit.bind(this);
    }

    toggleNavbar() {
        // Hides/displays navbar
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    toggleGroup() {
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

    componentDidMount() {
        // Fetches all chat groups from API to be rendered
        axios.get(API_URL + "/chats").then(response =>
            // Maps response data to array
            response.data.results.map(chat => ({
                name: `${chat.chat_name}`,
                id: `${chat.id}`,
            }))
        ).then(chats => {
            this.setState({
                chats,
                isLoading: false
            });
        }).catch(error => this.setState({error, isLoading: false}));
    }

    handleChatNameChange = event => {
        this.setState({chatName: event.target.value})
    };

    toggleGroupSubmit() {
        // Dummy post to API to simulate adding a new group chat
        axios.post(API_URL + "/chats").then(response => {
            console.log(response.data);
            this.toggleGroup();
            this.setState({chats: [...this.state.chats, response.data.chat]})
        });
    }

    toggleContactSubmit() {
        // Dummy post to API to simulate adding a new contact
        axios.post(API_URL + "/chats").then(response => {
            console.log(response.data);
            this.toggleContact();
            this.setState({chats: [...this.state.chats, response.data.chat]})
        });
    }

    render() {
        return (
            <div>
                <Navbar color="faded" light>
                    <NavbarBrand href="/" className="mr-auto">Bork</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar>
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
                        </Nav>
                    </Collapse>
                </Navbar>
                <Container fluid="true">
                    <Row>
                        <Col xs="6" sm="4">
                            <ListGroup>
                                {!this.state.isLoading ? (
                                    this.state.chats.map(chat => {
                                        return (<ListGroupItem className="justify-content-between" tag="button"
                                                               action key={chat.id}>{chat.name}<Badge
                                            pill>0</Badge></ListGroupItem>);
                                    })
                                ) : (<p>Loading......</p>)}
                            </ListGroup>
                        </Col>
                        {/*Edit this part for chat messages*/}
                        <Col>
                            <ListGroup>
                                {!this.state.isLoading ? (
                                    this.state.chats.map(chat => {
                                        return (<ListGroupItem className="justify-content-between" tag="button"
                                                               action key={chat.id}>{chat.name}<Badge
                                            pill>0</Badge></ListGroupItem>);
                                    })
                                ) : (<p>Loading......</p>)}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
