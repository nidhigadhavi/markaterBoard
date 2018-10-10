import React from "react";
import { connect } from "react-redux";
import { Panel, Row, Col, Button, Table } from "react-bootstrap";
import AlertToast from "../../../../common/alertToast.jsx";
import { Doughnut } from "react-chartjs-2";
import loaderAction from "../../../../../actions/loaderAction";
import { Modal } from "react-bootstrap";

import { ajax } from "../../../../../utils/ajax";

const opt = {
    legend: {
        position: "bottom",
        display: false
    }
};

class UpgradeThankYouScreen extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="modal-container">
                <Modal show={this.props.thankModalShow}>
                    <Modal.Body className="text-center">
                        <div>
                            <i className="glyphicon glyphicon-ok-circle upgrade-response-icon font-vh-40" />
                        </div>
                        <h4 className="margin-bottom-5">
                            <strong>Thank you for contacting us for upgrading your account.</strong>
                        </h4>
                        <p>
                            Our sales representative will grt in touch with you with in 24 hours to discuss your requirements.
                        </p>
                        <Button
                            className="margin-top-10"
                            bsSize="xsmall"
                            onClick={() => {
                                this.props.hidePromptModal();
                            }}>Ok</Button>
                        <div className="clearfix" />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}


class UpgradePromptModal extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            hideClass: "bounceIn"

        };
    }
    render() {
        let isLoading = this.state.isLoading;
        return (
            <div>
                <div className="confirm-holder" tabIndex="-1">
                    <div className={"confirm animated " + this.state.hideClass}>
                        <div className="title">
                            {this.props.message} ?
                    </div>
                        <Button bsStyle="primary" bsSize="small" className="delete-ok"
                            onClick={this.cancel.bind(this)}>Cancel</Button>
                        <Button bsStyle="primary" className="delete-cancel"
                            bsSize="small" onClick={!isLoading ? this.handleDeleteClick.bind(this) : null}>
                            {isLoading ? this.props.keyWord : "Ok"}
                        </Button>
                    </div>
                    <div className="shadow" />
                </div>
            </div >
        );
    }
    cancel() {
        this.setState({ hideClass: "bounceOut" });
        setTimeout(() => {
            this.props.closeModal();
        }, 300);
    }
    handleDeleteClick() {
        this.setState({ isLoading: true, hideClass: "bounceOut" });
        setTimeout(() => {
            this.props.delete();
        }, 300);
    }
}


class Upgrade extends React.Component {
    constructor() {
        super();
        this.state = {
            toastList: [],
            thankModalShow: false,
            planName: "Free Trial",
            planExpiry: "15",
            userCount: 1,
            profile: 4,
            promptModalShow: false,
            data: {
                consumeEmailCount: 0,
                totalEmailLimitCount: 0,
                consumeSmsCount: 0,
                totalSmsLimitCount: 0
            }
        };
    }

