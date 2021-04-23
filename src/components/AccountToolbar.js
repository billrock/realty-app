import React, {Component} from 'react';
import {
   Nav 
} from 'react-bootstrap';

class AccountToolbar extends Component {
    constructor(props){
        super(props);
        this.onSelectTab = this.onSelectTab.bind(this);
    }

    onSelectTab(key){
        this.props.onSwitchTab(key);
    }

    render(){
        var show = false;
        return (
        <Nav justify variant="tabs" onSelect={this.onSelectTab} defaultActiveKey="profile">
            <Nav.Item>
                <Nav.Link eventKey="profile">Account Profile</Nav.Link>
            </Nav.Item>
            { show ?
            <Nav.Item>
                <Nav.Link eventKey="associates" >Associates</Nav.Link>
            </Nav.Item>
            : null }
            <Nav.Item>
                <Nav.Link eventKey="settings">Settings</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="billing">Payment Method</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="payment" >Billing Details</Nav.Link>
            </Nav.Item>
        </Nav>
        );
    }
}


export default AccountToolbar;
