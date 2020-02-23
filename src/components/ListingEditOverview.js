import React from 'react';
import {
    Row,
    Col,
    Form,
    Modal,
    Button
} from 'react-bootstrap';
import ImageUploader from 'react-images-upload';

class ListingEditOverview extends React.Component {
    constructor(props){
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.onListingTypeChange = this.onListingTypeChange.bind(this);
        this.onListingPriceChange = this.onListingPriceChange.bind(this);
        this.onShortDescriptionChange = this.onShortDescriptionChange.bind(this);
        this.onLongDescriptionChange = this.onLongDescriptionChange.bind(this);
        if (this.props.listing){
            this.state = {
                id: this.props.listing.id,
                listingType: this.props.listing.listingType ? this.props.listing.listingType : "For Lease",
                listingPrice: this.props.listing.listingPrice ? this.props.listing.listingPrice : "",
                shortDescription: this.props.listing.shortDescription ? this.props.listing.shortDescription : "",
                longDescription: this.props.listing.longDescription ? this.props.listing.longDescription : ""
            };
        } else {
           this.state = {
                id: null,
                listingType: "For Lease",
                listingPrices: "",
                shortDescription: "",
                longDescription: ""
           };
        }
    }
    onListingTypeChange(event){
        this.setState({
            listingType: event.target.value
        });
    }
    onListingPriceChange(event){
        this.setState({
            listingPrice: event.target.value
        });
    }
    onShortDescriptionChange(event){
        this.setState({
            shortDescription: event.target.value
        });
    }
    onLongDescriptionChange(event){
         this.setState({
            longDescription: event.target.value
         });
    }

    handleSave(){
        var listing = {};
        listing.id = this.state.id;
        if (this.state.listingType) listing.listingType = this.state.listingType;
        if (this.state.listingPrice) listing.listingPrice = this.state.listingPrice;
        if (this.state.shortDescription) listing.shortDescription = this.state.shortDescription;
        if (this.state.longDescription) listing.longDescription = this.state.longDescription;
        this.props.onSave(listing);
        this.props.onHide();
    }
    onDrop(pictureFiles, pictureDataURLs) {
        console.log("onDrop");
        console.log("pictureFiles: "+pictureFiles);
        this.setState({
            pictures: this.state.pictures.concat(pictureFiles)
        });
    }
    render(){
        var listingTypes = null;
        if (this.props.listingTypes){
            listingTypes = this.props.listingTypes.map((item,key) =>
                <option key={key}>{item}</option>
            );
        }
        var defaultImage = [];
        if (this.props.listing){
            for (var i=0; i<this.props.listing.images.length; i++){
                defaultImage.push(this.props.listing.images[i].url);
            }
        }
        return (
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Overview
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row className="mt-2">
                <Col>
                    <Form>
                        <Form.Label>Listing Type</Form.Label>
                        <Form.Control as="select" value={this.state.listingType} onChange={this.onListingTypeChange}>
                            {listingTypes}
                        </Form.Control>
                        <Form.Label>Listing Price</Form.Label>
                        <Form.Control value={this.state.listingPrice} onChange={this.onListingPriceChange}/>
                        <Form.Label>Short Description</Form.Label>
                        <Form.Control value={this.state.shortDescription} onChange={this.onShortDescriptionChange}/> 
                        <Form.Label>Long Description</Form.Label>
                        <Form.Control value={this.state.longDescription} rows="5" as="textarea" onChange={this.onLongDescriptionChange}/>
                    </Form>
                </Col>
                <Col>
                <p>Images</p>
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg','.gif','.png']}
                        maxFileSize={5242880}
                        withPreview={true}
                        defaultImages={defaultImage}
                        label="Max file size: 5mb, accepted: jpg, gif, png"
                    />
                </Col>
            </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Cancel</Button>
                <Button onClick={this.handleSave}>Save</Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default ListingEditOverview;
