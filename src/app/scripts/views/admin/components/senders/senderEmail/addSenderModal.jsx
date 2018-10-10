import React from "react";
import {
    Button, Table, DropdownButton, MenuItem,
    ButtonToolbar, Modal, Form, FormGroup, ControlLabel, FormControl
} from "react-bootstrap";


class AddSenderModal extends React.Component {
    render() {
        return (
            <Modal show={this.props.showModal}>
                <Modal.Header>
                    <Modal.Title>Add Sender</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <FormGroup>
                        <ControlLabel>Sender Name</ControlLabel>
                        <FormControl type="text"
                            value={this.props.name}
                            onChange={(e) => {
                                this.props.updateFieldData({ fieldName: "senderName", value: e.target.value });
                            }}
                            placeholder="Enter the sender name" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Sender Email</ControlLabel>
                        <FormControl type="text"
                            value={this.props.email}
                            onChange={(e) => {
                                this.props.updateFieldData({ fieldName: "emailSenderEmail", value: e.target.value });
                            }}
                            placeholder="Enter the sender Email" />
                    </FormGroup>
                    <ButtonToolbar className="pull-right">
                        <Button bsStyle="link" bsSize="small" onClick={() => {
                            this.props.closeModal();
                        }}>Cancel</Button>
                        <Button bsStyle="primary" bsSize="small" onClick={() => {
                            this.props.addSender();
                        }}>Add</Button>
                    </ButtonToolbar>
                    <div className="clearfix" />
                </Modal.Body>
            </Modal>
        );
    }
}



export default AddSenderModal;