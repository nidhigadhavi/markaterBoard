import React from "react";
import { ajax } from "../../../../../utils/ajax";
import validations from "../../../../../utils/inputValidation.jsx";
import { connect } from "react-redux";
import loaderAction from "../../../../../actions/loaderAction";
import appConstants from "../../../../../constants/constants";
import AlertToast from "../../../../common/alertToast.jsx";
import Astrix from "../../../../common/astix.jsx";
import defaultProfileImage from "../../../../../../assets/images/thumbnail.png";

import { Button, Col, Image, FormControl, FormGroup, Form, ControlLabel, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import Option from "../../../../common/optionDropdown.jsx";
import commonUtils from "../../../../../utils/commonUtils";

import api from "../../../../common/api.js";
import { navigate } from "../../../../../utils/route";
import "./css/companyProfile.scss";


class CurrencyOption extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <option value={this.props.data.value}>{this.props.data.code}</option>
        );
    }
}

class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: sessionStorage.getItem("userId"),
            organizationId: sessionStorage.getItem("organizationId"),
            fullName: "",
            name: "",
            websiteUrl: "",
            addressLine1: "",
            city: "",
            cityId: "",
            country: { value: "", label: "" },
            countryId: "",
            region: "",
            currency: { value: "", label: "" },
            currencyId: "",
            zipcode: "",
            zipcodeValid: true,
            emailId: "",
            timezone: { value: "", label: "" },
            timezoneId: "",
            countryCode: "",
            primaryContactNumber: "",
            inputToggle: false,
            countryList: [],
            timezoneList: [],
            currencyList: [],
            logoImagePath: "",
            toastList: [],
            // websiteUrlValid: true,
            fileName: "Select Image",
            // emailIdValid: true,
            // primaryContactNumberValid: true,
            errorMsg: {
                websiteUrlValid: false,
                emailIdValid: false,
                countryCodeValid: false,
                primaryContactNumberVaild: false,
                addressLine1Valid: false,
                regionValid: false,
                cityValids: false,
                zipCodeValid: false

            }
        };
        this.saveClickHandler = this.saveClickHandler.bind(this);
        this.postImage = this.postImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.storeResponse = this.storeResponse.bind(this);
    }
    render() {
        let staticShow = "",
            inputShow = "",
            lableShowName = "",
            uploadButtonShow = "",
            selectShow = "";

        if (this.state.inputToggle) {
            staticShow = "";
            inputShow = "hidden";
            lableShowName = "text-capitalize";
            uploadButtonShow = "hidden";
            selectShow = "hidden";
        } else {
            staticShow = "hidden";
            inputShow = "";
            lableShowName = "hidden";
            uploadButtonShow = "text-center image-upload-buttons";
            selectShow = "form-control";
        }
        const renderErrorAlertToasts = (this.state.toastList.map((toast) => {
            return (
                <AlertToast key={toast.id}
                    style={toast.type}
                    message={toast.message}
                    id={toast.id}
                    closeAlert={this.closeToast.bind(this)} />
            );
        }));
        const tooltip = (<Tooltip id="tooltip">Organization email id should be like (info@uxdialogue.com, admin@uxdialogue.com)</Tooltip>);
        return (
            <div className="padding-top-10 font-12">
                <div className="alert-toast">
                    {renderErrorAlertToasts}
                </div>
                <h3 className="margin-top-5 font-weight-700">Company Profile</h3>
                <h5 className="color-grey">Complete your company profile by telling us few more information.</h5>
                <hr />
                {/* <Button
                    className={this.state.inputToggle && ((parseInt(sessionStorage.getItem("profileId")) === 2 || (parseInt(sessionStorage.getItem("profileId")) === 3))) ? "pull-right slim-button shrinked-button" : "hidden"}
                    onClick={() => {
                        this.setState({ inputToggle: !this.state.inputToggle });
                    }}
                    bsSize="small">Edit</Button> */}
                <div className="clearfix" />
                {/* <Row className={this.state.inputToggle ? "no-margin margin-left--30" : "no-margin margin-top-20 margin-left--30"}> */}
                <div className="company-profile-padding">
                    <Row className="company-profile-edit">
                        <Col md={4}>
                            <div className="text-center">
                                <Form id="imageSelector_form row no-margin">
                                    <Image src={this.state.logoImagePath} className="col-md-12 col-md-offset-0 col-sm-offset-4 col-sm-4 margin-bottom-10" />
                                    <br />
                                    <FormControl className="hidden"
                                        type="file" label="File" id="imageSelector"
                                        onChange={(e) => {
                                            this.setState({ fileName: e.target.files[0].name });
                                        }} />
                                    <p className="margin-vertical-10">
                                        <em>Upload upto 2 MB file</em>
                                    </p>
                                    <Col mdOffset={0} md={12} smOffset={4} sm={4} className="margin-top-10">
                                        <div className={uploadButtonShow}>
                                            <Button onClick={this.uploadImage}
                                                bsSize="small" block>{commonUtils.truncText(this.state.fileName, 15)}</Button>
                                            <Button onClick={this.postImage}
                                                className="button-primary"
                                                bsStyle="primary" bsSize="small" block>Upload</Button>
                                        </div>
                                    </Col>
                                    <div className="clearfix" />
                                </Form>
                            </div>
                        </Col>
                        <Col md={8} className="padding-left-0">
                            <Form>
                                <Row>
                                    <Col md={6} sm={6} className="padding-left-0">
                                        <FormGroup controlId="formHorizontalCompanyName">
                                            <ControlLabel>Company Name</ControlLabel>
                                            <FormControl.Static className={lableShowName}>{this.state.name}</FormControl.Static>
                                            <FormControl title="Company Name" className={inputShow} type="text" value={this.state.name} placeholder="Company Name"
                                                disabled
                                                onChange={this.updateSate.bind(this, "name")} />
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalEmailId" validationState={this.state.errorMsg.emailIDValid ? "error" : null}>
                                            {/* validationState={this.state.inputToggle ? null : validations.email(this.state.emailId)}> */}
                                            <ControlLabel>Email Id</ControlLabel>
                                            {/* <OverlayTrigger placement="right" overlay={tooltip}>
                                                <i className="glyphicon glyphicon-info-sign --padding-left" />
                                            </OverlayTrigger> */}
                                            <FormControl.Static className={staticShow}>{this.state.emailId}</FormControl.Static>
                                            <FormControl title="Email Id" className={inputShow} type="text" value={this.state.emailId} placeholder="Email Id"
                                                onChange={this.updateSate.bind(this, "emailId")} />
                                            <span className={this.state.errorMsg.emailIDValid && this.state.emailId.length > 0 ? " error-msg show" : "hide"}> Please enter the Email ID.</span>
                                            <FormControl.Feedback />
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalAddress"
                                            validationState={this.state.errorMsg.addressLine1Valid ? "error" : null}
                                        >
                                            <ControlLabel>Address</ControlLabel>
                                            <FormControl.Static className={staticShow}>{this.state.addressLine1}</FormControl.Static>
                                            <FormControl title="Address" className={inputShow} type="text" value={this.state.addressLine1} placeholder="Address"
                                                onChange={this.updateSate.bind(this, "addressLine1")} />
                                            <span className={this.state.errorMsg.addressLine1Valid ? " error-msg show" : "hide"}> Please enter valid address.</span>
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalState"
                                            validationState={this.state.errorMsg.regionValid ? "error" : null}>
                                            <ControlLabel>State</ControlLabel>
                                            <FormControl.Static className={staticShow}>{this.state.region}</FormControl.Static>
                                            <FormControl title="State" className={inputShow} type="text" value={this.state.region} placeholder="State"
                                                onChange={this.updateSate.bind(this, "region")} />
                                            <span className={this.state.errorMsg.regionValid && this.state.region.length >= 0 ? " error-msg show" : "hide"}>Please enter valid state.</span>
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalZipCode" validationState={this.state.errorMsg.zipCodeValid ? "error" : null}>
                                            {/* validationState={this.state.inputToggle ? null : validations.zip(this.state.zipcode)}> */}
                                            <ControlLabel>Zip code</ControlLabel>
                                            <FormControl.Static className={staticShow}>{this.state.zipcode}</FormControl.Static>
                                            <FormControl title="ZipCode" className={inputShow} type="text"
                                                value={this.state.zipcode} placeholder="Zip Code"
                                                onChange={this.updateSate.bind(this, "zipcode")} />
                                            <span className={this.state.errorMsg.zipCodeValid && this.state.zipcode.length >= 0 ? " error-msg show" : "hide"}> Please enter a valid zipcode.</span>
                                            {/* <FormControl.Feedback /> */}
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalTimeZone">
                                            <ControlLabel>Time Zone</ControlLabel>
                                            <FormControl.Static className={staticShow}>{this.state.timezone.timezoneDescription}</FormControl.Static>
                                            <select name="Currency" value={this.state.timezoneId} className={selectShow}
                                                onChange={this.updateSate.bind(this, "timezoneId")}>
                                                <option defaultValue disabled>Select</option>
                                                {this.state.timezoneList.map((timezone, i) => {
                                                    return (<Option key={i} data={{
                                                        label: timezone.timezoneDescription,
                                                        value: timezone.value
                                                    }} />);
                                                })}
                                            </select>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6} sm={6}>
                                        <FormGroup controlId="formHorizontalWebsiteUrl"
                                            validationState={this.state.errorMsg.websiteUrlValid ? "error" : null}>
                                            <ControlLabel> Website<Astrix /></ControlLabel>
                                            <FormControl.Static className={staticShow}>{this.state.websiteUrl}</FormControl.Static>
                                            <FormControl title="Enter" className={inputShow} type="text" value={this.state.websiteUrl} placeholder="Website Url"
                                                onChange={this.updateSate.bind(this, "websiteUrl")} />
                                            <span className={this.state.errorMsg.websiteUrlValid && this.state.websiteUrl.length === 0 ? " error-msg show" : "hide"}> Please enter the website.</span>
                                            <span className={this.state.errorMsg.websiteUrlValid && this.state.websiteUrl.length > 0 ? " error-msg show" : "hide"}> Please enter valid website url format.</span>
                                            {/* <FormControl.Feedback /> */}
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalPhoneNo" >

                                            <ControlLabel>Phone Number</ControlLabel>

                                            {/* <FormControl.Static className={staticShow}>{this.state.primaryContactNumber}</FormControl.Static> */}
                                            <Row>
                                                <Col md={4} validationState={this.state.errorMsg.countryCodeValid ? "error" : null}
                                                    className="padding-left-0 padding-horizantal-0">
                                                    {/* <FormGroup> */}
                                                    <FormControl title="PhoneNo" className={inputShow} type="text"
                                                        value={this.state.countryCode}
                                                        maxLength="4"
                                                        placeholder="+91"
                                                        onChange={this.updateSate.bind(this, "countryCode")}
                                                    />
                                                    <span className={this.state.errorMsg.countryCodeValid && this.state.countryCode.length > 0 ? " error-msg show" : "hide"}>Please enter valid Country Code.</span>
                                                    {/* </FormGroup> */}
                                                </Col>
                                                <Col md={8} className="padding-horizantal-0" validationState={this.state.errorMsg.primaryContactNumberVaild ? "error" : null}>
                                                    {/* <FormGroup validationState={this.state.errorMsg.primaryContactNumberVaild ? "error" : null}> */}
                                                    <FormControl title="PhoneNo" className={inputShow} type="text" value={this.state.primaryContactNumber}
                                                        maxLength="16"
                                                        minLength="10"
                                                        placeholder="Enter" onChange={this.updateSate.bind(this, "primaryContactNumber")} />
                                                    <span className={this.state.errorMsg.primaryContactNumberVaild && this.state.primaryContactNumber.length === 0 ? " error-msg show" : "hide"}> Please enter your phone number.</span>
                                                    <span className={this.state.errorMsg.primaryContactNumberVaild && this.state.primaryContactNumber.length > 0 ? " error-msg show" : "hide"}> Please enter valid phone number</span>

                                                    {/* </FormGroup> */}
                                                </Col>
                                            </Row>
                                            {/* <FormControl title="PhoneNo" className={inputShow} type="text" value={this.state.primaryContactNumber} placeholder="Phone" onChange={this.updateSate.bind(this, "primaryContactNumber")} /> */}
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalCountry">
                                            <ControlLabel>Country</ControlLabel>
                                            <FormControl.Static className={staticShow}>{this.state.country.label}</FormControl.Static>
                                            <select name="Country" value={this.state.countryId} className={selectShow}
                                                onChange={this.updateSate.bind(this, "countryId")}>
                                                <option defaultValue disabled>Select</option>
                                                {this.state.countryList.map((country, i) => {
                                                    return (<Option key={i} data={country} />);
                                                })}
                                            </select>
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalCity"
                                            validationState={this.state.errorMsg.cityValids ? "error" : null}>
                                            <ControlLabel>City</ControlLabel>
                                            <FormControl.Static className={staticShow}>{this.state.city}</FormControl.Static>
                                            <FormControl className={inputShow} type="text" value={this.state.city} placeholder="City"
                                                onChange={this.updateSate.bind(this, "city")} />
                                            <span className={this.state.errorMsg.cityValid ? " error-msg show" : "hide"}> Please enter valid city.</span>
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalCurrency">
                                            <ControlLabel>Currency</ControlLabel>
                                            <FormControl.Static className={staticShow}>{this.state.currency.code}</FormControl.Static>
                                            <select name="Currency" value={this.state.currencyId} className={selectShow}
                                                onChange={this.updateSate.bind(this, "currencyId")} disabled>
                                                <option defaultValue disabled>Select</option>
                                                {this.state.currencyList.map((currency, i) => {
                                                    return (<CurrencyOption key={i} data={currency} />);
                                                })}
                                            </select>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="pull-right padding-horizontal-15">
                                        <div className={inputShow}>
                                            <Button bsStyle="link" bsSize="small"
                                                onClick={() => {
                                                    this.setState({
                                                        inputToggle: !this.state.inputToggle,
                                                        websiteUrlValid: true
                                                    });
                                                    navigate("admin-org-profile");
                                                }}>Cancel</Button>
                                            <Button bsStyle="primary" bsSize="small"
                                                className="button-primary"
                                                onClick={this.saveClickHandler}>Save</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </div>
                <div className="clearfix" />
            </div>
        );
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
    errorHandler(error) {
        error.map((err) => {
            this.toastHandler({
                id: new Date().getTime(),
                type: "danger",
                message: err.errorMessage
            });
        });
    }
    componentDidMount() {
        this.getCompanyInfo();
        this.getCountryList();
        this.getCurrencyList();
        this.getTimeZoneList();
    }
    updateSate(propName, e) {
        let newObjErrMsg = Object.assign(this.state.errorMsg);
        if (propName === "websiteUrl") {
            if (validations.website(e.target.value)) {
                newObjErrMsg.websiteUrlValid = false
                this.setState({
                    [propName]: e.target.value,
                    newObjErrMsg
                });
            }
            else {
                newObjErrMsg.websiteUrlValid = true
                this.setState({ [propName]: e.target.value, newObjErrMsg })
            }
        }
        if (propName === "emailId") {
            if (validations.emailNew(e.target.value)) {
                newObjErrMsg.emailIdValid = false,
                    this.setState({
                        [propName]: e.target.value,
                        newObjErrMsg
                    });
            }
            else {
                newObjErrMsg.emailIdValid = true,
                    this.setState({ newObjErrMsg, [propName]: e.target.value });
            }
        }
        if (propName === "countryCode") {
            if (validations.countryCode(e.target.value)) {
                newObjErrMsg.countryCodeValid = false
                this.setState({
                    [propName]: e.target.value,
                    newObjErrMsg
                });
            }
            else {
                newObjErrMsg.countryCodeValid = true
                this.setState({ [propName]: e.target.value, newObjErrMsg })
            }
        }
        if (propName === "primaryContactNumber") {
            if (validations.phoneNumber(e.target.value)) {
                newObjErrMsg.primaryContactNumberVaild = false
                this.setState({
                    [propName]: e.target.value,
                    newObjErrMsg
                });
            }
            else {
                newObjErrMsg.primaryContactNumberVaild = true
                this.setState({ newObjErrMsg })
            }
        }
        if (propName === "addressLine1") {
            if (validations.address(e.target.value)) {
                newObjErrMsg.addressLine1Valid = false
                this.setState({
                    [propName]: e.target.value,
                    newObjErrMsg
                });
            }
            else {
                newObjErrMsg.addressLine1Valid = true
                this.setState({ newObjErrMsg })
            }
        }
        if (propName === "region") {
            if (validations.state(e.target.value)) {
                newObjErrMsg.regionValid = false
                this.setState({
                    [propName]: e.target.value,
                    newObjErrMsg
                });
            }
            else {
                newObjErrMsg.regionValid = true
                this.setState({ newObjErrMsg })
            }
        }
        if (propName === "city") {
            if (validations.character(e.target.value)) {
                newObjErrMsg.cityValid = false
                this.setState({
                    [propName]: e.target.value,
                    newObjErrMsg
                });
            }
            else {
                newObjErrMsg.cityValid = true
                this.setState({ newObjErrMsg })
            }
        }
        if (propName === "zipcode") {
            if (validations.zipCode(e.target.value)) {
                newObjErrMsg.zipCodeValid = false
                this.setState({
                    [propName]: e.target.value,
                    newObjErrMsg
                });
            }
            else {
                newObjErrMsg.zipCodeValid = true
                this.setState({ newObjErrMsg })
            }
        }
        // this.setState({ [propName]: e.target.value });
        // if (propName === "websiteUrl") {
        //     this.setState({ websiteUrlValid: true });
        // }
    }
    storeResponse(data) {
        this.setState({
            fullName: data.fullName ? data.fullName : "",
            name: data.name ? data.name : "",
            websiteUrl: data.websiteUrl ? data.websiteUrl : "",
            primaryContactNumber: data.primaryContactNumber ? data.primaryContactNumber : "",
            zipcode: data.zipcode ? data.zipcode : "",
            region: data.state ? data.state : "",
            city: data.city ? data.city : "",
            logoImagePath: data.logoImagePath ?
                //  appConstants.imageUploadDefaultUrl +
                data.logoImagePath : defaultProfileImage,
            emailId: data.emailId ? data.emailId : "",
            currency: data.currency ? data.currency : { value: "", label: "" },
            currencyId: data.currency ? data.currency.value : "",
            country: data.country ? data.country : { value: "", label: "" },
            countryId: data.country ? data.country.value : "",
            timezone: data.timezone ? data.timezone : { value: "", label: "" },
            timezoneId: data.timezone ? data.timezone.value : "",
            addressLine1: data.addressLine1 ? data.addressLine1 : ""
        });
    }
    uploadImage() {
        let elem = document.getElementById("imageSelector");
        elem.click();
    }

    getPostImageUrl(url) {
        let urlArr = url.split("/");
        let organizationId = sessionStorage.getItem("organizationId");
        urlArr.splice(3, 0, organizationId);
        let newUrl = urlArr.toString();
        let updatedUrl = newUrl.replace(/,/g, "/");
        return updatedUrl;

        // var fruits = ["Banana", "Orange", "Apple", "Mango"];
        // let a = fruits.toString();
        // let b = a.replace(/,/g, "/");
        // document.getElementById("demo").innerHTML = b;
    }

    postImage() {
        let formData = new FormData();
        // formData.append("upload", document.getElementById("imageSelector").files[0]);
        formData.append('file', document.getElementById("imageSelector").files[0]);
        let config = {
            method: "post",
            url: "",
            // url: "/performance/organization/" + this.state.organizationId + "/upload/",
            data: formData
        };
        config.url = this.getPostImageUrl(api.organization.organizationProfileImageUpload);
        this.props.showLoader();
        ajax(config).then((response) => {
            this.props.hideLoader();
            this.toastHandler({
                id: new Date().getTime(),
                type: "success",
                message: "Image Uploaded."
            });
            this.setState({
                fileName: "Select Image",
                logoImagePath: response.data.logoImagePath ? response.data.logoImagePath : defaultProfileImage
            });
        }).catch((error) => {
            this.props.hideLoader();
            this.errorHandler(error);
        });
    }
    getCompanyInfo() {
        let config = {
            method: "get",
            url: api.organization.getOrganizationById + this.state.organizationId
        };
        this.props.showLoader();

        ajax(config).then((response) => {
            this.props.hideLoader();
            this.storeResponse(response.data);
        }).catch((error) => {
            this.props.hideLoader();
            this.errorHandler(error);
        });
    }
    getCurrencyList() {
        let config = {
            method: "get",
            url: api.commonApi.getCurrency
        };
        this.props.showLoader();

        ajax(config).then((response) => {
            this.props.hideLoader();
            this.setState({ currencyList: response.data });
        }).catch((error) => {
            this.props.hideLoader();
            this.errorHandler(error);
        });
    }
    getTimeZoneList() {
        let config = {
            method: "get",
            url: api.commonApi.getTimezone
        };
        this.props.showLoader();

        ajax(config).then((response) => {
            this.props.hideLoader();
            this.setState({ timezoneList: response.data });
        }).catch((error) => {
            this.props.hideLoader();
            this.errorHandler(error);
        });
    }
    getCountryList() {
        let config = {
            method: "get",
            url: api.commonApi.getCountries
        };
        this.props.showLoader();

        ajax(config).then((response) => {
            this.props.hideLoader();
            this.setState({ countryList: response.data });
        }).catch((error) => {
            this.props.hideLoader();
            this.errorHandler(error);
        });
    }
    saveClickHandler() {
        let newObjErrMsg = this.state.errorMsg;

        // if (validations.zip(this.state.zipcode) === "error" ||
        //     validations.email(this.state.emailId) === "error" ||
        //     this.state.websiteUrl === "") {
        //     if (this.state.websiteUrl === "") {
        //         this.setState({ websiteUrlValid: false });
        //     }
        // } 
        if (this.state.emailId === "") {
            newObjErrMsg.emailIdValid = false;
            this.setState({ newObjErrMsg });
        }
        else {
            this.setState({ websiteUrlValid: true });
            let config = {
                method: "put",
                url: api.organization.updateOrganization + this.state.organizationId,
                data: {
                    organizationId: this.state.organizationId,
                    addressLine1: this.state.addressLine1.trim(),
                    city: this.state.city.trim(),
                    countryId: this.state.countryId,
                    emailId: this.state.emailId,
                    currencyId: this.state.currencyId,
                    name: this.state.name.trim(),
                    primaryContactNumber: this.state.primaryContactNumber,
                    state: this.state.region,
                    timezoneId: this.state.timezoneId,
                    updatedBy: this.state.userId,
                    websiteUrl: this.state.websiteUrl.trim(),
                    zipcode: this.state.zipcode.trim()
                }
            };
            this.props.showLoader();
            ajax(config).then((response) => {
                this.props.hideLoader();
                this.storeResponse(response.data);
                this.setState({
                    inputToggle: !this.state.inputToggle
                });
                this.toastHandler({
                    id: new Date().getTime(),
                    type: "success",
                    message: "Profile Updated."
                });
                navigate("admin-org-profile");
            }).catch((error) => {
                this.props.hideLoader();
                this.errorHandler(error);
            });
        }
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



export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile);