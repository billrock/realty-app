import React from 'react';
import {
    Modal,
    Form,
    Button,
    Alert,
    Spinner
} from 'react-bootstrap';
import StepperAddListing from '../components/StepperAddListing';

class AccountConfirmModal extends React.Component {
    constructor(props){
        super(props);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.codeRef = React.createRef();
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            code: ""
        };
    }
    handleConfirm(){
       this.props.onConfirm(this.props.email,this.state.code);
    }

    handleCodeChange(event){
        this.setState({
            code: event.target.value
        });
    }
    handleKeyPress(target){
        if (target.charCode === 13){
            this.handleConfirm();
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.codeRef.current.focus();
        }, 1)
    }
    render(){

        // Wizard
        var className="";
        var animation=true;
        var nextButton="Confirm";
        var title="Confirm Email";
        var cancel="Cancel";
        var formPadding="";
        if (this.props.isWizard){
            className="modal-80w"
            animation=false;
            nextButton="Next";
            title="Create New Listing";
            cancel="Discard Changes";
            formPadding="pl-5 pr-5 ml-5 mr-5";
        }
        // Stepper
        var addListingTypeCompleted=true;
        var addListingAddressCompleted=true;
        var addListingOverviewCompleted=true;
        var notRegistered=true;
        var registerCompleted=true;
        var confirmActive=true;
        var loginCompleted=false;

        // Button
        var buttonDisabled = true;
        if (this.state.code !== ""){
            buttonDisabled = false;
        }

        return(
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName={className}
            animation={animation}
            show={this.props.show}
            onHide={this.props.onCancel}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span>{title}</span> 
                </Modal.Title> 
            </Modal.Header>
            <Modal.Body>

                { this.props.isWizard ?
                <StepperAddListing
                    addListingTypeCompleted={addListingTypeCompleted}
                    addListingAddressCompleted={addListingAddressCompleted}
                    addListingOverviewCompleted={addListingOverviewCompleted}
                    notRegistered={notRegistered}
                    registerCompleted={registerCompleted}
                    confirmActive={confirmActive}
                    loginCompleted={loginCompleted}
                />
                : null }
                <Form className={formPadding}>
                <Alert variant="info">
                    { this.props.resend ?
                    <div>
                    <div className="text-center">Your account has not yet been verified.</div>
                    <div className="text-center">Check your email for the verification code to enter below.</div>
                    <div className="text-center">The confirmation email was sent to {this.props.email}</div>
                    </div>
                    :
                    <div>
                    <div className="text-center">Check your email for verification code to enter below.</div>
                    <div className="text-center">The confirmation email was sent to {this.props.email}</div>
                    </div>
                    }
                </Alert>
                {this.props.confirmMessage ?
                <Alert variant="danger">
                {this.props.confirmMessage}
                </Alert>
                : null }
                <Form.Label>Code</Form.Label>
                <Form.Control
                    onChange={this.handleCodeChange}
                    ref={this.codeRef}
                />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    id="account-confirm-cancel"
                    onClick={this.props.onCancel}
                >{cancel}</Button>
                <Button
                    disabled={buttonDisabled}
                    onClick={this.handleConfirm}
                >
                    {!this.props.progress ?
                    <span>{nextButton}</span>
                    :
                    <span>
                        <span>{nextButton}&nbsp;</span>
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
            </Modal.Footer>
        </Modal>
        );
    }
}

export default AccountConfirmModal;

