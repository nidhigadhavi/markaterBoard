import React from "react";
import { connect } from "react-redux";
import {
    Button, Table, DropdownButton, MenuItem,
    ButtonToolbar, Modal, Form, FormGroup, Col, Row
} from "react-bootstrap";

import { navigate } from "../../../../../utils/route";
import { ajax } from "../../../../../utils/ajax.js";
import loaderAction from "../../../../../actions/loaderAction";
import AlertToast from "../../../../common/alertToast.jsx";

import AddSenderModal from "./addSenderModal.jsx";
import PromptModal from "../../../../common/promptModal.jsx";

class SenderEmailDataRow extends React.Component {
    render() {
        const gearIcon = <i className="glyphicon glyphicon-cog" />;

        return (
            <tr>
                <td>{this.props.data.senderName}</td>
                <td>
                    {this.props.data.emailSenderEmail}
                    {this.props.data.isVerified ? <span><i className="glyphicon glyphicon-ok-sign color-green margin-left-5" /> Verified</span>
                        : <span><i className="glyphicon glyphicon-remove-sign color-red margin-left-5" /> Not Verified</span>
                    }
                </td>
                <td>
                    <ButtonToolbar>
                        <DropdownButton title={gearIcon} className="min-width-20 action-dropdown" id="bg-vertical-dropdown-2" bsSize="small">
                            <MenuItem eventKey="1" onClick={() => {
                                this.props.delete(this.props.index);
                            }}>Delete</MenuItem>
                            <MenuItem eventKey="2" onClick={() => {
                                this.props.edit(this.props.index);
                            }}>Edit</MenuItem>
                            {this.props.data.isVerified ? null : <MenuItem eventKey="3" onClick={() => {
                                this.props.resendEmail(this.props.index);
                            }}>Resend Verify Email</MenuItem>}
                        </DropdownButton>
                    </ButtonToolbar>
                </td>
            </tr >
        );
    }
}




