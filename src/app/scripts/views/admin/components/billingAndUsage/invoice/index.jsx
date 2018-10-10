import React from "react";
import {
    Panel, Table, ButtonToolbar, Modal,
    DropdownButton, MenuItem, Button, FormControl,
    Row, Col, Checkbox, Glyphicon, FormGroup, Pagination, Radio
} from "react-bootstrap";
import moment from "moment";
import { connect } from "react-redux";
// import jsPDF from "jspdf";

import AlertToast from "../../../../common/alertToast.jsx";
import TimeFilterDropDown from "../../../../common/timeFilterDropDown.jsx";

import { ajax } from "../../../../../utils/ajax.js";

import loaderAction from "../../../../../actions/loaderAction";
import alertToastActions from "../../../../../actions/alertToastActions";

class TableDataRow extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <tr>
                <td className="custom-check-box custom-check-box-black color-black">
                    <Checkbox onClick={() => {
                        this.props.handleCheckBoxClick(this.props.id);
                    }} checked={this.props.data.selected} />
                </td>
                <td className="padding-10">
                    {this.props.data.campaignTitel}
                </td>
                <td className="padding-10">
                    {this.props.data.activityTitle}
                </td>
                <td className="padding-10">
                    {this.props.data.moduleName}
                </td>
                <td className="padding-10">
                    {this.props.data.activityPeopleInvolveCount}
                </td>
                <td className="padding-10">
                    {this.props.data.activityUnitCost}
                </td>
                <td className="padding-10">
                    {this.props.data.invoiceActivityCost}
                </td>
                <td className="padding-10">
                    {moment(this.props.data.activityExcuteDate).format("DD/MM/YYYY")}
                </td>
                <td className="padding-10">
                    {this.props.data.activityPlaneStatName}
                </td>
                <td className="padding-10">
                    <Row>
                        {sessionStorage.getItem("userType") === "I" ? <Col md={6}>
                            <FormControl type="text" value={this.props.data.paymentStatus}
                                onChange={(event) => {
                                    this.props.updatePaymentStatus(event, this.props.id);
                                }
                                } />
                        </Col> : <span className="margin-left-15">{this.props.data.paymentStatus}</span>}
                        {sessionStorage.getItem("userType") === "I" ? <Col md={3}>
                            {/* {this.props.data.paymentStatus} */}
                            <Button className="min-width-0" bsSize="sm" onClick={() => {
                                this.props.updateInvoice();
                            }}>Update</Button>
                        </Col> : null}
                    </Row>
                </td>
            </tr>
        );
    }
}



