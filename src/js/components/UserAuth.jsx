import React, {Component} from 'react';
import '../../css/UserAuth.css';
import {Button, Col, Form, FormGroup, Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from 'classnames';
import dog from '../../img/dog.svg';
import {logInUser, registerUser, toggleUserAuthTab} from "../actions/user-auth-actions";
import {connect} from "react-redux";

function mapDispatchToProps(dispatch) {
    return {
        logInUser: user => dispatch(logInUser(user)),
        toggleUserAuthTab: tab => dispatch(toggleUserAuthTab(tab)),
        registerUser: user => dispatch(registerUser(user))
    }
}

function mapStateToProps(state) {
    const {userState} = state;
    return {
        activeTab: userState.activeTab
    }
}

class ConnectedUserAuth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
    }

    toggle = tab => {
        this.props.toggleUserAuthTab(tab);
    };

    handleUsernameChange = event => {
        this.setState({username: event.target.value});
    };

    handlePasswordChange = event => {
        this.setState({password: event.target.value});
    };

    handleEmailChange = event => {
        this.setState({email: event.target.value});
    };

    handleLoginSubmit = event => {
        event.preventDefault();
        const {username, password} = this.state;
        this.props.logInUser({username, password});
    };

    handleSignUpSubmit = event => {
        event.preventDefault();
        const {username, email, password} = this.state;
        this.props.registerUser({username, email, password});
    };


    render() {
        return (
            <div className="UserAuth-logo">
                {this.props.activeTab}
                <img src={dog} className="UserAuth-logo" alt=""/>
                <div className="UserAuth-tabs">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.props.activeTab === '1'})}
                                onClick={() => {
                                    this.toggle('1');
                                }}
                            >
                                Login
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.props.activeTab === '2'})}
                                onClick={() => {
                                    this.toggle('2');
                                }}
                            >
                                Sign-Up
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.props.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <div className="bork-logo">
                                        <div className="UserAuth">
                                            <Form onSubmit={this.handleLoginSubmit} className="login">
                                                <FormGroup>
                                                    <Label for="username">Username</Label>
                                                    <Input
                                                        type="username"
                                                        name="username"
                                                        id="UserAuth-username"
                                                        placeholder="Enter username"
                                                        onChange={this.handleUsernameChange}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="examplePassword">Password</Label>
                                                    <Input
                                                        type="password"
                                                        name="password"
                                                        id="UserAuth-password"
                                                        placeholder="Enter password"
                                                        onChange={this.handlePasswordChange}
                                                    />
                                                </FormGroup>
                                                <Button>Login</Button>
                                            </Form>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    <div className="bork-logo">
                                        <div className="UserAuth">
                                            <Form onSubmit={this.handleSignUpSubmit} className="sign-up">
                                                <FormGroup>
                                                    <Label for="username">Username</Label>
                                                    <Input
                                                        type="username"
                                                        name="username"
                                                        id="UserAuth-username"
                                                        placeholder="Enter username"
                                                        onChange={this.handleUsernameChange}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="email">Email</Label>
                                                    <Input
                                                        type="email"
                                                        name="email"
                                                        id="UserAuth-email"
                                                        placeholder="Enter email"
                                                        onChange={this.handleEmailChange}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="examplePassword">Password</Label>
                                                    <Input
                                                        type="password"
                                                        name="password"
                                                        id="UserAuth-password"
                                                        placeholder="Enter password"
                                                        onChange={this.handlePasswordChange}
                                                    />
                                                </FormGroup>
                                                <Button>Sign-Up</Button>
                                            </Form>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        );
    }
}

const UserAuth = connect(mapStateToProps, mapDispatchToProps)(ConnectedUserAuth);
export default UserAuth;