class SenderEmail extends React.Component {
    constructor() {
        super();
        this.state = {
            senderEmailList: [],
            showAddSenderModal: false,
            emailSenderEmail: "",
            senderName: "",
            deleteShow: false,
            emailSenderId: "",
            toastList: [],
            deleteIndex: "",
            loaderVisible: false
        };
    }
    render() {
        const showAddSenderModal = <AddSenderModal
            showModal={this.state.showAddSenderModal}
            name={this.state.senderName}
            email={this.state.emailSenderEmail}
            data={this.state.senderObj}
            closeModal={() => {
                this.setState({ showAddSenderModal: false });
            }}
            addSender={() => {
                this.setState({ showAddSenderModal: false });
                this.addSender();
            }}
            updateFieldData={(data) => {
                if (data.fieldName === "senderName")
                    this.setState({ senderName: data.value });
                else
                    this.setState({ emailSenderEmail: data.value });
            }} />;

        const renderErrorAlertToasts = (this.state.toastList.map((toast) => {
            return (
                <AlertToast key={toast.id}
                    style={toast.type}
                    message={toast.message}
                    id={toast.id}
                    closeAlert={this.closeToast.bind(this)} />
            );
        }));
        const promptModal = (<PromptModal message="Are you sure want to delete sender email"
            keyWord="Deleting..."
            closeModal={this.closePromptModal.bind(this)}
            delete={this.deleteCampaignApiCall.bind(this)} />);
        return (
            <div className="padding-top-10">
                <div className="alert-toast">
                    {renderErrorAlertToasts}
                </div>
                <h3 className="margin-top-5">Sender Email</h3>
                <h5 className="color-grey">You can add multiple sender email to use while sending an email.</h5>
                <hr />
                <Button bsStyle="primary"
                    className="pull-right"
                    bsSize="small" onClick={() => {
                        this.setState({ showAddSenderModal: true });
                    }}>
                    Add Sender
                </Button>
                <div className="clearfix" />
                <Table className="campaign-list-table margin-top-10" hover>
                    <thead>
                        <tr>
                            <th>Sender Name</th>
                            <th>Sender Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.senderEmailList.map((data, i) => {
                            return (<SenderEmailDataRow data={data}
                                key={i}
                                index={i}
                                delete={(index) => {
                                    // this.deleteSenderNameAndEmail(index);
                                    this.setState({
                                        deleteIndex: index,
                                        deleteShow: true
                                    });
                                }}
                                edit={(index) => {
                                    this.editSenderNameAndEmail(index);
                                }}
                                resendEmail={(index) => {
                                    this.resendVerificationEmail(index);
                                }} />);
                        })}
                    </tbody>
                </Table>
                {this.state.showAddSenderModal ? showAddSenderModal : null}
                {this.state.deleteShow ? promptModal : null}
            </div>
        );
    }

    componentDidMount() {
        this.getAllSenderEmail();
        if (window.location.href.includes("token=")) {
            let token = window.location.href.split("token=")[1];
            this.verifySender(token);
        }
    }
    closePromptModal() {
        this.setState({ deleteShow: false });
    }
    deleteCampaignApiCall() {
        this.setState({ deleteShow: false });
        this.deleteSenderNameAndEmail(this.state.deleteIndex);
    }
    verifySender(token) {
        let config = {
            method: "get",
            url: "/performance/emailSender/verify?token=" + token
        };
        this.props.showLoader();
        ajax(config)
            .then(() => {
                this.props.hideLoader();
                navigate("admin-senders-sender-email");
                this.getAllSenderEmail();
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
    getAllSenderEmail() {
        let config = {
            method: "get",
            url: "/performance/emailSender"
        };
        this.props.showLoader();
        ajax(config)
            .then((response) => {
                this.setState({
                    senderEmailList: response.data
                });
                this.props.hideLoader();
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

    addSender() {
        let id = this.state.emailSenderId;
        let config = {
            method: "post",
            url: "/performance/emailSender",
            data: {
                senderName: this.state.senderName,
                emailSenderEmail: this.state.emailSenderEmail
            }
        };
        if (id) {
            config.method = "put";
            config.url = "/performance/emailSender/" + id;
            config.data.emailSenderId = id;
        }
        this.props.showLoader();
        ajax(config).
            then((response) => {
                this.props.hideLoader();
                this.setState({
                    showAddSenderModal: false,
                    emailSenderEmail: "",
                    senderName: ""
                });
                this.getAllSenderEmail();
                this.toastHandler({
                    id: new Date().getTime(),
                    type: "success",
                    message: "New sender " + response.data.senderName + " has been added and verification link is sent successfully to " + response.data.emailSenderEmail
                });
            })
            .catch((error) => {
                this.props.hideLoader();
                this.setState({
                    showAddSenderModal: false
                });
                error.map((err) => {
                    this.toastHandler({
                        id: new Date().getTime(),
                        type: "danger",
                        message: err.errorMessage
                    });
                });
            });
    }

    deleteSenderNameAndEmail(index) {
        let id = this.state.senderEmailList[index].emailSenderId;
        let config = {
            method: "delete",
            url: "/performance/emailSender/" + id
        };
        this.props.showLoader();
        ajax(config)
            .then(() => {
                this.props.hideLoader();
                this.toastHandler({
                    id: new Date().getTime(),
                    type: "success",
                    message: "Sender deleted successfully"
                });
                this.getAllSenderEmail();

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

    editSenderNameAndEmail(index) {
        this.setState({
            emailSenderId: this.state.senderEmailList[index].emailSenderId,
            emailSenderEmail: this.state.senderEmailList[index].emailSenderEmail,
            senderName: this.state.senderEmailList[index].senderName,
            showAddSenderModal: true
        });

    }

    resendVerificationEmail(index) {
        let config = {
            method: "put",
            url: "/performance/emailSender/resend",
            data: {
                emailSenderEmail: this.state.senderEmailList[index].emailSenderEmail
            }
        };
        this.props.showLoader();
        ajax(config)
            .then(() => {
                this.props.hideLoader();
                this.toastHandler({
                    id: new Date().getTime(),
                    type: "success",
                    message: "Verification link is successfully resent to the user."
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




export default connect(mapStateToProps, mapDispatchToProps)(SenderEmail);