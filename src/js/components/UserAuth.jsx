import React, {Component} from 'react';
import '../../css/UserAuth.css';
import {
    Alert,
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from "reactstrap";
import classnames from 'classnames';
import dog from '../../img/dog.svg';
import {dismissUserAlert, logInUser, registerUser, toggleUserAuthTab} from "../actions/user-auth-actions";
import {connect} from "react-redux";

function mapDispatchToProps(dispatch) {
    return {
        logInUser: user => dispatch(logInUser(user)),
        toggleUserAuthTab: tab => dispatch(toggleUserAuthTab(tab)),
        registerUser: user => dispatch(registerUser(user)),
        dismissUserAlert: () => dispatch(dismissUserAlert())
    }
}

function mapStateToProps(state) {
    const {userState} = state;
    return {
        activeTab: userState.activeTab,
        userAuthError: userState.userAuthError,
        userAlertVisible: userState.userAlertVisible
    }
}

class ConnectedUserAuth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            phone_number: '',
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

    handleFirstNameChange = event => {
        this.setState({first_name: event.target.value});
    };

    handleLastNameChange = event => {
        this.setState({last_name: event.target.value});
    };

    handlePhoneNumberChange = event => {
        this.setState({phone_number: event.target.value});
    };

    handleLoginSubmit = event => {
        event.preventDefault();
        const {username, password} = this.state;
        this.props.logInUser({username, password});
    };

    handleSignUpSubmit = event => {
        event.preventDefault();
        const {username, email, password, phone_number, first_name, last_name} = this.state;
        this.props.registerUser({username, email, password, phone_number, first_name, last_name});
    };

    onDismiss = () => {
        this.props.dismissUserAlert()
    };


    render() {
        const {userAuthError} = this.props;
        const hasError = userAuthError.length > 0;
        return (
            <React.Fragment>
                {hasError ? <Alert color="danger" isOpen={this.props.userAlertVisible} toggle={this.onDismiss}>
                    {userAuthError}
                </Alert> : null}
                <div className="UserAuth-logo">
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
                                                        <Label for="firstName">First Name</Label>
                                                        <Input
                                                            type="firstname"
                                                            name="firstname"
                                                            id="UserAuth-first-name"
                                                            placeholder="Enter first name"
                                                            onChange={this.handleFirstNameChange}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="lastName">Last Name</Label>
                                                        <Input
                                                            type="lastname"
                                                            name="lastname"
                                                            id="UserAuth-last-name"
                                                            placeholder="Enter last name"
                                                            onChange={this.handleLastNameChange}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="phonenumber">Phone Number</Label>
                                                        <Input
                                                            type="phonenumber"
                                                            name="phonenumber"
                                                            id="UserAuth-phone-number"
                                                            placeholder="Enter phone number"
                                                            onChange={this.handlePhoneNumberChange}
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
            </React.Fragment>
        );
    }
}

const UserAuth = connect(mapStateToProps, mapDispatchToProps)(ConnectedUserAuth);
export default UserAuth;