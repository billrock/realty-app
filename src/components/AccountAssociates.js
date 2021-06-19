import React from 'react';
import {
    Row,
    Col,
    Button,
    Container,
    Jumbotron,
    Form,
    Dropdown,
    DropdownButton,
    Spinner
} from 'react-bootstrap';
import userService from '../services/users';
import authenticationService from '../helpers/authentication';

function Associate(props){
    if (props.associate.email === authenticationService.getUserEmail()){
        return null;
    } else {
    return(
    <Row className="pt-2">
        <Col>{props.associate.email}</Col>
        <Col>{props.associate.associationStatus}</Col>
        <Col>
            <DropdownButton
               title="Actions"
            >
                <Dropdown.Item>Remove Associate</Dropdown.Item>
            </DropdownButton>
        </Col>
    </Row>
    );
    }
}

class AccountAssociates extends React.Component {
    constructor(props){
        super(props);

        this.handleSendInvite = this.handleSendInvite.bind(this);
        this.handleAssociationChange = this.handleAssociatonChange.bind(this);
        this.handleInviteeEmailChange = this.handleInviteeEmailChange.bind(this);
        this.state = {
            associates: [],
            associationName: "",
            inviteeEmail: "",
            sendInviteProgress: false
        };
    }

    handleSendInvite(){
        var that = this;
        var body = {
            associationName: this.state.associationName,
            inviteeEmail: this.state.inviteeEmail 
        };
        this.setState({
            sendInviteProgress: true
        });
        userService.inviteAssociate(body).then(function(result){
            userService.getAssociatesMe().then(function(associates){
                that.setState({
                    associates: associates.associates,
                    associationName: associates.association.name,
                    sendInviteProgress: false
                }); 
            }).catch(function(err){
                that.setState({
                    sendInviteProgress: false
                });
            });
        }).catch(function(err){
            that.setState({
                sendInviteProgress: false
            });
        });
    }
    handleInviteeEmailChange(event){
        this.setState({
            inviteeEmail: event.target.value
        });
    }
    handleAssociatonChange(event){
        this.setState({
            associationName: event.target.value
        });
    }
    componentDidMount(){
        var that = this;
        userService.getAssociatesMe().then(function(associates){
            var associationName = "";
            if (associates.association){
                associationName = associates.association.name;
            }
            that.setState({
                associates: associates.associates,
                associationName: associationName 
            });
        }).catch(function(err){
            console.log(err);
        });
    }

    render(){
        return(
        <React.Fragment>
            <Container>
                <Row className="pt-5">
                </Row>
                <Jumbotron className="pt-3">
                    <Row>
                        <Col>
                            <h1 className="text-center">Account Asssociates</h1>
                        </Col>
                    </Row> 
                    <Row className="mt-5"></Row>
                    <Form.Group
                        as={Row}
                    >
                        <Form.Label
                            className="pl-0"
                            column
                            sm="2"
                        >
                            <span>Association Name</span>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="text"
                                placeholder="Enter name for your association"
                                value={this.state.associationName}
                                onChange={this.handleAssociationChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="invite">
                        <Form.Label
                            className="pl-0" 
                            column 
                            sm="2"
                        >
                            <span>Associate Email</span>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="text"
                                placeholder="Enter email of associate"
                                value={this.state.inviteeEmail}
                                onChange={this.handleInviteeEmailChange}
                            />
                        </Col>
                        <Col sm="1">
                           <Button
                                variant="success"
                                onClick={this.handleSendInvite}
                            >
                                { !this.state.sendInviteProgress ?
                                <span>Send Invite</span>
                                :
                                <span>
                                    <span>Send Invite&nbsp;</span>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                </span>
                                }
                            </Button>
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col>
                            <h3>Associate Status</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col><h5>Email</h5></Col>
                        <Col><h5>Status</h5></Col>
                        <Col><h5>Actions</h5></Col>
                    </Row>
                    { this.state.associates.map((associate, index) => 
                    (
                    <Associate
                        key={index}
                        associate={associate}
                    />
                    ))}
                </Jumbotron> 
            </Container>
        </React.Fragment>
        );
    }
}

export default AccountAssociates;
