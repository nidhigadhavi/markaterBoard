import React from "react";
import {
    Panel, FormGroup, ControlLabel,
    Row, Col, Button
} from "react-bootstrap";
import ToggleButton from "react-toggle-button";

class GeneralSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeFormat: "",
            dateFormat: "",
            emailInvoice: false,
            mbNotification: false
        };
    }
    render() {
        return (
            <div className="padding-top-10">
                <h3 className="margin-top-5">General Setting</h3>
                <h5 className="color-grey">You can set some general setting for your convenience.</h5>
                <hr />
                <div className="margin-top-20">
                    <h4>Date & Time</h4>
                    <div>
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <ControlLabel>Time Format</ControlLabel>
                                    <select value={this.state.dateFormat}
                                        onChange={(e) => {
                                            this.setState({ dateFormat: e.target.value });
                                        }} className="form-control">
                                        <option defaultValue disabled>Select</option>
                                    </select>
                                </FormGroup>
                            </Col >
                            <Col md={4}>
                                <FormGroup>
                                    <ControlLabel>Date Format</ControlLabel>
                                    <select value={this.state.timeFormat}
                                        onChange={(e) => {
                                            this.setState({ timeFormat: e.target.value });
                                        }} className="form-control">
                                        <option defaultValue disabled>Select</option>
                                    </select>
                                </FormGroup>
                            </Col >
                        </Row>
                    </div>
                    <h4>Invoice</h4>
                    <div>
                        <Row>
                            <Col md={6}>
                                <p>Do you want to receive your invoice by email you renew your plan ? </p>
                            </Col >
                            <Col md={2}>
                                <FormGroup>
                                    <ToggleButton
                                        activeLabel="YES"
                                        inactiveLabel="NO"
                                        className="display-inline-block"
                                        value={this.state.emailInvoice}
                                        colors={{
                                            active: {
                                                base: "#31708f"
                                            },
                                            inactive: {
                                                base: "#b3b2b2"
                                            }
                                        }}
                                        onToggle={(value) => {
                                            this.setState({ emailInvoice: !value });
                                        }} />
                                </FormGroup>
                            </Col >
                        </Row>
                        <Row>
                            <Col md={6}>
                                <p>Do you want to disable the MB notification ? </p>
                            </Col >
                            <Col md={2}>
                                <FormGroup>
                                    <ToggleButton
                                        activeLabel="YES"
                                        inactiveLabel="NO"
                                        className="display-inline-block"
                                        value={this.state.mbNotification}
                                        colors={{
                                            active: {
                                                base: "#31708f"
                                            },
                                            inactive: {
                                                base: "#b3b2b2"
                                            }
                                        }}
                                        onToggle={(value) => {
                                            this.setState({ mbNotification: !value });
                                        }} />
                                </FormGroup>
                            </Col >
                        </Row>
                    </div>
                </div>
                <Button bsSize="small"
                    bsStyle="primary"
                    className="pull-right">
                    Save
                    </Button>
            </div>
        );
    }
}
export default GeneralSetting;