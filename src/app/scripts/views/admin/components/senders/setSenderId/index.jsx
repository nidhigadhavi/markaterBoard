import React from "react";
import { connect } from "react-redux";
import update from "immutability-helper";

import AlertToast from "../../../../common/alertToast.jsx";
import {
    Row, Col, FormGroup, ControlLabel, OverlayTrigger,
    FormControl, Button, Table, Radio, Tooltip, ButtonToolbar
} from "react-bootstrap";

import { ajax } from "../../../../../utils/ajax.js";

import loaderAction from "../../../../../actions/loaderAction";
import alertToastActions from "../../../../../actions/alertToastActions";
import commonActions from "../../../../../actions/commonActions/commonActions";

import PromptModal from "../../../../common/promptModal.jsx";

class SenderIdDataRow extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        this.props.senderObj;
        return (
            <tr>
                <td>{this.props.senderObj.label}</td>
                <td>
                    <Radio checked={this.props.senderObj.isDefaultSenderCode}
                        onChange={this.setDefaultId.bind(this)} />
                </td>
                <td>Verified</td>
                <td className={parseInt(sessionStorage.getItem("profileId")) === 4 ? "hidden" : ""}>
                    <span className={parseInt(sessionStorage.getItem("profileId")) === 2 ? "" : "hidden"}>
                        <span className="action-button--display-inline">
                            <i value={this.props.senderObj.id}
                                onClick={this.editClickHandler.bind(this)}
                                className="glyphicon glyphicon-pencil action-link" />
                        </span>
                        <span className="action-button--display-inline">
                            <i value={this.props.senderObj.id}
                                onClick={this.deleteClickHandler.bind(this)}
                                className="glyphicon glyphicon-trash action-link" />
                        </span>
                    </span>
                </td>
            </tr>
        );
    }
    deleteClickHandler() {
        this.props.deleteSenderId(this.props.index);
    }
    editClickHandler() {
        this.props.editClick(this.props.index);
    }
    setDefaultId() {
        this.props.setDefaultId(this.props.index);
    }
}



