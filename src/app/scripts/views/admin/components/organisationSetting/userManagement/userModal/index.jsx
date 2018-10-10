import React from "react";
import validations from "../../../../../../utils/inputValidation.jsx";
import {
    FormControl, Button, Modal, FormGroup,
    ButtonToolbar, Form, ControlLabel, Row, Col, Tabs, Tab, Checkbox
} from "react-bootstrap";
import Astrix from "../../../../../common/astix.jsx";
import Option from "../../../../../common/optionDropdown.jsx";
import "./css/usermodal.scss";

class UserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            emailId: "",
            organizationId: "",
            profileId: "select",
            roleId: "",
            userId: "",
            // emailIdvalid: false,
            // lastNamevalid: false,
            // firstNamevalid: false,
            // profileIdvalid: false,
            errorMsg:{
                firstNamevalid: false,
                lastNamevalid: false,
                emailIdvalid: false,
                profileIdvalid: false



            }
        };

        this.updateFirstName = this.updateFirstName.bind(this);
        this.updateLastName = this.updateLastName.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
        this.profileChangeHandler = this.profileChangeHandler.bind(this);

    }
    render() {
        this.props.data;
        const disbleInput = this.props.userEditForm ? "disabled" : false;
        return (
            <Modal show className="invite-user-popup">
                <Modal.Header>
                    <Modal.Title>
                        Invite User
                     </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="grey-text margin-top-0">Enter the name and email ID of a person you wish to invite. An email invitation will be sent to the person to access MarketerBoard.</p>
                    <Row>
                        <Col md={6} className="padding-left-0">
                            <FormGroup controlId="formFirstName" validationState={this.state.errorMsg.firstNamevalid ? "error" : null}>
                                <ControlLabel>First Name<Astrix /></ControlLabel>
                                <FormControl title="First Name" type="text" value={this.state.firstName} placeholder="First Name" 
                                onChange={this.updateFirstName.bind(this,"firstName")}  
                                // onChange={this.updateState.bind(this, "firstName")}
                                />
                                <span className={this.state.errorMsg.firstNamevalid && this.state.firstName.length === 0 ? " error-msg show" : "hide"}> Please enter your First Name</span>
                                <span className={this.state.errorMsg.firstNamevalid && this.state.firstName.length > 0 ? " error-msg show" : "hide"}> Please enter valid First Name</span>
                            </FormGroup>
                            <FormGroup controlId="formEmail" 
                            validationState={this.state.errorMsg.emailIdvalid ? "error" : null}
                            // validationState={this.props.userEditForm ? null : (validations.email(this.state.emailId) || (this.state.emailIdvalid ? "error" : null))}
                            >
                                <ControlLabel>Email id<Astrix /></ControlLabel>
                                <FormControl type="email" disabled={disbleInput} title="Email Id" value={this.state.emailId} placeholder="Email id" 
                                onChange={this.updateEmail.bind(this,"emailId")}  />
                                <span className={this.state.errorMsg.emailIdvalid && this.state.emailId.length === 0 ? " error-msg show" : "hide"}> Please enter the Email ID</span>
                                <span className={this.state.errorMsg.emailIdvalid && this.state.emailId.length > 0 ? " error-msg show" : "hide"}> Please enter valid Email ID</span>
                                {/* <FormControl.Feedback className={this.props.userEditForm ? "hidden" : "show"} /> */}
                            </FormGroup>
                        </Col>
                        <Col md={6} className="padding-right-0">
                            <FormGroup controlId="formLastName" validationState={(this.state.errorMsg.lastNamevalid ? "error" : null)}>
                                <ControlLabel>Last Name<Astrix /></ControlLabel>
                                <FormControl title="Last Name" type="text" value={this.state.lastName} placeholder="Last Name"
                                 onChange={this.updateLastName.bind(this,"lastName")}  />
                                <span className={this.state.errorMsg.lastNamevalid && this.state.lastName.length === 0 ? " error-msg show" : "hide"}> Please enter your Last Name</span>
                                <span className={this.state.errorMsg.lastNameValid && this.state.lastName.length > 0 ? " error-msg show" : "hide"}> Please enter valid Last Name</span>
                            </FormGroup>
                            <FormGroup controlId="formProfile" validationState={(this.state.errorMsg.profileIdvalid ? "error" : null)}>
                                <ControlLabel>Profile<Astrix /></ControlLabel>
                                <select name="profile" value={this.state.profileId} className="form-control" onChange={this.profileChangeHandler.bind(this)} >
                                    <option defaultValue disabled>Select</option>
                                    {this.props.profileList.map((profile, i) => {
                                        return (<Option key={i} data={profile} />);
                                    })}
                                </select>
                                <span className={this.state.errorMsg.profileIdvalid && this.state.profileId.length === 0 ? " error-msg show" : "hide"}> Please select profile from the dropdown.</span>
                                <span className={this.state.errorMsg.profileIdvalid && this.state.profileId.length > 0 ? " error-msg show" : "hide"}> Please select valid profile from the dropdown.</span>
                            </FormGroup>

                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <p className="margin-top-5 font-weight-700 font-14">Add Permission and Access</p>
                        <p className="grey-text font-12 margin-bottom-10">Select any module to view sub module and grant access to a user.</p>

                        <Tabs defaultActiveKey={2} id="uncontrolled-tab-example" className="margin-left-1 user-premision-tabs">
                            <Tab eventKey={1} title="Research">
                                <FormGroup className="margin-left-1">
                                    <Checkbox inline>Digital</Checkbox> <Checkbox inline>SMS</Checkbox>
                                    <Checkbox inline>Email</Checkbox>
                                    <Checkbox inline>Content</Checkbox>
                                </FormGroup>
                            </Tab>
                            <Tab eventKey={2} title="Marketing">
                                <FormGroup className="margin-left-1">
                                    <Checkbox inline>Digital</Checkbox> <Checkbox inline>SMS</Checkbox>
                                    <Checkbox inline>Email</Checkbox>
                                    <Checkbox inline>Content</Checkbox>
                                </FormGroup>
                            </Tab>
                            <Tab eventKey={3} title="Digital">
                                Tab 3 content
  </Tab>
                        </Tabs>
                    </Row>



                    <ButtonToolbar className="pull-right">
                        <Button bsSize="small" bsStyle="link" onClick={this.props.closeUserModal}>Cancel</Button>
                        <Button bsStyle="primary" bsSize="small" onClick={this.saveHandler}
                        className="button-primary"
                        
                        >Save</Button>
                    </ButtonToolbar>
                    <div className="clearfix" />
                </Modal.Body>
            </Modal>
        );
    }
    // updateState(propName, e){
    //     let newObjErrMsg = Object.assign(this.state.errorMsg)
    //     if (propName === "firstName") {
    //         if (validations.character(e.target.value)) {
    //             newObjErrMsg.firstNameValid = false
    //             this.setState({
    //                 [propName]: e.target.value,
    //                 newObjErrMsg
    //             });
    //         }
    //         else {
    //             newObjErrMsg.firstNameValid = true
    //             this.setState({ newObjErrMsg })
    //         }
    //     }

    // }
    componentDidMount() {
        if (typeof this.props.data.profile === "object") {
            this.setState({
                firstName: this.props.data.firstName ? this.props.data.firstName : "",
                lastName: this.props.data.lastName ? this.props.data.lastName : "",
                emailId: this.props.data.emailId ? this.props.data.emailId : "",
                userId: this.props.data.userId ? this.props.data.userId : "",
                profileId: this.props.data.profile.profileId ? this.props.data.profile.profileId : ""
            });
        } else
            this.setState({
                firstName: this.props.data.firstName ? this.props.data.firstName : "",
                lastName: this.props.data.lastName ? this.props.data.lastName : "",
                emailId: this.props.data.emailId ? this.props.data.emailId : "",
                userId: this.props.data.userId ? this.props.data.userId : "",
                profileId: this.props.data.profileId ? this.props.data.profileId : ""
            });
    }
    saveHandler() {
        let newObjErrMsg = this.state.errorMsg;
        if ((this.state.emailId === "") ||
            (this.state.firstName === "") ||
            (this.state.lastName === "") ||
            (this.state.profileId === "")) {
            if (this.state.emailId === "") {
                newObjErrMsg.emailIdvalid= true;
              
            }
            if (this.state.lastName === "") {
                  newObjErrMsg.lastNamevalid= true;
            }
            if (this.state.firstName === "") {
                 newObjErrMsg.firstNamevalid= true;
            }
            if (this.state.profileId === "") {
                 newObjErrMsg.profileIdvalid= true;
            }
            this.setState({ newObjErrMsg });
        } else {
            this.props.userSaveHandler(this.state);
        }
    }
    hideError() {
        this.setState({
            descriptionvalid: false,
            lastNamevalid: false,
            emailIdvalid: false,
            firstNamevalid: false,
            profileIdvalid: false
        });
    }
    profileChangeHandler(e) {
        this.setState({ profileId: e.target.value });
    }
    updateFirstName(propName, e) {
        // this.setState({ firstName: e.target.value });
        // this.hideError();
        let newObjErrMsg = Object.assign(this.state.errorMsg)
        if (propName === "firstName") {
            if (validations.character(e.target.value)) {
                newObjErrMsg.firstNamevalid = false
                this.setState({
                    [propName]: e.target.value,
                    newObjErrMsg
                });
            }
            else {
                newObjErrMsg.firstNamevalid = true
                this.setState({ newObjErrMsg })
            }
        }
    }
    updateLastName(propName,e) {
        let newObjErrMsg = Object.assign(this.state.errorMsg)
        if (propName === "lastName") {
            if (validations.character(e.target.value)) {
                newObjErrMsg.lastNameValid = false
                this.setState({
                    [propName]: e.target.value,
                    newObjErrMsg
                });
            }
            else {
                newObjErrMsg.lastNameValid = true
                this.setState({ newObjErrMsg })
            }
        }
        // this.setState({ lastName: e.target.value });
        // this.hideError();
    }
    // updateEmail(e) {
        
    //     this.setState({ emailId: e.target.value });
    //     this.hideError();
    // }
    updateEmail(propName,e) {
        let newObjErrMsg = Object.assign(this.state.errorMsg)
        if (propName === "emailId") {
            if (validations.emailNew(e.target.value)) {
                newObjErrMsg.emailIdvalid = false
                this.setState({
                    [propName]: e.target.value,
                    newObjErrMsg
                });
            }
            else {
                newObjErrMsg.emailIdvalid = true
                this.setState({ newObjErrMsg,  [propName]: e.target.value });
            }
        // this.setState({ emailId: e.target.value });
        // this.hideError();
    }
    }
}

export default UserModal;