import React from 'react';
import {
    Row,
    Col,
    Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTimes,
    faExpand,
    faAddressBook,
    faFilePdf
} from '@fortawesome/free-solid-svg-icons';

function ContactButton(props) {
  return (
      <span>
          <Button
              id="header_contact_button"
              variant="info"
              className=""
              onClick={() => {props.onContact()}}
          >
             <span><FontAwesomeIcon icon={faAddressBook} /> Contact</span>
          </Button>
      </span>
  );
}

function ReportButton(props){
    return(
        <span>
            <Button
                id="header_report_button"
                variant="info"
                className="ml-1"
                onClick={() => {props.onReport()}}
            >
                <span><FontAwesomeIcon icon={faFilePdf} /> Brochure</span>
            </Button>
        </span>
    );
}

class ListingDetailHeader extends React.Component {
    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
        this.handleReport = this.handleReport.bind(this);
    }
    handleClose(){
        this.props.onShowDetailChange(false);
    }
    handleSave(listing){
        this.props.onListingUpdate(listing);
    }
    handleExpand(){
        var url = window.location.protocol + "//" + window.location.hostname + "/listing/"+this.props.listing.id;
        window.location.href = url;
    }
    handleReport(){
        var id = this.props.listing.id;
        var url =
            window.location.protocol +
            "//" +
            window.location.hostname +
            "/report/" +
            id;
        window.open(url, "_blank");
    }
    render() {
        const listing = this.props.listing;

        var fullscreen = this.props.fullscreen;
        return(
            <div className="pb-1">
            <Row className="align-items-center bg-info m-0">
	        <Col md={8}className="text-white">
                        <ContactButton
                            onContact={this.props.onContact}
                        />
                        <ReportButton
                            onReport={this.handleReport}
                        />
                </Col>
                <Col md={4} className="text-right">
                    { listing && !fullscreen ? 
                    <Button
                        onClick={this.handleExpand} 
                        className="expandButton" 
                        variant="info"
                    >
                        <FontAwesomeIcon icon={faExpand} /> Expand
                    </Button>
                    : null}
                    {!fullscreen ?
                    <Button
                        id="header_close_detail"
                        className="closeButton ml-3" 
                        variant="info" 
                        onClick={this.handleClose}
                    >
                        <FontAwesomeIcon icon={faTimes}/> Close
                    </Button>
                    : null }
                </Col>
            </Row>
            </div>
        );
    }
}

export default ListingDetailHeader;
