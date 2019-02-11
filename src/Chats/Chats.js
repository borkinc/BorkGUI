import React, {Component} from 'react';
import './Chats.css'
import {Badge, Col, ListGroup, ListGroupItem} from "reactstrap";
import axios from "axios";
import API_URL from '../index'
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";

export default class Chats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            isLoading: true,
            errors: null,
            chatName: ''
        };
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

    render() {
        return (
            <React.Fragment>
                <Container fluid={true}>
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
            </React.Fragment>
        );
    }
}
