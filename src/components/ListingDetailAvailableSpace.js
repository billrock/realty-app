import React from 'react';
import {
    Row,
    Col,
    Accordion,
    Image,
    Button
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faAngleDown,
    faAngleUp,
    faPlus,
    faPencilAlt,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import ListingEditAvailableSpace from './ListingEditAvailableSpace';
import {formatDate} from '../helpers/utilities';

function AddButton(props) {
    return (
        <span>
            <span
                id="space_add_button"
                onClick={() => {props.onShow()}}
                className="edit-button align-top text-danger"
            >
                <FontAwesomeIcon size="xs" icon={faPlus} />
            </span>
            {props.show ?
            <ListingEditAvailableSpace
                title={props.title}
                listing={props.listing}
                index={props.index}
                space={props.space}
                spaceTypes={props.spaceTypes}
                spaceUses={props.spaceUses}
                spaceDivisibles={props.spaceDivisibles}
                show={props.show}
                onHide={props.onHide}
                onSave={listing => props.onSave(listing)}
                errorMessage={props.errorMessage}
                saving={props.saving}
            />
            : null }
        </span>
  );
}
function EditButton(props) {
    var space = props.space;
    if (props.listing){
         space = props.listing.spaces[props.spaceUpdateIndex];
    }
    return (
        <span>
          <span
              id="space_edit_button"
              onClick={() => {props.onShow(props.index)}}
              className="edit-button alight-top text-danger"
          >
              <FontAwesomeIcon icon={faPencilAlt} />
          </span>
          { props.show ?
          <ListingEditAvailableSpace
              title="Edit Space"
              listing={props.listing}
              space={space}
              spaceTypes={props.spaceTypes}
              spaceUses={props.spaceUses}
              spaceDivisibles={props.spaceDivisibles}
              show={props.show}
              onHide={props.onHide}
              onSave={listing => props.onSave(listing)}
              errorMessage={props.errorMessage}
              saving={props.saving}
          />
          :null }
        </span>
    );
}
class ListingDetailAvailableSpace extends React.Component {
    constructor(props){
        super(props);
        this.handleAccordionChange = this.handleAccordionChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            text1: "More",
            text2: "More",
        }
    }

    handleAccordionChange(e){
        if (e.target.value === "1") {
            if (this.state.text1 === "More"){
                this.setState({text1: "Less"});
            } else {
                this.setState({text1: "More"});
            }
        } else {
            if (this.state.text2 === "More") {
                this.setState({text2: "Less"});
            } else {
                this.setState({text2: "More"});
            }
        }
    }
    handleSave(space){
        console.log("handleSave: space: "+JSON.stringify(space));
        this.props.onSpaceUpdate(space);
    }
    handleClose(){
        this.props.onShowDetailChange(false);
    }
    render(){
        console.log("this.props.spaceDivisibles: "+JSON.stringify(this.props.spaceDivisibles));
        var listing = this.props.listing;
        var editMode = this.props.editMode;
        var spaceUses = this.props.spaceUses;
        var spaceTypes = this.props.spaceTypes;
        var spaceDivisibles = this.props.spaceDivisibles;
        var newSpace = {}; 
        return (
            <div>
                <Row className="mt-3 border-bottom border-warning">
                    <Col>
                        <h2>Available Space {editMode === "edit" ? 
                            <AddButton 
                            listing={listing} 
                            space={newSpace}
                            spaceUses={spaceUses} 
                            spaceTypes={spaceTypes}
                            spaceDivisibles={spaceDivisibles}
                            onSave={this.handleSave} 
                            onShow={this.props.onSpaceModalNew}
                            onHide={this.props.onSpaceModalHide}
                            errorMessage={this.props.unitError}
                            show={this.props.spaceNew}
                            saving={this.props.spaceSaving}
                            /> 
                            : null}</h2>
                    </Col>
                </Row>
                <Row className="bg-light shadow">
                    <Col md={2} className="font-weight-bold">Unit</Col>
                    <Col md={2}  className="font-weight-bold">Size</Col>
                    <Col md={2} className="font-weight-bold">Price</Col>
                    <Col md={3}>
                        <Row>
                            <Col className="font-weight-bold">Type</Col>
                             <Col className="font-weight-bold">Use</Col>
                        </Row>
                    </Col>
                    <Col md={3}></Col>
                </Row>
                {!listing ? <div></div> : 
                listing.spaces.map((space, index) =>
                (
                <Accordion key={space.unit}> 
                    <Row className="border-bottom align-items-center" >
                       <Col md={2}>{space.unit}</Col>
                       <Col md={2}>{space.size} sq ft</Col>
                       <Col md={2}>${space.price}/sq ft</Col>
                       <Col md={3}>
                           <Row>
                               <Col >{space.type}</Col>
                               <Col >{space.use}</Col>
                           </Row>
                       </Col> 
                       <Col md={3}>
                           <Row>
                               { editMode === "edit" ?
                               <Col>
                                   <EditButton
                                   title="Update Space"
                                   listing={listing}
                                   index={index}
                                   spaceUpdateIndex={this.props.spaceUpdateIndex}
                                   space={space} 
                                   spaceUses={spaceUses}
                                   spaceTypes={spaceTypes} 
                                   spaceDivisibles={spaceDivisibles}
                                   onSave={this.handleSave}
                                   onShow={this.props.onSpaceModalUpdate}
                                   onHide={this.props.onSpaceModalHide}
                                   errorMessage={this.props.spaceError}
                                   show={this.props.spaceUpdate}
                                   saving={this.props.spaceSaving}
                                   />
                               </Col>
                               : null }
                               { editMode === "edit" ?
                               <Col><FontAwesomeIcon className="text-danger" size="xs" icon={faTrash} /></Col>
                                : null }

                               <Col >
                                   <Accordion.Toggle value="1" className="text-danger" as={Button} onClick={this.handleAccordionChange} variant="link" eventKey="0">
                               {this.state.text1} <FontAwesomeIcon icon={this.state.text1 === "More" ? faAngleDown : faAngleUp} />
                                   </Accordion.Toggle>
                               </Col>

                           </Row>
                        </Col>  
                    </Row>
                    <Accordion.Collapse eventKey="0">
                        <div>
                            <Row>
                                <Col>
                                    {space.description}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {editMode === "edit" || (editMode === "view" && space.driveInDoors) ?
                                    <Row>
                                        <Col>Drive In Doors</Col>
                                        <Col className="font-weight-bold">{space.driveInDoors}</Col>
                                    </Row>
                                    : null }
                                </Col>
                                <Col>
                                    {editMode === "edit" || (editMode === "view" && space.floors) ?
                                    <Row>
                                        <Col>Floors</Col>
                                        <Col className="font-weight-bold">{space.floors}</Col>
                                    </Row>
                                    : null }
                                </Col>
                                <Col>
                                    {editMode === "edit" || (editMode === "view" && space.divisible) ?
                                    <Row>
                                        <Col>Divisible</Col>
                                        <Col className="font-weight-bold">{space.divisible}</Col>
                                    </Row>
                                    : null }
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    {editMode === "edit" || (editMode === "view" && space.loadingDocks) ?
                                    <Row>
                                        <Col>Loading Docks</Col>
                                        <Col className="font-weight-bold">{space.loadingDocks}</Col>
                                    </Row>
                                    : null }
                                </Col>
                                <Col>
                                    {editMode === "edit" || (editMode === "view" && space.leaseTerm) ?
                                    <Row>
                                        <Col>Lease Term</Col>
                                        <Col className="font-weight-bold">{space.leaseTerm}</Col>
                                    </Row>
                                    : null }
                                </Col>
                                <Col>
                                    {editMode === "edit" || (editMode === "view" && space.ceilingHeight) ?
                                    <Row>
                                        <Col>Ceiling Height</Col>
                                        <Col className="font-weight-bold">{space.ceilingHeight}</Col>
                                    </Row>
                                    : null }
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    {editMode === "edit" || (editMode === "view" && space.availableDate) ?
                                    <Row>
                                        <Col>Available Date</Col>
                                        <Col className="font-weight-bold">{space.availableDate}</Col>
                                    </Row>
                                    : null }
                                </Col>
                                <Col>
                                    {editMode === "edit" || (editMode === "view" && space.nets) ?
                                    <Row>
                                        <Col>Nets</Col>
                                        <Col className="font-weight-bold">{space.nets}</Col>
                                    </Row>
                                    : null }
                                </Col>
                                <Col>
                                    {editMode === "edit" || (editMode === "view" && space.class) ?
                                    <Row>
                                        <Col>Class</Col>
                                        <Col className="font-weight-bold">{space.class}</Col>
                                    </Row>
                                    : null }
                                </Col>
                            </Row>
                            <Row className="border-bottom">
                                <Col><Image src="/image1.jpg" thumbnail /></Col>
                                <Col><Image src="/image2.jpg" thumbnail /></Col>
                                <Col><Image src="/image3.jpg" thumbnail /></Col>
                            </Row>
                        </div>
                    </Accordion.Collapse>
                </Accordion>
                ))}
            </div>

        );
    }
}

export default ListingDetailAvailableSpace;
