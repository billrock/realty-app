import React from 'react';
import {
    Row,
    Col,
    Modal,
    Button,
    Form
} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';

const OverviewSchema = Yup.object().shape({
    shortDescription: Yup.string().required('Short Description is required'),
    longDescription: Yup.string()
});

class ListingAddOverview extends React.Component{
    constructor(props){
        super(props);
        this.handleNext = this.handleNext.bind(this);
    }
    handleNext(initialValues, values){
        var listing = this.props.listing;
        if (values.shortDescription !== initialValues.shortDescription) listing.shortDescription = values.shortDescription;
        if (values.longDescription !== initialValues.longDescription) listing.longDescription = values.longDescription;
        
        this.props.onNext(listing);
    }
    componentDidMount(){
    }
    render()
    {

       var initialValues = {
           shortDescription: "",
           longDescription: ""
       };

       if (this.props.show){
       return(
       <Formik
            initialValues={initialValues}
            validationSchema={OverviewSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                this.handleNext(initialValues, values);
                setSubmitting(false);
            }}
        >
            {({ 
                values, 
                errors, 
                touched, 
                handleChange, 
                handleBlur, 
                handleSubmit, 
                isSubmitting, 
                isValid, 
                dirty, 
                setFieldValue 
            }) => (
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Enter Overview 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="mt-2">
                    <Col>
                        <Form>
                            <Form.Row>
                                <Col md={12}>
                                    <Form.Label className="font-weight-bold">Short Description</Form.Label>
                                    <Form.Control
                                        id="header_edit_short_description_input" 
                                        name="shortDescription"
                                        type="text"
                                        value={values.shortDescription} 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.shortDescription}
                                        isValid={touched.shortDescription && !errors.shortDescription && values.shortDescription !== ""}
                                        disabled={isSubmitting}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.shortDescription}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col md={12}>
                                    <Form.Label className="font-weight-bold">Long Description <span className="font-weight-light">(optional}</span></Form.Label>
                                    <Form.Control 
                                        id="header_edit_long_decription_input"
                                        name="longDescription"
                                        type="text"
                                        as="textarea"
                                        rows="5"
                                        value={values.longDescription} 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.longDescription && !!errors.longDescription}
                                        isValid={touched.longDescription && !errors.longDescription && values.longDescription !== ""}
                                        disabled={isSubmitting}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.longDescription}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    id="overview_edit_cancel_button"
                    onClick={this.props.onCancel}
                >
                    Cancel
                </Button>
                <Button 
                    disabled={!(isValid && dirty) || isSubmitting}
                    id="overview_edit_next_button"
                    onClick={handleSubmit}
                >
                    Create New Listing 
                </Button>
            </Modal.Footer>
       </Modal>
       )}
       </Formik>
       );
       } else {
       return(null);
       } 
    }
}
export default ListingAddOverview;
