import React from "react";

import { connect } from "react-redux";

import {
    Row, Col, FormGroup, ControlLabel, Form, OverlayTrigger,
    FormControl, Button, Table, Radio, ListGroupItem, Well, Modal, ButtonToolbar
} from "react-bootstrap";
import PromptModal from "../../../../common/promptModal.jsx";
import AlertToast from "../../../../common/alertToast.jsx";
import loaderAction from "../../../../../actions/loaderAction";

import { ajax } from "../../../../../utils/ajax.js";

class TableDataRow extends React.Component {
    render() {
        const check = (<i className="glyphicon glyphicon-ok color-green margin-left-5" />);
        const cross = (<i className="glyphicon glyphicon-remove color-red margin-left-5" />);

        return (
            <tr>
                <td >{this.props.data.emailDomainName}</td>
                <td>
                    {this.props.data.isDomainAuthnticated ? <span className="no-padding"> Authenticate This Domain {check}</span> :
                        <p>
                            <span className="action-link color-button-background no-padding" onClick={this.props.openAuthenticationModal.bind(this, this.props.data.emailDomainId)}>
                                Authenticate This Domain
                    </span> {cross}</p>
                    }
                </td>
                <td>
                    {this.props.data.isDomainVerified ? <span className="no-padding">Verify This Domain {check}</span> :
                        <p>
                            <span className="action-link color-button-background no-padding" onClick={this.props.openVerificationModal}>
                                Verify This Domain
                    </span> {cross}</p>
                    }
                </td>
                <td>
                    <span className="action-button--display-inline">
                        <i className="glyphicon glyphicon-trash action-link"
                            onClick={() => {
                                this.props.deleteDomain(this.props.data.emailDomainId);
                            }} />
                    </span>

                </td>
            </tr>
        );
    }
}



