import React from 'react';
import {
    Nav
} from 'react-bootstrap';

class AdminToolbar extends React.Component {

    constructor(props){
        super(props);
        this.handleSelectTab = this.handleSelectTab.bind(this);
    }

    handleSelectTab(key){
        this.props.onSwitchTab(key);
    }

    render(){
        return(
            <Nav
                variant="tabs"
                onSelect={this.handleSelectTab}
                defaultActiveKey="users"
            >
                <Nav.Item>
                    <Nav.Link
                        eventKey="users"
                    >
                        <span>Users</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey="listings"
                    >
                        <span>Listings</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey="billing"
                    >
                        <span>Billing</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey="promotions"
                    >
                        <span>Promotions</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey="codes"
                    >
                        <span>Promotion Codes</span>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        );
    }
}

export default AdminToolbar;
