import React from "react";
import {
    FormControl, Button, Modal, FormGroup,
    ButtonToolbar, Form, ControlLabel, Checkbox, Table, Row, Col
} from "react-bootstrap";
import Astrix from "../../../../../common/astix.jsx";
import "./css/profilepopup.scss";
import validations from "../../../.../../../../../utils/inputValidation.jsx"
// import ProfileCreation from "./createProfile/createProfile.jsx";

class ProfileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            adminCheck: false,
            profileName: this.props.data.profileName ? this.props.data.profileName : "",
            description: this.props.data.description ? this.props.data.description : "",
            profileId: this.props.data.profileId ? this.props.data.profileId : "",
            televisionMediaOption: "",
            digitalMarketingOption: "",
            outOfHomeOption: "",
            socialMediaOption: "",
            printMediaOption: "",
            emailMarketingMediaOption: "",
            radioMediaOption: "",
            message: "",
            errorMsg: {
                profileNameValid: false,
                profileDescriptionvalid: false
            }
        };
    }
    render() {
        return (
            <div>
                <Modal show className="profile-popup">
                    <Modal.Header>
                        <Modal.Title>
                            Add New Profile
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="grey-text">Enter the name and Email ID of a person you wish to invite. An email invitation will be sent to the person to access MarketerBoard person to access MarketerBoard.</p>
                        <FormGroup controlId="formProfileName" validationState={(this.state.errorMsg.profileNameValid ? "error" : null)}>
                            <ControlLabel>Profile Name<Astrix /></ControlLabel>
                            <FormControl title="Profile Name" type="text" value={this.state.profileName} placeholder="Profile name"
                            maxLength="30"
                            tabIndex="1"
                            onChange={this.updateName.bind(this)} required />
                            <span className={this.state.profileName.length === 0 && this.state.errorMsg.profileNameValid ? "error-msg show": "hide"} >
                            Please enter the profile name
                            </span>
                            <span className={this.state.profileName.length > 0 &&this.state.errorMsg.profileNameValid ? "show error-msg": "hide"} >
                            Please enter valid profile name
                            </span>
                        </FormGroup>
                        <FormGroup controlId="formProfileDescription" validationState={(this.state.errorMsg.profileDescriptionvalid ? "error" : null)}>
                            <ControlLabel>Profile Description<Astrix /></ControlLabel>
                            <FormControl componentClass="textarea"
                                placeholder="Profile description"
                                rows="3" className="no-resize"
                                value={this.state.description}
                                maxLength="200"
                                tabIndex="2"
                                onChange={this.updateDescription.bind(this)} required />
                                 <span className={this.state.description.length === 0 && this.state.errorMsg.profileDescriptionvalid ? "error-msg show": "hide"} >
                                 Please enter the profile description
                            </span>
                            <span className={this.state.description.length > 0 &&this.state.errorMsg.profileDescriptionvalid ? "show error-msg": "hide"} >
                            Please enter valid profile description
                            </span>
                        </FormGroup>
                        {/* <FormGroup controlId="formAdmin">
                            <FormGroup>
                                <Checkbox name="admin" onClick={this.adminCheckClick.bind(this)} value={this.state.adminCheck} inline> Allow Admin Access </Checkbox>
                            </FormGroup>
                        </FormGroup> */}
                        {/*<div className={this.state.adminCheck ? "hide" : "show"}>
                                <FormGroup controlId="formEmail">
                                    <Col sm={9}>
                                        <h4>Permission</h4>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col md={12}>
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                    <th>Plan</th>
                                                    <th>View</th>
                                                    <th>Create</th>
                                                    <th>All</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Digital Marketing</td>
                                                    <td><input type="radio" value="option1"
                                                        checked={this.state.digitalMarketingOption === "option1"}
                                                        onChange={this.handleDigitalMarketingChange.bind(this)} /></td>
                                                    <td><input type="radio" value="option2"
                                                        checked={this.state.digitalMarketingOption === "option2"}
                                                        onChange={this.handleDigitalMarketingChange.bind(this)} /></td>
                                                    <td><input type="radio" value="option3"
                                                        checked={this.state.digitalMarketingOption === "option3"}
                                                        onChange={this.handleDigitalMarketingChange.bind(this)} /></td>
                                                </tr>
                                                <tr>
                                                    <td>Print Media</td>
                                                    <td><input type="radio" value="option4"
                                                        checked={this.state.printMediaOption === "option4"}
                                                        onChange={this.handlePrintMediaChange.bind(this)} /></td>
                                                    <td><input type="radio" value="option5"
                                                        checked={this.state.printMediaOption === "option5"}
                                                        onChange={this.handlePrintMediaChange.bind(this)} /></td>
                                                    <td><input type="radio" value="option6"
                                                        checked={this.state.printMediaOption === "option6"}
                                                        onChange={this.handlePrintMediaChange.bind(this)} /></td>
                                                </tr>
                                                <tr>
                                                    <td>Radio</td>
                                                    <td><input type="radio" value="option10"
                                                        checked={this.state.radioMediaOption === "option10"}
                                                        onChange={this.handleRadioMediaChange.bind(this)} /></td>
                                                    <td><input type="radio" value="option11"
                                                        checked={this.state.radioMediaOption === "option11"}
                                                        onChange={this.handleRadioMediaChange.bind(this)} /></td>
                                                    <td><input type="radio" value="option12"
                                                        checked={this.state.radioMediaOption === "option12"}
                                                        onChange={this.handleRadioMediaChange.bind(this)} /></td>
                                                </tr>
                                                <tr>
                                                    <td>Television</td>
                                                    <td><input type="radio" value="option7"
                                                        checked={this.state.televisionMediaOption === "option7"}
                                                        onChange={this.handleTelevisionMediaChange.bind(this)} /></td>
                                                    <td><input type="radio" value="option8"
                                                        checked={this.state.televisionMediaOption === "option8"}
                                                        onChange={this.handleTelevisionMediaChange.bind(this)} /></td>
                                                    <td><input type="radio" value="option9"
                                                        checked={this.state.televisionMediaOption === "option9"}
                                                        onChange={this.handleTelevisionMediaChange.bind(this)} /></td>
                                                </tr>
                                                <tr>
                                                    <td>Out Of Home</td>
                                                    <td><input type="radio" value="option19"
                                                        checked={this.state.outOfHomeOption === "option19"}
                                                        onChange={this.handleOutOfHomeChange.bind(this)} /></td>
                                                    <td><input type="radio" value="option20"
                                                        checked={this.state.outOfHomeOption === "option20"}
                                                        onChange={this.handleOutOfHomeChange.bind(this)} /></td>
                                                    <td><input type="radio" value="option21"
                                                        checked={this.state.outOfHomeOption === "option21"}
                                                        onChange={this.handleOutOfHomeChange.bind(this)} /></td>
                                                </tr>
                                                <tr>
                                                    <td>Email Marketing</td>
                                                    <td><input type="radio" value="option13"
                                                        checked={this.state.emailMarketingMediaOption === "option13"}
                                                        onChange={this.handleEmailMarketingMediaChange.bind(this)} /></td>
                                                    <td><input type="radio" value="option14"
                                                        checked={this.state.emailMarketingMediaOption === "option14"}
                                                        onChange={this.handleEmailMarketingMediaChange.bind(this)} /></td>
                                                    <td><input type="radio" value="option15"
                                                        checked={this.state.emailMarketingMediaOption === "option15"}
                                                        onChange={this.handleEmailMarketingMediaChange.bind(this)} /></td>
                                                </tr>
                                                <tr>
                                                    <td>Social Media</td>
                                                    <td><input type="radio" value="option16"
                                                        checked={this.state.socialMediaOption === "option16"}
                                                        onChange={this.handleSocialMediaChange.bind(this)} /></td>
                                                    <td><input type="radio" value="option17"
                                                        checked={this.state.socialMediaOption === "option17"}
                                                        onChange={this.handleSocialMediaChange.bind(this)} /></td>
                                                    <td><input type="radio" value="option18"
                                                        checked={this.state.socialMediaOption === "option18"}
                                                        onChange={this.handleSocialMediaChange.bind(this)} /></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>

                                </FormGroup>
                            </div>*/}
                        <ButtonToolbar className="pull-right margin-top-20">
                            <Button bsSize="small" bsStyle="link"
                             tabIndex="4"
                            onClick={this.props.closeProfileModal}>Cancel</Button>
                            {/*<Button className="pull-right" bsSize="small" bsStyle="link" onClick={this.clearRadioButton.bind(this)}>Clear</Button>*/}
                            
                            <Button bsStyle="primary" bsSize="small"
                                className="button-primary"
                                tabIndex="3"
                                onClick={this.submitHandler.bind(this)}>Save</Button>
                        </ButtonToolbar>
                        <div className="clearfix" />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
    clearRadioButton() {
        this.setState({
            digitalMarketingOption: "",
            televisionMediaOption: "",
            outOfHomeOption: "",
            socialMediaOption: "",
            printMediaOption: "",
            emailMarketingMediaOption: "",
            radioMediaOption: ""
        });
    }
    submitHandler() {
        let errorMsgObj = this.state.errorMsg
        if (this.state.profileName === "" || this.state.description === "") {

            if (this.state.profileName === "") {
                errorMsgObj.profileNameValid = true               
            }
            if (this.state.description === "") {
                errorMsgObj.profileDescriptionvalid = true                
            }
            this.setState({errorMsg:errorMsgObj})
        } else {
            this.props.profileSaveHandler(this.state);
        }
    }
    hideMessage() {
        this.setState({
            descriptionvalid: false,
            namevalid: false
        });
    }
    handleTelevisionMediaChange(e) {
        this.setState({
            televisionMediaOption: e.target.value
        });
    }
    handleDigitalMarketingChange(e) {
        this.setState({
            digitalMarketingOption: e.target.value
        });
    }
    handleOutOfHomeChange(e) {
        this.setState({
            outOfHomeOption: e.target.value
        });
    }
    handleEmailMarketingMediaChange(e) {
        this.setState({
            emailMarketingMediaOption: e.target.value
        });
    }
    handleRadioMediaChange(e) {
        this.setState({
            radioMediaOption: e.target.value
        });
    }
    handleSocialMediaChange(e) {
        this.setState({
            socialMediaOption: e.target.value
        });
    }
    handlePrintMediaChange(e) {
        this.setState({
            printMediaOption: e.target.value
        });
    }
    adminCheckClick() {
        this.setState({ adminCheck: !this.state.adminCheck });
    }
    updateName(e) {
        let errorMsgObj = this.state.errorMsg
        if(validations.character(e.target.value)){
            errorMsgObj.profileNameValid = false
            this.setState({errorMsgObj,profileName:e.target.value})
        }else{
            errorMsgObj.profileNameValid = true
            this.setState({errorMsgObj})
        }
        // this.setState({ profileName: e.target.value });
        // this.hideMessage();
    }
    updateDescription(e) {
        let errorMsgObj = this.state.errorMsg
        if(validations.address(e.target.value)){
            errorMsgObj.profileDescriptionvalid = false
            this.setState({errorMsgObj,description:e.target.value})
        }else{
            errorMsgObj.profileDescriptionvalid = true
            this.setState({errorMsgObj})
        }
    }
}



export default ProfileModal;