    render() {
        const emailPieChart = {
            labels: ["Consumed", "Remaining"],
            datasets: [{
                data: [this.state.data.consumeEmailCount, this.state.data.totalEmailLimitCount - this.state.data.consumeEmailCount],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
            }]
        };

        const smsPieChart = {
            labels: ["Consumed", "Remaining"],
            datasets: [{
                data: [this.state.data.consumeSmsCount, this.state.data.totalSmsLimitCount - this.state.data.consumeSmsCount],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
            }]
        };

        const renderErrorAlertToasts = (this.state.toastList.map((toast) => {
            return (
                <AlertToast key={toast.id}
                    style={toast.type}
                    message={toast.message}
                    id={toast.id}
                    closeAlert={this.closeToast.bind(this)} />
            );
        }));
        const promptModalUpgrade = (<UpgradePromptModal message="Are sure you want to upgrade"
            keyWord="Done"
            actionType="success"
            closeModal={this.promptCancel.bind(this)}
            delete={() => {
                this.setState({ promptModalShow: false });
                this.handleUpgradeButtonClick();
            }} />);
        return (
            <div className="margin-top-20 upgrade-page">
                <div className="alert-toast">
                    {renderErrorAlertToasts}
                </div>
                <h3 className="margin-top-5">Upgrade</h3>
                <h5 className="color-grey">To enjoy MarketerBoard Services, upgrade your account and get access to all our features.</h5>
                <hr />
                <div className="margin-top-20">
                    <div className="row">
                        <div className="col-md-4">
                            <Panel
                                header={
                                    <div className="text-center plan-panel-title">
                                        <h2 className="no-margin">
                                            <strong>{this.state.planName}</strong>
                                        </h2>
                                       { this.state.data.expiryDays>0 ? <span className="margin-left-10">(Expires in {this.state.data.expiryDays} days)</span>:<span className="margin-left-10">( Your free trial package exipred )</span>}
                                    </div>}>
                                <div className="row padding-vertical-15">
                                    <div className="col-md-6 border-1-dark-gallery-right text-center">
                                        <p>Email Sends</p>
                                        <Doughnut
                                            width={90}
                                            height={80}
                                            data={emailPieChart}
                                            options={opt} />
                                        <em>{this.state.data.consumeEmailCount || 0} of {this.state.data.totalEmailLimitCount || 0} Emails</em>
                                    </div>
                                    <div className="col-md-6 text-center">
                                        <p>Sms Sends</p>
                                        <Doughnut
                                            width={90}
                                            height={80}
                                            data={smsPieChart}
                                            options={opt} />
                                        <em>{this.state.data.consumeSmsCount || 0} of {this.state.data.totalSmsLimitCount || 0} Sms</em>
                                    </div>
                                </div>
                                <div className="padding-horizontal-10">
                                    <div className="padding-20 border-1-dark-gallery-top text-center">
                                        <i className="glyphicon glyphicon-ok-circle color-button-background margin-right-10" />
                                        <em>Unlimited Storage</em>
                                    </div>
                                </div>
                            </Panel>
                        </div>
                        <div className="col-md-6">
                            <div className="padding-horizontal-20">
                                <h4>Information</h4>
                                <p>Hope you enjoyed MarketerBoard free trail, now if you wish to continue your account please click on the upgrade button below. And we will assist you with a best options. </p>
                                <Button
                                    className="upgrade-button"
                                    onClick={() => {
                                        this.setState({ promptModalShow: true });
                                    }}
                                    bsSize="small">
                                    Upgrade Plan
                            </Button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.promptModalShow ? promptModalUpgrade : null}
                <UpgradeThankYouScreen
                    thankModalShow={this.state.thankModalShow}
                    hidePromptModal={() => {
                        this.setState({ thankModalShow: false });
                    }} />
            </div>
        );
    }
    componentDidMount() {
        this.getData();
    }
    getData() {
        let config = {
            method: "get",
            url: "/performance/upgrade"
        };
        this.props.showLoader();
        ajax(config)
            .then((response) => {
                this.props.hideLoader();
                this.setState({ data: response.data });
            }).catch((error) => {
                this.props.hideLoader();
                this.errorHandler(error);
            });
    }
    promptCancel() {
        this.setState({ promptModalShow: false });
    }
    closeToast(id) {
        let filteredToasts;
        filteredToasts = this.state.toastList.filter((t) => {
            return t.id !== id;
        });
        this.setState({ toastList: filteredToasts });
    }
    handleUpgradeButtonClick() {
        let config = {
            method: "post",
            url: "/performance/upgrade"
        };
        this.props.showLoader();
        ajax(config)
            .then(() => {
                this.props.hideLoader();
                this.setState({ thankModalShow: true });
            }).catch((error) => {
                this.props.hideLoader();
                this.errorHandler(error);
            });
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
    errorHandler(error) {
        error.map((err) => {
            this.toastHandler({
                id: new Date().getTime(),
                type: "danger",
                message: err.errorMessage
            });
        });
    }
}

const mapStateToProps = (state) => {
    return {
        loaderVisible: state.commonState.loader,
        commonData: state.adminState.commonData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showLoader: (data) => {
            dispatch(loaderAction.showLoader(data));
        },
        hideLoader: (data) => {
            dispatch(loaderAction.hideLoader(data));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Upgrade);