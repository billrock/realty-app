import React from 'react';
import {
    Form,
    Row,Col,
    Button,
    Dropdown,
    ToggleButtonGroup,
    ToggleButton
} from 'react-bootstrap';

const CustomMenu = React.forwardRef(
  ({ style, className, 'aria-labelledby': labeledBy }, ref) => {

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
      <Form>
          <Form.Group as={Row} className="mr-1 ml-1">
              <Form.Label column sm="4">Available Space</Form.Label>
              <Col sm="4">
                  <Form.Control placeholder="Min"/>
              </Col>
              <Col sm="4">
                  <Form.Control placeholder="Max"/>
              </Col>
          </Form.Group>
          <Form.Group as={Row} className="mr-1 ml-1">
              <Form.Label column sm="4">Lease Rate</Form.Label>
              <Col sm="4">
                  <Form.Control placeholder="Min"/>
              </Col>
              <Col sm="4">
                  <Form.Control placeholder="Max"/>
              </Col>
          </Form.Group>
          <Form.Group as={Row} className="mr-1 ml-1">
              <Form.Label column sm="4">Listing Type</Form.Label>
              <Col sm="4">
                  <Form.Control as="select">
                      <option>All</option>
                      <option>For Lease</option>
                      <option>For Sale</option>
                  </Form.Control>
              </Col>
          </Form.Group>
      </Form>
      </div>
    );
  },
);

class ListingToolbar extends React.Component {
    constructor(props){
        super(props);
        this.onAddListing = this.onAddListing.bind(this);
        this.handleListingToggle = this.handleListingToggle.bind(this);
    }

    onAddListing(e){
        this.props.onAddListing();
    }

    handleListingToggle(value){
        console.log("handleListingToggle value: "+value);
        this.props.onListingToggle(value);
    }

    render(){
        var myListings = "myListings";
        var allListings = "allListings";

        return (
            <Form className="toolbar-form m-2">
                <Form.Row>
                    <Col xs={3}>
                        <Form.Control placeholder="Waltham, MA" />
                    </Col>
                    <Col xs={1}>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Filters
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={CustomMenu} className="filter">
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col >
                    <Col xs={1} >
                        <Button variant="light">Search</Button>
                    </Col>
                    <Col xs={2} >
                       { this.props.loggedIn ?
                        <ToggleButtonGroup type="radio" name="options" defaultValue={allListings} onChange={this.handleListingToggle}>
                            <ToggleButton value={allListings}>All Listings</ToggleButton>
                            <ToggleButton value={myListings}>My Listings</ToggleButton>
                        </ToggleButtonGroup>
                        : null }
                    </Col>
                    <Col xs={3}>
                    </Col>
                    <Col xs={2} className="text-right">
                        <Button onClick={this.onAddListing} variant="light">Add a Listing</Button>
                    </Col>

                </Form.Row>
            </Form>
        );
    }
}
export default ListingToolbar;
