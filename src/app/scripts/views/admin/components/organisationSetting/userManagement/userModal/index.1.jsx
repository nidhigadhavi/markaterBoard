import React from "react";
import validations from "../../../../../../utils/inputValidation.jsx";
import { FormControl, Button, Modal, FormGroup, Col, Form, ControlLabel, Table } from "react-bootstrap";

import update from "immutability-helper";

import Astrix from "../../../../../common/astix.jsx";
import Option from "../../../../../common/optionDropdown.jsx";

class ModuleTableRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        this.props;
        return (
            <tr>
                <td>
                    {this.props.data.label}
                </td>
                {this.props.permissionList.map((el, i) => {
                    return (<td key={i} className="text-center">
                        <input type="radio" value={el.value}
                            checked={this.props.data.permission === el.value}
                            onChange={this.checkBoxChanged.bind(this, this.props.index, el.value)} />
                    </td>);
                })}
            </tr>
        );
    }
    checkBoxChanged(id, value) {
        this.props.checkBoxClick(id, value);
    }
}



class UserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailIdvalid: false,
            lastNamevalid: false,
            firstNamevalid: false,
            profileIdvalid: false,
            userData: {
                id: "",
                lastName: "",
                firstName: "",
                city: "",
                status: "",
                profileId: "",
                profileName: "",
                emailId: "",
                modulePermissionAccess: []
            }
        };

        this.saveHandler = this.saveHandler.bind(this);
    }
    render() {
        this.props.data;
        const disableInput = this.props.userEditForm ? "disabled" : false;
        return (
            <Modal show bsSize="large">
                <Modal.Header>
                    <Modal.Title>
                        Add users
                     </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Enter the name and email ID of a person you wish to invite. An email invitation will be sent to the person to access marketboard.</h5>
                    <Col md={5}>
                        <Form>
                            <FormGroup controlId="formFirstName"
                                validationState={(this.state.firstNamevalid ? "error" : null)}>
                                <ControlLabel>
                                    First Name<Astrix />
                                </ControlLabel>
                                <FormControl title="First Name" type="text"
                                    value={this.state.userData.firstName} placeholder="First Name"
                                    onChange={this.updateFields.bind(this, "firstName")} required />
                            </FormGroup>
                            <FormGroup controlId="formLastName"
                                validationState={(this.state.lastNamevalid ? "error" : null)}>
                                <ControlLabel>
                                    Last Name<Astrix />
                                </ControlLabel>
                                <FormControl title="Last Name" type="text"
                                    value={this.state.userData.lastName} placeholder="Last Name"
                                    onChange={this.updateFields.bind(this, "lastName")} required />
                            </FormGroup>
                            <FormGroup controlId="formEmail"
                                validationState={this.props.userEditForm ? null :
                                    (validations.email(this.state.userData.emailId) || (this.state.emailIdvalid ? "error" : null))}>
                                <ControlLabel>Email id<Astrix /></ControlLabel>
                                <FormControl type="email" disabled={disableInput} title=">Email Id"
                                    value={this.state.userData.emailId} placeholder="Email id"
                                    onChange={this.updateFields.bind(this, "emailId")} required />
                                <FormControl.Feedback className={this.props.userEditForm ? "hidden" : "show"} />
                            </FormGroup>
                            <FormGroup controlId="formProfile" validationState={(this.state.profileIdvalid ? "error" : null)}>
                                <ControlLabel>Profile<Astrix /></ControlLabel>
                                <select name="profile" value={this.state.userData.profileId}
                                    className="form-control"
                                    onChange={this.updateFields.bind(this, "profileId")} required>
                                    <option defaultValue disabled>Select</option>
                                    {this.props.profileList.map((profile, i) => {
                                        return (<Option key={i} data={profile} />);
                                    })}
                                </select>
                            </FormGroup>
                            <FormGroup className="pull-right">
                                <Col md={12}>
                                    <Button bsSize="small" bsStyle="link"
                                        onClick={this.props.closeUserModal}>
                                        Close
                                    </Button>
                                    <Button bsStyle="primary" bsSize="small"
                                        onClick={this.saveHandler}>
                                        Save
                                    </Button>
                                </Col>
                            </FormGroup>
                            <div className="clearfix" />
                        </Form>
                    </Col>
                    <Col md={7}>
                        <FormGroup>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Plan</th>
                                        {this.props.permissionList.map((el, i) => {
                                            return (
                                                <th key={i} className="width-60 text-capitalize color-white hover-color-white action-link"
                                                    onClick={this.headClicked.bind(this, el.value)}>
                                                    {el.label}
                                                </th>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.userData.modulePermissionAccess.map((module, i) => {
                                        return (
                                            <ModuleTableRow
                                                key={i}
                                                index={i}
                                                data={module}
                                                permissionList={this.props.permissionList}
                                                checkBoxClick={this.checkBoxClick.bind(this)} />
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </FormGroup>
                    </Col>
                    <div className="clearfix" />
                </Modal.Body>
            </Modal>
        );
    }
    componentDidMount() {
        this.setState({ userData: this.props.data });
    }
    updateFields(prop, e) {
        let newUserArray;
        newUserArray = update(this.state.userData, {
            [prop]: { $set: e.target.value }
        });
        this.setState({ userData: newUserArray });
    }
    headClicked(accessId) {
        this.props.headClicked(accessId);
    }
    checkBoxClick(id, value) {
        let newState;
        newState = update(this.state.userData, {
            modulePermissionAccess: {
                [id]: {
                    permission: { $set: value }
                }
            }
        });
        this.setState({ userData: newState });
        this.state.userData.modulePermissionAccess;
    }
    saveHandler() {
        if ((this.state.userData.emailId === "") ||
            (this.state.userData.firstName === "") ||
            (this.state.userData.lastName === "") ||
            (this.state.userData.profileId === "")) {
            if (this.state.userData.emailId === "") {
                this.setState({ emailIdvalid: true });
            }
            if (this.state.userData.lastName === "") {
                this.setState({ lastNamevalid: true });
            }
            if (this.state.userData.firstName === "") {
                this.setState({ firstNamevalid: true });
            }
            if (this.state.userData.profileId === "") {
                this.setState({ profileIdvalid: true });
            }
        } else {
            this.props.userSaveHandler(this.state.userData);
        }
    }
}

export default UserModal;