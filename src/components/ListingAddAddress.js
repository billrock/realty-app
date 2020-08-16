import React from 'react';
import {
    Row,
    Col,
    Modal,
    Button,
    Form,
    InputGroup,
    Alert
} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';
import listingService from '../services/listings';
import PlacesAutocomplete from 'react-places-autocomplete';
import geolocationService from '../helpers/geolocation';
import {
    getLatLng
} from 'react-places-autocomplete';
import {getUserEmail} from '../helpers/authentication';

const AddressSchema = Yup.object().shape({
    city: Yup.string().required('City is required'),
    state: Yup.string(),
    zip: Yup.number().integer().typeError("Must be a valid zip code")
});

class ListingAddAddress extends React.Component{
    constructor(props){
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleModification = this.handleModification.bind(this);
        this.goNext = this.goNext.bind(this);
        this.handleVerifyAddress = this.handleVerifyAddress.bind(this);
        this.handleSelectAddress = this.handleSelectAddress.bind(this);
        this.state = {
            states: null,
            address: '',
            geocoded: false,
            verifiedAddresses: false,
            addressInUse: false
        };
    }
    handleNext(initialValues, values){
        if (this.geocoded === false){
            var fullAddress = this.state.address+", "+values.city+", "+values.state;
            var that = this;
            geolocationService.geocodeByAddr(fullAddress, values).then(function(addr){
                that.setState({
                    address: addr,
                    geocoded: true
                });
                this.goNext(initialValues, values);
            }).catch(function(err){
                console.log("err: "+err);
            });
        } else {
            this.goNext(initialValues, values);
        }
    }

    goNext(initialValues, values){
        var listing = this.props.listing;
        listing.address = this.state.address;
        if (values.city !== initialValues.city) listing.city = values.city;
        if (values.state !== initialValues.state) listing.state = values.state;
        if (values.zip !== initialValues.zip) listing.zip = values.zip;
        if (values.displayAddress !== initialValues.displayAddress) listing.displayAddress = values.displayAddress;
        listing.location = values.location;
        this.props.onNext(listing);
    }

    handleVerifyAddress(values){
        var fullAddress = this.state.address+", "+values.city+", "+values.state;
        var that = this;
        geolocationService.getVerifiedAddresses(fullAddress, values).then(function(results){
            that.setState({
                verifiedAddresses: results 
            });
        }).catch(function(err){
            console.log("err: "+err);
        });

    }
    updateValues(results, values){
        var that=this;
        var street_address = "";
        var street_number = "";
        var city = "";
        var state = "";
        var zip = "";
        var len = results[0].address_components.length;
        if (len === 0) return;
        getLatLng(results[0]).then(({lat, lng}) => {
            values.location = {
                type: 'Point',
                coordinates: [lat, lng]
            };
        });
        for (var i=0; i<len; i++){
            var len2 = results[0].address_components[i].types.length;
            for (var j=0; j<len2; j++){
                if (results[0].address_components[i].types[j] === "route"){
                street_address = results[0].address_components[i].long_name;
                } else if (results[0].address_components[i].types[j] === "street_number"){
                    street_number = results[0].address_components[i].long_name;
                } else if (results[0].address_components[i].types[j] === "locality"){
                    city = results[0].address_components[i].long_name;
                } else if (results[0].address_components[i].types[j] === "sublocality_level_1"){
                    city = results[0].address_components[i].long_name;
                } else if (results[0].address_components[i].types[j] === "administrative_area_level_1"){
                    state = results[0].address_components[i].long_name;
                } else if (results[0].address_components[i].types[j] === "postal_code"){
                    zip = results[0].address_components[i].long_name;
                }
            }
        }
        var addr = street_number + " " + street_address;
        values.city = city;
        values.state = state;
        values.zip = zip;
        var owner = getUserEmail();
        listingService.findAddress(addr, city, state, owner).then(function(result){
            var addressInUse = null;
            if (result.length > 0) addressInUse = result;
            that.setState({
                address: addr,
                geocoded: true,
                verifiedAddresses: null,
                addressInUse: addressInUse
            });
        }).catch(function(err){
            console.log(err);
        });
    }

    handleSelectAddress(address, values){
            var that = this;
            geolocationService.geocodeByAddr(address, values).then(function(results){
                that.updateValues(results, values);
            }).catch(function(err){
                console.log("err: "+err);
            });
    }

    handleModification(){
        this.setState({
            geocoded: false
        });
    }
    handleChange = address => {
        this.setState({
            address: address
        });
    }
    handleSelect = (address, values) => {
        var that = this;
        geolocationService.geocodeByAddr(address, values).then(function(results){
            that.updateValues(results, values);
        }).catch(function(err){
            console.log("err: "+err);
        });
    }

