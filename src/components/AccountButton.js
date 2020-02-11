import React from 'react';
import { Component } from 'react';
import {
    Modal,
    Form,
    Button,
    Dropdown,
    DropdownButton
} from 'react-bootstrap';
import { isAuthenticated } from '../helpers/authentication';
import { getUserName } from '../helpers/authentication';
import { deleteUser } from '../helpers/authentication';
import { loginResponse } from '../helpers/authentication';

function RegisterModal(props){
    const standardProps = Object.assign({}, props);
    delete standardProps.onFinish;
    return(
        <Modal
            {...standardProps}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Register
                </Modal.Title> 
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Email</Form.Label>
                <Form.Control />
                <Form.Label>Password</Form.Label>
                <Form.Control />
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onCancel}>Cancel</Button>
                <Button onClick={props.onFinish}>Register</Button>
            </Modal.Footer>
        </Modal>
    );
}

function LoginModal(props) {
    const standardProps = Object.assign({}, props);
    delete standardProps.onFinish;
    delete standardProps.onRegister;
    return (
        <Modal
            {...standardProps}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Email</Form.Label>
                <Form.Control />
                <Form.Label>Password</Form.Label>
                <Form.Control />
                <Button variant="link">Forgot password?</Button>
                <Button onClick={props.onRegister} variant="link">Don't hava an account? Create one here</Button>
               
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onCancel}>Cancel</Button>
                <Button onClick={props.onFinish}>Login</Button>
            </Modal.Footer>
        </Modal>
    );
}

export class AccountButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            authenticated: false,
            modalShowLogin: false,
            modalShowRegister: false,
        }
    }
    componentDidMount(){
        if (isAuthenticated()){
            this.setState({authenticated: true});
        }
    }
    onCancel(){
        console.log("onCancel()");
    }
    onLogin(){
        console.log("onLogin()");
        loginResponse();
        this.setState({authenticated: true});
        this.props.onLogin();
    }
    onRegister(){
        console.log("onRegister()");
    }
    onMyAccount(){
        console.log("Go to my account");
        var url = window.location.protocol + "//" + window.location.hostname + "/account";
        window.location.href = url;
    }
    onLogout(){
       deleteUser();
       this.setState({authenticated: false});
       this.props.onLogout();
    }
    render(){
        const userName = getUserName();
        return(
        <span>
            <span className="align-top text-danger">
            {this.state.authenticated ? 
                ( 
                <DropdownButton id="dropdown-item-button" title={userName}>
                    <Dropdown.Item as="button" onClick={() => {this.onMyAccount()}}>My Account</Dropdown.Item>
                    <Dropdown.Item as="button">My Listings</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => {this.onLogout()}}>Logout</Dropdown.Item>
                </DropdownButton> 
                )
                :( 
                <span>
                    <Button onClick={() => this.setState({modalShowLogin: true})} variant="success">Login</Button>
                </span> 
                )}
            </span>
            <LoginModal
                show={this.state.modalShowLogin}
                onCancel={() => {this.onCancel();this.setState({modalShowLogin:false})}}
                onFinish ={() => {this.onLogin();this.setState({modalShowLogin:false})}}
                onRegister={() => {this.onRegister();this.setState({modalShowLogin:false,modalShowRegister:true})}}
            />
            <RegisterModal
                show={this.state.modalShowRegister}
            />
        </span>
        );
    }
}
export default AccountButton;