class SetSenderId extends React.Component {
    constructor() {
        super();
        this.state = {
            senderIdList: [],
            singleObj: {
                label: "",
                value: 0,
                isDefaultSenderCode: false
            },
            toastList: [],
            smsSenderMessage: ""
        };

    }
    render() {
        const promptModal = (<PromptModal message="Are you sure want to delete Sender ID"
            keyWord="Deleting..."
            closeModal={this.closePromptModal.bind(this)}
            delete={this.deleteSenderIdApiCall.bind(this)} />);
        const tooltip = (
            <Tooltip id="tooltip">Sender ID .</Tooltip>
        );
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
            <div className="set-sms-sender__page">
                <div className="alert-toast">
                    {renderErrorAlertToasts}
                </div>
                <div>
                    <h3 className="margin-top-5">SMS Sender ID</h3>
                    {parseInt(sessionStorage.getItem("profileId")) === 4 ?
                        <h5 className="color-grey line-height-1"> Your admin set the sender ID and Make one default ID. If you wish to change  or suggest other please request your admin to do so. </h5>
                        : <h5 className="color-grey line-height-1">Set your six digit sender ID to send a SMS.Your sender ID approval request will be taken during timing only which 9:00 am - 9:00 pm, monday-saturday, and it will take minimum 24 hours to get your sender ID approved.</h5>
                    }
                    <hr />
                    <div className={(parseInt(sessionStorage.getItem("profileId")) === 2) || (parseInt(sessionStorage.getItem("profileId")) === 3) || (parseInt(sessionStorage.getItem("profileId")) === 4) ? "margin-top-10" : "hidden"}>
                        <Row>
                            <Col md={6}>
                                <div className={parseInt(sessionStorage.getItem("profileId")) === 4 ? "hidden" : ""}>
                                    <FormGroup controlId="divBasicText">
                                        <ControlLabel className="font-12">Sender ID</ControlLabel>
                                        <span className="margin-5">
                                            <OverlayTrigger placement="right" overlay={tooltip}>
                                                <i className="glyphicon glyphicon-info-sign" />
                                            </OverlayTrigger>
                                        </span>
                                        <FormControl
                                            type="text"
                                            value={this.state.singleObj.label}
                                            placeholder="Enter the sender id"
                                            onChange={(e) => {
                                                let singleObj = Object.assign(this.state.singleObj, {});
                                                singleObj.label = e.target.value;
                                                this.setState({ singleObj });
                                            }} />
                                        <FormControl.Feedback />
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel className="font-12">Purpose</ControlLabel>
                                        <textarea className="form-control no-resize" rows={2} cols={50}
                                            placeholder="Enter"
                                            onChange={(e) => {
                                                this.setState({ smsSenderMessage: e.target.value });
                                            }} value={this.state.smsSenderMessage} />
                                    </FormGroup>
                                    <ButtonToolbar className="pull-right">
                                        {this.state.singleObj.value !== 0 ?
                                            < Button bsSize="small"
                                                onClick={this.cancelClick.bind(this)}>Cancel</Button> : null}
                                        <Button bsSize="small"
                                            className="margin-bottom-20"
                                            bsStyle="primary"
                                            onClick={this.saveClick.bind(this)}>Add</Button>
                                    </ButtonToolbar>
                                    <div className="clearfix" />
                                </div>
                                <div>
                                    <Table className="campaign-list-table margin-top-10" hover>
                                        <thead>
                                            <tr>
                                                <th>Sender ID's</th>
                                                <th>Make as Default</th>
                                                <th>Status</th>
                                                <th className={parseInt(sessionStorage.getItem("profileId")) === 4 ? "hidden" : ""}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.senderIdList.map((data, i) => {
                                                return (<SenderIdDataRow
                                                    senderObj={data} key={i} index={i}
                                                    deleteSenderId={this.deleteSenderId.bind(this)}
                                                    editClick={this.editClick.bind(this)}
                                                    setDefaultId={this.setDefaultId.bind(this)} />);
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                {this.props.commonData.promptModalShow ? promptModal : null}
            </div >
        );
    }
    componentDidMount() {
        this.getSenderId();
    }
    closePromptModal() {
        this.props.closePromptModal();
    }
    editClick(index) {
        let singleObj = Object.assign({}, this.state.senderIdList[index]);
        singleObj.selected = true;
        this.setState({ singleObj });
    }
    cancelClick() {
        this.setState({ singleObj: { label: "", value: 0 } });
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
    saveClick() {
        let config = {
            method: "post",
            url: "/performance/smsSender",
            data: {
                label: this.state.singleObj.label,
                isDefaultSenderCode: this.state.singleObj.isDefaultSenderCode,
                smsSenderMessage: this.state.smsSenderMessage
            }
        };

        if (this.state.singleObj.value !== 0) {
            config.method = "put";
            config.url = "/performance/smsSender/" + this.state.singleObj.value;
            config.data = {
                value: this.state.singleObj.value,
                label: this.state.singleObj.label,
                isDefaultSenderCode: this.state.singleObj.isDefaultSenderCode
            };
        }

        this.props.showLoader();
        ajax(config)
            .then(() => {
                this.props.hideLoader();
                this.setState({
                    smsSenderMessage: "",
                    singleObj: { label: "", value: 0, isDefaultSenderCode: false }
                });
                this.getSenderId();
                this.toastHandler({
                    id: new Date().getTime(),
                    type: "success",
                    message: "We have received your request of sender ID. It will take 15 min - 24 hours to get your sender ID approved. You will receive a notification when the sender ID is approved by us."
                });

            }).catch((error) => {
                this.props.hideLoader();
                this.setState({
                    smsSenderMessage: "",
                    singleObj: { label: "", value: 0, isDefaultSenderCode: false }
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
    setDefaultId(index) {

        const newState = Object.assign(this.state, {});

        let config = {};
        config.method = "put";
        config.url = "/performance/smsSender/default/" + newState.senderIdList[index].value;
        config.data = {
            value: newState.senderIdList[index].value,
            label: newState.senderIdList[index].label,
            isDefaultSenderCode: true
        };

        this.props.showLoader();
        ajax(config)
            .then(() => {
                this.props.hideLoader();
                this.getSenderId();
            }).catch((error) => {
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
    getSenderId() {
        let config = {
            method: "get",
            url: "/performance/smsSender"
        };
        this.props.showLoader();
        ajax(config)
            .then((response) => {
                this.props.hideLoader();
                let senderIdList = [];
                response.data.map((obj) => {
                    let data = obj;
                    data.selected = false;
                    senderIdList.push(data);
                });
                this.setState({ senderIdList });
            }).catch((error) => {
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
    deleteSenderId(index) {
        this.props.showPromptModal();
        this.props.updateToBeDeletedId(index);

    }
    deleteSenderIdApiCall() {
        var index = this.props.commonData.tobeDeletedId;
        let id = this.state.senderIdList[index].value;
        let config = {
            method: "delete",
            url: "/performance/smsSender/" + id
        };
        this.closePromptModal();
        this.props.showLoader();
        ajax(config)
            .then(() => {
                this.props.hideLoader();
                this.props.showToast({
                    type: "success",
                    message: "Sender ID deleted successfully"
                });
                this.getSenderId();
            }).catch((error) => {
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
            dispatch(loaderAction.showLoader()); //action creater
        },
        hideLoader: () => {
            dispatch(loaderAction.hideLoader());
        },
        updateToBeDeletedId: (id) => {
            dispatch(commonActions.updateToBeDeletedId(id));
        },
        showToast: (data) => {
            dispatch(alertToastActions.showToast(data));
        },
        showPromptModal: () => {
            dispatch(commonActions.showPromptModal()); //action creater
        },
        closePromptModal: () => {
            dispatch(commonActions.closePromptModal());
        }
    };
};

const mapStateToProps = (store) => {
    return {
        //campaignData: store.smsState.smsCampaignData,
        commonData: store.adminState.commonData
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SetSenderId);