    handleGoToListing(result){
        this.props.onGoToListing(result);
    }
    componentDidMount(){
        var that = this;
        var enumPromise = listingService.getEnumsPromise();
        enumPromise.then(function(data){
            that.setState({
                states: data.states
            });
        }).catch(function(err){
            console.log("err: "+err);
        });
    }
    render()
    {
        var states = null;
        if (this.state.states){
            states = this.state.states.map((item,key) =>
                <option key={key}>{item}</option>
            );
        }
       var initialValues = {
           address: "",
           city: "",
           state: "",
           zip: "",
           displayAddress: ""
       };

       if (this.props.show){
       return(
       <Formik
            initialValues={initialValues}
            validationSchema={AddressSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                this.handleNext(initialValues, values);
                //setSubmitting(false);
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
          backdrop='static'
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  Enter Listing Address 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="mt-2">
                    <Col>
                        <Form>
                            <Form.Row>
                                <Col md={12}>
                                    <Form.Label className="font-weight-bold">Address</Form.Label>
                                    <PlacesAutocomplete
                                        value={this.state.address}
                                        onChange={(e) => {this.handleChange(e); this.handleModification();}}
                                        onSelect={(e) => this.handleSelect(e, values)}
                                    >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <InputGroup>                
                                            <Form.Control
                                                {...getInputProps({
                                                    placeholder: 'Search address...',
                                                    className: 'form-control location-search-input',
                                                    id: "header_edit_address_input",
                                                    name: "address",
                                                    onBlur: handleBlur,
                                                    isInvalid: !!errors.address,
                                                    isValid: touched.address && !errors.address && values.address !== "",
                                                    disabled: isSubmitting
                                                })}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.address}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                        <InputGroup>
                                            <div className="autocomplete-dropdown-container">
                                                {loading && <div></div>}
                                                {suggestions.map((suggestion, index) => {
                                                    const className = suggestion.active
                                                        ? 'suggestion-item--active'
                                                        : 'suggestion-item';
                                                    // inline style for demonstration purpose
                                                    const style = suggestion.active
                                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                    return (
                                                        <div key={index}
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                        >
                                                            <span className="ml-3">{suggestion.description}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </InputGroup>
                                    </div>
                                    )}
                                    </PlacesAutocomplete>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col md={12} className="p-1 smallFont">
                                    <Form.Label className="font-weight-bold">Verification Status:&nbsp;</Form.Label>
                                    { (this.state.geocoded && !this.state.addressInUse) ?
                                    <Form.Label className="green-background"><span className="pl-1 pr-1">Verified</span></Form.Label>
                                    : null}
                                    { (!this.state.geocoded && !this.state.addressInUse) ?
                                    <Form.Label className="gray-background"><span className="pl-1 pr-1">Unverified</span></Form.Label>
                                    : null}
                                    { this.state.addressInUse ?
                                    <Form.Label className="red-background"><span className="pl-1 pr-1">In Use</span></Form.Label>
                                    : null}
                                    <span>{'  '}</span>
                                    { !this.state.addressInUse ?
                                    <Form.Label className="addPointer text-light bg-primary">
                                        <span 
                                            onClick={() => this.handleVerifyAddress(values)} 
                                            className="pl-1 pr-1">
                                            Verify address
                                    </span>
                                    </Form.Label>
                                    : 
                                    <Form.Label className="addPointer text-light bg-primary">
                                        <span
                                            onClick={() => this.handleGoToListing(this.state.addressInUse)}
                                            className="pl-1 pr-1">
                                            View Listing 
                                    </span>
                                    </Form.Label>

                                    }
                                </Col>
                            </Form.Row>
                            {this.state.verifiedAddresses ?
                            <Form.Row>
                                <Alert variant="primary">
                                Verified address found, select below:
                                {!this.state.verifiedAddresses ? <span></span> :
                                this.state.verifiedAddresses.map((address, index) =>
                                (

                                <Form.Check key={index}>
                                    <Form.Check.Label
                                        onClick={() => this.handleSelectAddress(address.formatted_address, values)}
                                    >
                                        <span className="addPointer">{address.formatted_address}</span>
                                    </Form.Check.Label>
                                </Form.Check>
                                ))}
                                </Alert>
                            </Form.Row>
                            : null}
                            <Form.Row>
                                <Col md={6}>
                                    <Form.Label className="font-weight-bold">City</Form.Label>
                                    <Form.Control 
                                        id="header_edit_city_input"
                                        name="city"
                                        type="text"
                                        value={values.city} 
                                        onChange={(e) => {handleChange(e);this.handleModification();}}
                                        onBlur={handleBlur}
                                        isInvalid={touched.city && !!errors.city}
                                        isValid={touched.city && !errors.city && values.city !== ""}
                                        disabled={isSubmitting}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.city}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={6}>
                                    <Form.Label className="font-weight-bold">State</Form.Label>
                                    <Form.Control 
                                        id="header_edit_state_select"
                                        as="select" 
                                        name="state"
                                        value={values.state} 
                                        onChange={(e) => {handleChange(e);this.handleModification();}} 
                                        isValid={touched.state && !errors.state && values.state !== ""}
                                        isInvalid={!!errors.state}
                                        disabled={isSubmitting}
                                    >
                                    {states}
                                    </Form.Control>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col md={6}>
                                    <Form.Label className="font-weight-bold">Zip</Form.Label>
                                    <Form.Control
                                        id="header_edit_zip_input"
                                        name="zip"
                                        type="text"
                                        value={values.zip}
                                        onChange={(e) => {handleChange(e);this.handleModification();}}
                                        onBlur={handleBlur}
                                        isInvalid={touched.zip && !!errors.zip}
                                        isValid={touched.zip && !errors.zip && values.zip !== ""}
                                        disabled={isSubmitting}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.zip}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col md={12}>
                                    <Form.Label className="font-weight-bold">Display Address <span className="font-weight-light">(optional)</span></Form.Label>
                                    <Form.Control 
                                        id="header_edit_display_address_edit"
                                        name="displayAddress"
                                        type="text"
                                        value={values.displayAddress} 
                                        onChange={(e) => {handleChange(e);this.handleModification();}}
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.displayAddress}
                                        isValid={touched.displayAddress && !errors.displayAddress && values.displayAddress !== ""}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.displayAddress}
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
                    Discard Changes 
                </Button>
                <Button 
                    disabled={!(isValid && dirty) || isSubmitting}
                    id="overview_edit_next_button"
                    onClick={handleSubmit}
                >
                    Next 
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
export default ListingAddAddress;