class Invoice extends React.Component {
    constructor() {
        super();
        this.state = {
            showInvoice: false,
            contactFilterDate: {
                from: "",
                to: ""
            },

            singleInvoice: {},
            toastList: [],
            filterDate: {
                from: "",
                to: ""
            },
            statusFilter: "0",
            moduleFilter: "0",
            searchFilter: "",
            invoiceList: [],
            selectAll: false,
            tableActivePage: 1,
            invoiceRowPerPage: 5,
            singleObject: {}
        };
    }
    render() {
        const startIndex = ((this.state.tableActivePage - 1) * this.state.invoiceRowPerPage);
        const endIndex = ((this.state.tableActivePage) * this.state.invoiceRowPerPage) - 1;
        const { from, to } = this.state.filterDate;
        const gearIcon = <i className="glyphicon glyphicon-cog gear-icon" />;
        const renderErrorAlertToasts = (this.state.toastList.map((toast) => {
            return (
                <AlertToast key={toast.id}
                    style={toast.type}
                    message={toast.message}
                    id={toast.id}
                    closeAlert={this.closeToast.bind(this)} />
            );
        }));
        let invoiceListToShow = this.getInvoiceListToShow(this.state.invoiceList);
        return (
            <div className="margin-top-20 utm-criteria-page">
                <div className="alert-toast">
                    {renderErrorAlertToasts}
                </div>
                <h3>List of Invoice</h3>
                <h5 className="color-grey">Now you can access all the invoices and check the status of the same.</h5>
                <hr />
                <div >
                    <div className="utm-created margin-top-20">
                        <div className="margin-bottom-20">

                            <div className="inline-block margin-right-10">
                                <select className="form-control" onChange={(e) => {
                                    this.setState({ statusFilter: e.target.value });
                                }} value={this.state.statusFilter}>
                                    <option defaultValue value="0">All Status</option>
                                    <option value="Sent">Sent</option>
                                    <option value="Draft">Draft</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Unpaid">Unpaid</option>
                                </select>
                            </div>
                            <div className="inline-block margin-horizontal-10">
                                <select className="form-control" onChange={(e) => {
                                    this.setState({ moduleFilter: e.target.value });
                                }} value={this.state.moduleFilter}>
                                    <option defaultValue value="0">All Modules</option>
                                    <option value="SMS">SMS</option>
                                    <option value="Email Marketing">Email Marketing</option>
                                </select>
                            </div>
                            <div className="inline-block margin-horizontal-10 time-filter margin-top-2">
                                <TimeFilterDropDown
                                    applyCallBack={this.applyCallBack}
                                    pullLeft={true}
                                    handleDayClick={this.handleDayClick.bind(this)}
                                    filterDate={{ from, to }} />
                            </div>
                            <div className="inline-block margin-horizontal-10">
                                <FormGroup controlId="formBasicText"
                                    className="display-inline-block margin-bottom-10">
                                    <FormControl
                                        type="text"
                                        onChange={(e) => {
                                            this.setState({ searchFilter: e.target.value });
                                        }}
                                        value={this.state.searchFilter}
                                        placeholder="Search by campaign name" />
                                    <FormControl.Feedback>
                                        <Glyphicon glyph="search" />
                                    </FormControl.Feedback>
                                </FormGroup>
                            </div>
                            <div className="inline-block pull-right">
                                {this.showDownloadButton() && <Button onClick={() => {
                                    this.downloadInvoice();

                                }}>Download</Button>}
                            </div>
                            <siv className="clearfix" />
                        </div>
                        <Table className="no-margin">
                            <thead>
                                <tr>
                                    <th> <Checkbox checked={this.state.selectAll} onChange={() => {
                                        this.selectAllInvoices();
                                    }} /> </th>
                                    <th>Campaign Name</th>
                                    <th>Activity Name</th>
                                    <th>Module Type</th>
                                    <th>Contacts Count</th>
                                    <th>Per Unit Cost</th>
                                    <th>Total Amount</th>
                                    <th>Delivered Date</th>
                                    <th>Activity Status</th>
                                    <th>Payment Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoiceListToShow.map((invoice, i) => {
                                    if (i >= startIndex && i <= endIndex) {
                                        return (
                                            <TableDataRow data={invoice} key={i}
                                                id={i}
                                                handleCheckBoxClick={(id) => {
                                                    this.handleCheckBoxClick(id);
                                                }}
                                                updateInvoice={() => {
                                                    this.updateInvoice();
                                                }}
                                                updatePaymentStatus={(e, id) => {
                                                    this.updatePaymentStatus(e.target.value, id);
                                                }} />
                                        );
                                    }
                                })}
                            </tbody>
                        </Table>
                        {invoiceListToShow.length === 0 ||
                            <Pagination
                                prev next first last ellipsis boundaryLinks
                                items={Math.ceil(invoiceListToShow.length / this.state.invoiceRowPerPage)} maxButtons={5}
                                activePage={this.state.tableActivePage}
                                onSelect={this.handleSelect.bind(this, "tableActivePage")} />}
                    </div>
                    {this.state.showInvoice && <Modal id="invoice-modal"
                        show={this.state.showInvoice}
                        className="invoice-modal" onHide={this.close}>
                        <Modal.Body id="invoice-print">
                            <div className="row">
                                <div className="padding-vertical-20">
                                    <div className="col-md-6">
                                        <ButtonToolbar>
                                            <Button bsSize="xsmall">Print</Button>
                                            <Button
                                                bsStyle="primary"
                                                bsSize="xsmall" onClick={() => {
                                                    this.invoiceDownload();
                                                }}>Download</Button>
                                        </ButtonToolbar>
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className="pull-right">
                                            <strong>Invoice {this.state.singleInvoice.invoiceNo}</strong>
                                        </h5>
                                    </div>
                                    <div className="clearfix" />
                                </div>
                            </div>

                            <hr />

                            <Row>
                                <div className="margin-vertical-20 address-section">
                                    <Col md={3}>
                                        <strong>Zoom Admin:</strong>
                                        <br />
                                        {this.state.singleInvoice.adminAddress}
                                    </Col>
                                    <Col className="right-section" md={3}>
                                        <strong>Invoice To:</strong>
                                        <br />
                                        {this.state.singleInvoice.invoiceAddress}
                                    </Col>
                                    <div className="clearfix" />
                                </div>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    Invoice Date: <span>{this.state.singleInvoice.invoiceDate}</span>
                                    <br />
                                    Due Date: <span>{this.state.singleInvoice.dueDate}</span>
                                </Col>
                            </Row>
                            <Table className="margin-top-20">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Item Name Date</th>
                                        <th>Cost</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.singleInvoice.itemArray.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className="padding-10">
                                                    {i}
                                                </td>
                                                <td className="padding-10">
                                                    {item.name}
                                                </td>
                                                <td className="padding-10">
                                                    {item.cost}
                                                </td>
                                                <td className="padding-10">
                                                    {item.quantity}
                                                </td>
                                                <td className="padding-10">
                                                    $ {item.price}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                            {/* <div className="padding-20 margin-bottom-10 amount-section">
                            <Row>
                                <Col className="text-right" md={3}>
                                    <span>
                                        Sub-Total Amount
                                    </span>
                                    <h2>
                                        ${this.state.singleInvoice.subTotal}
                                    </h2>
                                </Col>
                                <Col className="text-right" md={3}>
                                    <span>
                                        Discount
                                    </span>
                                    <h2>
                                        {this.state.singleInvoice.discount}%
                                    </h2>
                                </Col>
                                <Col className="text-right" md={3}>
                                    <span>
                                        Grand Total
                                    </span>
                                    <h2>
                                        ${this.state.singleInvoice.total}
                                    </h2>
                                </Col>
                            </Row>
                        </div> */}
                            <div className="padding-20 margin-bottom-10 amount-section text-right">
                                <div className="font-16">
                                    <div className="text-right display-inline-block padding-horizontal-20 text-right">
                                        <p>
                                            <span>Sub-Total Amount</span>
                                        </p>
                                        <p>
                                            <strong className="">
                                                ${this.state.singleInvoice.subTotal}
                                            </strong>
                                        </p>
                                    </div>
                                    <div className="text-right display-inline-block padding-horizontal-20 text-right">
                                        <p>
                                            <span>Discount</span>
                                        </p>
                                        <p>
                                            <strong className="">
                                                {this.state.singleInvoice.discount}%
                                </strong>
                                        </p>
                                    </div>
                                    <div className="text-right display-inline-block padding-horizontal-20 text-right">
                                        <p>
                                            <span>Grand Total</span>

                                        </p>
                                        <p>
                                            <strong className="">
                                                ${this.state.singleInvoice.total}
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                                <div className="clearfix" />
                            </div>
                            <Button className="pull-right" bsSize="xsmall" onClick={() => {
                                this.setState({ showInvoice: false });
                            }}>Close</Button>
                            <div className="clearfix" />
                        </Modal.Body>
                    </Modal>}
                </div >
            </div >
        );
    }
    componentDidMount() {
        this.getInvoices();
    }
    getInvoices() {
        let config = {
            method: "get",
            url: "/performance/invoiceLineItemDesc"
        };
        this.props.showLoader();
        ajax(config).
            then((response) => {
                //
                this.props.hideLoader();
                let list = response.data.map((obj) => {
                    obj.selected = false;
                    obj.isRadioChecked = false;
                    if (obj.campaignTitel === null) {
                        obj.campaignTitel = "TEST";
                    }
                    return obj;
                });
                this.setState({ invoiceList: list });
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
    toastHandler(obj) {
        this.setState({
            toastList: this.state.toastList.concat([{
                id: obj.id,
                type: obj.type,
                message: obj.message
            }])
        });
    }
    closeToast(id) {
        let filteredToasts;
        filteredToasts = this.state.toastList.filter((t) => {
            return t.id !== id;
        });
        this.setState({ toastList: filteredToasts });
    }
    handleDayClick(day) {
        this.setState({ filterDate: day });
    }
    applyCallBack() {
        // 
    }
    getHandleDayClick(prop, date) {
        this.setState({ [prop]: date });
    }
    getInvoiceListToShow(array) {
        let arrayList = [];
        let dateBool = ((this.state.filterDate.to !== "" && this.state.filterDate.to ? true : false) &&
            (this.state.filterDate.from !== "" && this.state.filterDate.from ? true : false));
        array.map((dataObj) => {
            if ((this.state.statusFilter === "0" || (dataObj.activityPlaneStatName === (this.state.statusFilter)) || (dataObj.paymentStatus === (this.state.statusFilter))) && (this.state.moduleFilter === "0" || (dataObj.moduleName === (this.state.moduleFilter))) &&
                dataObj.campaignTitel.toUpperCase().includes(this.state.searchFilter.toUpperCase()) &&
                (!dateBool || moment(dataObj.activityExcuteDate).isBetween(this.state.filterDate.from, this.state.filterDate.to))) {
                arrayList.push(dataObj);
            }
        });
        return arrayList;
    }
    selectAllInvoices() {
        let arr = [];
        const startIndex = ((this.state.tableActivePage - 1) * this.state.invoiceRowPerPage);
        const endIndex = ((this.state.tableActivePage) * this.state.invoiceRowPerPage) - 1;
        this.setState({ selectAll: !this.state.selectAll });
        this.state.invoiceList.map((invoice, i) => {
            if (i >= startIndex && i <= endIndex) {
                invoice.selected = !invoice.selected;
                arr.push(invoice);
            } else {
                invoice.selected = invoice.selected;
                this.setState({ selectAll: !this.state.selectAll });
                arr.push(invoice);
            }
        });

        this.setState({ invoiceList: arr });
    }
    showDownloadButton() {
        let bool = false;
        this.state.invoiceList.map((invoice) => {
            if (invoice.selected) {
                bool = true;
            }
        });
        return bool;
    }
    downloadInvoice() {
        let partUrl = "";
        this.state.invoiceList.map((invoice) => {
            if (invoice.selected) {
                partUrl = partUrl + "&id=" + invoice.invoiceId;
            }
        });

        window.open("/performance/invoiceLineItemDesc/select/export?organizationId=" + sessionStorage.getItem("organizationId") + partUrl);
        this.unselectCheckbox();
    }
    unselectCheckbox() {
        let arr = [];
        this.state.invoiceList.map((invoice, i) => {
            if (invoice.selected) {
                invoice.selected = false;
                arr.push(invoice);
            }
        });
        this.setState({ invoiceList: arr });
        if (this.state.selectAll) {
            this.setState({ selectAll: false });
        }
    }
    handleCheckBoxClick(id) {
        let singleObject = Object.assign({}, this.state.invoiceList[id]);
        singleObject.selected = !singleObject.selected;
        let arr = this.state.invoiceList;
        arr[id] = singleObject;
        this.setState({ invoice: arr });
    }
    updatePaymentStatus(value, id) {
        let singleObject = Object.assign({}, this.state.invoiceList[id]);
        singleObject.paymentStatus = value;
        singleObject;
        this.setState({ singleObject: singleObject });
        let arr = this.state.invoiceList;
        arr[id] = singleObject;
        this.setState({ invoice: arr });
    }
    updateInvoice() {
        let config = {
            method: "put",
            url: "/performance/invoice/" + this.state.singleObject.invoiceId,
            data: {
                invoiceId: this.state.singleObject.invoiceId,
                paymentStatus: this.state.singleObject.paymentStatus
            }
        };
        this.props.showLoader();

        ajax(config).then(() => {
            this.props.hideLoader();
            this.getInvoices();

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

    handleSelect(prop, e) {
        this.setState({ [prop]: e });
    }
    invoiceDownload() {
        var pdf = new jsPDF("p", "pt", "letter");
        var source = document.getElementById("invoice-print");

        var margins = {
            top: 50,
            left: 20,
            width: 500
        };

        pdf.fromHTML(
            source // HTML string or DOM elem ref.
            , margins.left // x coord
            , margins.top // y coord
            , {
                "width": margins.width // max width of content on PDF
            },
            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF
                // this allow the insertion of new lines after html
                pdf.save("html2pdf.pdf");
            }
        );
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
        },
        showToast: (data) => {
            dispatch(alertToastActions.showToast(data));
        }

    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Invoice);