class Domain extends React.Component {
    constructor() {
        super();
        this.state = {
            domainEmail: "",
            domainList: [],
            toBeDeletedId: "",
            promptModalShow: false,
            showVerificationModal: false,
            verificationSent: false,
            showAuthenticationModal: false,
            showWarning: false,
            authenticationSent: false,
            cName: "dkim.mcsv.net",
            txtRecord: "v=spf1 include:servers.mcsv.net?all",
            cNameRecordList: [],
            txtRecordList: [],
            toastList: []
        };
    }
    render() {
        const promptModal = (
            <PromptModal message="Are you sure want to delete domain"
                keyWord="Deleting..."
                closeModal={this.closePromptModal.bind(this)}
                delete={this.confirmClick.bind(this)} />);

        const renderErrorAlertToasts = (this.state.toastList.map((toast) => {
            return (
                <AlertToast key={toast.id}
                    style={toast.type}
                    message={toast.message}
                    id={toast.id}
                    closeAlert={this.closeToast.bind(this)} />
            );
        }));
        return (
            <div className="domain-verification-page padding-top-10">
                <div className="alert-toast">
                    {renderErrorAlertToasts}
                </div>
                <h3 className="margin-top-5">Domains</h3>
                <h5 className="color-grey">Add and verify your domain for better email experience and company recognition.</h5>
                <hr />
                <Button className="pull-right"
                    bsSize="small" bsStyle="primary"
                    onClick={() => {
                        this.setState({ showVerificationModal: true });
                    }}> Add New Domain </Button>
                <div className="clearfix" />
                <Table className="campaign-list-table margin-top-10" hover>
                    <thead>
                        <tr>
                            <th>Domains</th>
                            <th>Authenticate</th>
                            <th>Verify</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.domainList.map((domain, i) => {
                            return (<TableDataRow
                                key={i}
                                data={domain}
                                openVerificationModal={() => {
                                    this.setState({ showVerificationModal: true });
                                }}
                                deleteDomain={(i) => {
                                    this.setState({
                                        promptModalShow: true,
                                        toBeDeletedId: i
                                    });
                                }}
                                openAuthenticationModal={(id) => {
                                    this.getCnameAndTxtRecord(id);
                                    this.setState({ showAuthenticationModal: true });
                                }} />);
                        })}
                    </tbody>
                </Table>
                {/* verification modal */}
                <Modal show={this.state.showVerificationModal} onHide={() => {
                    this.setState({ showVerificationModal: false });
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Verify Domain</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <FormGroup>
                            <div className={this.state.verificationSent ? "hidden" : ""}>
                                <p>
                                    Please enter your email ID with a domain you wish to verify. We need it to know
                                    that you have access to an email address at the domain you plan to send an emailer.
                                    You will receive the verification email once you hit the send verification email button.
                                </p>
                                <ControlLabel>
                                    Email Address
                                     </ControlLabel>
                                <FormControl type="text"
                                    //disabled={this.state.singleDomain.id ? true : false}
                                    value={this.state.domainEmail}
                                    onChange={(e) => {
                                        this.setState({
                                            domainEmail: e.target.value
                                        });
                                    }} />
                                <p className="ps-note margin-top-10">Enter an address that contains the domain you want to verify.</p>
                            </div>
                            <div className={this.state.verificationSent ? "" : "hidden"}>
                                <Well className="send-verification">Your verification email is on the way !</Well>
                                <p>
                                    We sent an email to {this.state.domainEmail} to verify the domain {this.state.domainEmail.split("@")[1]}.To verify {this.state.domainEmail.split("@")[1]}, click Verify Domain Access in the email
                                </p>
                            </div>
                        </FormGroup>
                        <ButtonToolbar className="pull-right">
                            <Button bsStyle="link" bsSize="small"
                                onClick={() => {
                                    this.setState({
                                        showVerificationModal: false,
                                        verificationSent: false
                                    });
                                    this.getAllDomains();
                                }}>Cancel</Button>
                            {this.state.verificationSent ?
                                <Button bsStyle="primary" bsSize="small"
                                    onClick={() => {
                                        this.resendVerificationEmail();

                                    }}>Resend</Button>
                                :
                                <Button bsStyle="primary" bsSize="small"
                                    onClick={() => {
                                        this.sendVerificationEmail();
                                    }}>Send Verification Email</Button>
                            }
                        </ButtonToolbar>
                        <div className="clearfix" />
                    </Modal.Body>
                </Modal>
                {/* authentication modal */}
                <Modal className="authentication-modal" show={this.state.showAuthenticationModal} onHide={() => {
                    this.setState({ showAuthenticationModal: false });
                }} bsSize="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Authenticate Domain</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <ListGroupItem className={this.state.showWarning ? "" : "hidden"} bsStyle="danger">
                            <div className="display-inline-block warning-sign">
                                <i className="glyphicon glyphicon-warning-sign" />
                            </div>
                            <div className="display-inline-block warning-text"> We tried to  verify your DNS changes and did not detect the right values. Remember that the DNS changes takes 24-48 hours to propagate through the internet.<br />
                                SPF: TXT record containing "include:servers.mcsv.net" not found.
                            </div>
                        </ListGroupItem>
                        <div className="padding-10">
                            <p>
                                Get your domain authenticated with MarketerBoard in just one step. Just change your domain DNS record and give us 24-48 hours to publish the changes. The changes made by you in DNS records will allow the campaign to display uxdialogue.com instead of server name.
                                    </p>
                            <ControlLabel>
                                Create a CNAME record for k1._domainKey.uxdialogue.com with value:
                                     </ControlLabel>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.cNameRecordList.map((record, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{record.recordName}</td>
                                                <td>{record.recordType}</td>
                                                <td>{record.recordValue}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                            <ControlLabel>
                                SPF: Create a TXT record for uxdialogue.com with:
                                     </ControlLabel>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.txtRecordList.map((record, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{record.recordName}</td>
                                                <td>{record.recordType}</td>
                                                <td>{record.recordValue}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                            <Button bsStyle="link" bsSize="small">Know more about Authentication ?</Button>
                            <ButtonToolbar className="pull-right">
                                <Button bsStyle="link" bsSize="small"
                                    onClick={() => {
                                        this.setState({ showAuthenticationModal: false });
                                        this.getAllDomains();
                                    }}>Cancel</Button>
                                <Button bsStyle="primary" bsSize="small"
                                    onClick={() => {
                                        this.setState({ showWarning: true });
                                    }}>Authenticate Domain</Button>
                            </ButtonToolbar>
                            <div className="clearfix" />
                        </div>
                    </Modal.Body>
                </Modal>
                {this.state.promptModalShow ? promptModal : null}
            </div>
        );
    }
    componentDidMount() {
        this.getAllDomains();

        if (window.location.href.includes("token=")) {
            let token = window.location.href.split("token=")[1];
            this.getVerifiedDomain(token);
        }
    }

    getAllDomains() {
        let config = {
            method: "get",
            url: "/performance/emailDomain"
        };
        this.props.showLoader();
        ajax(config)
            .then((response) => {
                this.props.hideLoader();
                this.setState({ domainList: response.data });
            })
            .catch((error) => {
                this.props.hideLoader();
                error.map((err) => {
                    this.toastHandler({
                        id: new Date().getTime(),
                        type: "danger",
                        message: err.errorMessage
                    });
                });
            });
    }

    getVerifiedDomain(token) {
        let config = {
            method: "get",
            url: "/performance/emailDomain/verify?token=" + token
        };
        this.props.showLoader();
        ajax(config)
            .then(() => {
                this.props.hideLoader();
                this.getAllDomains();
            })
            .catch((error) => {
                this.props.hideLoader();
                error.map((err) => {
                    this.toastHandler({
                        id: new Date().getTime(),
                        type: "danger",
                        message: err.errorMessage
                    });
                });
            });
    }

    closePromptModal() {
        this.setState({ promptModalShow: false });
    }
    confirmClick() {
        this.setState({ promptModalShow: false });
        this.deleteDomain(this.state.toBeDeletedId);
    }
    deleteDomain(index) {
        let config = {
            method: "delete",
            url: "performance/emailDomain/" + index
        };

        this.props.showLoader();
        ajax(config)
            .then(() => {
                this.props.hideLoader();
                this.toastHandler({
                    id: new Date().getTime(),
                    type: "success",
                    message: "Domain deleted successfully"
                });
                this.getAllDomains();
            })
            .catch((error) => {
                this.props.hideLoader();
                error.map((err) => {
                    this.toastHandler({
                        id: new Date().getTime(),
                        type: "danger",
                        message: err.errorMessage
                    });
                });
            });

    }
    sendVerificationEmail() {
        this.setState({
            verificationSent: true
        });
        let domainName = this.state.domainEmail.split("@")[1];
        let config = {
            method: "post",
            url: "/performance/emailDomain",
            data: {
                domainEmail: this.state.domainEmail,
                emailDomainName: domainName
            }
        };

        this.props.showLoader();
        ajax(config)
            .then((response) => {
                this.props.hideLoader();
                this.setState({ domainList: response.data });
                this.setState({ showVerificationModal: false });
            })
            .catch((error) => {
                this.props.hideLoader();
                error.map((err) => {
                    this.toastHandler({
                        id: new Date().getTime(),
                        type: "danger",
                        message: err.errorMessage
                    });
                });
            });

    }

    resendVerificationEmail() {
        let config = {
            method: "put",
            url: "/performance/emailDomain/resend",
            data: {
                domainEmail: this.state.domainEmail
            }
        };
        this.props.showLoader();
        ajax(config)
            .then(() => {
                this.props.hideLoader();
                this.setState({ showVerificationModal: false });
            })
            .catch((error) => {
                this.props.hideLoader();
                error.map((err) => {
                    this.toastHandler({
                        id: new Date().getTime(),
                        type: "danger",
                        message: err.errorMessage
                    });
                });
            });
    }

    getCnameAndTxtRecord(id) {
        let config = {
            method: "get",
            url: "/performance/emailDomainTransaction?emailDomainId=" + id
        };
        this.props.showLoader();
        ajax(config)
            .then((response) => {
                this.props.hideLoader();
                this.setState({
                    cNameRecordList: response.data.cnameRecords,
                    txtRecordList: response.data.txtRecords
                });
            })
            .catch((error) => {
                this.props.hideLoader();
                error.map((err) => {
                    this.toastHandler({
                        id: new Date().getTime(),
                        type: "danger",
                        message: err.errorMessage
                    });
                });
            });
    }

    closeToast(id) {
        let filteredToasts;
        filteredToasts = this.state.toastList.filter((t) => {
            return t.id !== id;
        });
        this.setState({ toastList: filteredToasts });
    }
    toastHandler(obj) {
        this.setState({
            toastList: this.state.toastList.concat([{
                id: obj.id,
                type: obj.type,
                message: obj.message
            }])
        });
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showLoader: () => {
            dispatch(loaderAction.showLoader());
        },
        hideLoader: () => {
            dispatch(loaderAction.hideLoader());
        }
    };
};

const mapStateToProps = () => {
    return {};
};



export default connect(mapStateToProps, mapDispatchToProps)(Domain);