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
import NewMyProfile from "../../../../common/component.profile.jsx";
import avtar from "../../../../../../assets/images/thumbnail.png";
import { navigate } from "../../../../../utils/route";


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
            primaryContactNumber: "",
            inputToggle: true,
            countryList: [],
            timezoneList: [],
            currencyList: [],
            logoImagePath: "",
            toastList: [],
            websiteUrlValid: true,
            fileName: "Select Image",
            emailIdValid: true,
            primaryContactNumberValid: true
        };
        this.saveClickHandler = this.saveClickHandler.bind(this);
        this.postImage = this.postImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.storeResponse = this.storeResponse.bind(this);
    }
    navigateToEdit() {
        // this.setState({ inputToggle: !this.state.inputToggle });  
        navigate("admin-org-profile-edit");
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
            <div className="padding-top-10">
                <div className="alert-toast">
                    {renderErrorAlertToasts}
                </div>
                <h3 className="margin-top-5 font-weight-700">Company Profile</h3>
                <h5 className="grey-text">Complete your company profile by telling us few more information.</h5>
                <hr />
                {/* <Button
                    className={this.state.inputToggle && ((parseInt(sessionStorage.getItem("profileId")) === 2 || (parseInt(sessionStorage.getItem("profileId")) === 3))) ? "pull-right slim-button shrinked-button" : "hidden"}
                    onClick={() => {
                        this.setState({ inputToggle: !this.state.inputToggle });
                    }}
                    bsSize="small">Edit</Button> */}
                <div className="clearfix" />
                <Row className={this.state.inputToggle ? "no-margin margin-left--30" : "no-margin margin-top-20 margin-left--30"}>
                    {/* <Col md={3}>
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
                                            bsSize="small" block>{commonUtils.truncText(this.state.fileName,15)}</Button>
                                        <Button onClick={this.postImage}
                                            bsStyle="primary" bsSize="small" block>Upload</Button>
                                    </div>
                                </Col>
                                <div className="clearfix" />
                            </Form>
                        </div> */}
                    {/* </Col> */}
                    <Col md={10} mdOffset={1} className="padding-left-50">
                        <Form>
                            <Row>
                                <NewMyProfile
                                    classname="company-profile"
                                    imgPath={this.state.logoImagePath || avtar}
                                    profileName={this.state.name}
                                    subHeading={this.state.websiteUrl}
                                    firstRow={{ title: "Email:", value: this.state.emailId }}
                                    secondRow={{ title: "Phone Number:", value: this.state.primaryContactNumber }}
                                    thirdRow={{ title: "Address:", value: this.state.addressLine1 }}

                                    fourthRow={{ title: "Timezone:", value: this.state.timezone.timezoneDescription }}
                                    fifthdRow={{ title: "Currency", value: this.state.currency.code + "  (" +this.state.currency.label  + ")"}}
                                    editClick={this.navigateToEdit.bind()}
                                    btnClass="my-profile-btn"

                                />
                                {/* <Col md={5} sm={6}>
                                    <FormGroup controlId="formHorizontalCompanyName">
                                        <ControlLabel>Company Name</ControlLabel>
                                        <FormControl.Static className={lableShowName}>{this.state.name}</FormControl.Static>
                                        <FormControl title="Company Name" className={inputShow} type="text" value={this.state.name} placeholder="Company Name"
                                            onChange={this.updateSate.bind(this, "name")} />
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalEmailId" validationState={this.state.inputToggle ? null : validations.email(this.state.emailId)}>
                                        <ControlLabel>Email Id</ControlLabel>
                                        <OverlayTrigger placement="right" overlay={tooltip}>
                                            <i className="glyphicon glyphicon-info-sign --padding-left" />
                                        </OverlayTrigger>
                                        <FormControl.Static className={staticShow}>{this.state.emailId}</FormControl.Static>
                                        <FormControl title="Email Id" className={inputShow} type="text" value={this.state.emailId} placeholder="Email Id"
                                            onChange={this.updateSate.bind(this, "emailId")} />
                                        <FormControl.Feedback />
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalAddress">
                                        <ControlLabel>Address</ControlLabel>
                                        <FormControl.Static className={staticShow}>{this.state.addressLine1}</FormControl.Static>
                                        <FormControl title="Address" className={inputShow} type="text" value={this.state.addressLine1} placeholder="Address"
                                            onChange={this.updateSate.bind(this, "addressLine1")} />
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalState">
                                        <ControlLabel>State</ControlLabel>
                                        <FormControl.Static className={staticShow}>{this.state.region}</FormControl.Static>
                                        <FormControl title="State" className={inputShow} type="text" value={this.state.region} placeholder="State"
                                            onChange={this.updateSate.bind(this, "region")} />
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalZipCode" validationState={this.state.inputToggle ? null : validations.zip(this.state.zipcode)}>
                                        <ControlLabel>Zip code</ControlLabel>
                                        <FormControl.Static className={staticShow}>{this.state.zipcode}</FormControl.Static>
                                        <FormControl title="ZipCode" className={inputShow} type="text"
                                            value={this.state.zipcode} placeholder="Zip Code"
                                            onChange={this.updateSate.bind(this, "zipcode")} />
                                        <FormControl.Feedback />
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
                                <Col mdOffset={1} md={5} sm={6}>
                                    <FormGroup controlId="formHorizontalWebsiteUrl"
                                        validationState={this.state.websiteUrlValid ? null : "error"}>
                                        <ControlLabel> Website Url<Astrix /></ControlLabel>
                                        <FormControl.Static className={staticShow}>{this.state.websiteUrl}</FormControl.Static>
                                        <FormControl title="Website Url" className={inputShow} type="text" value={this.state.websiteUrl} placeholder="Website Url"
                                            onChange={this.updateSate.bind(this, "websiteUrl")} />
                                        <FormControl.Feedback />
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalPhoneNo" >
                                        <ControlLabel>Phone No.</ControlLabel>
                                        <FormControl.Static className={staticShow}>{this.state.primaryContactNumber}</FormControl.Static>
                                        <FormControl title="PhoneNo" className={inputShow} type="number" value={this.state.primaryContactNumber} placeholder="Phone" onChange={this.updateSate.bind(this, "primaryContactNumber")} />
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
                                    <FormGroup controlId="formHorizontalCity">
                                        <ControlLabel>City</ControlLabel>
                                        <FormControl.Static className={staticShow}>{this.state.city}</FormControl.Static>
                                        <FormControl className={inputShow} type="text" value={this.state.city} placeholder="City"
                                            onChange={this.updateSate.bind(this, "city")} />
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
                                </Col> */}
                            </Row>
                            <Row>
                                <Col className="pull-right">
                                    <div className={inputShow}>
                                        <Button bsStyle="link" bsSize="small"
                                            onClick={() => {
                                                this.setState({
                                                    inputToggle: !this.state.inputToggle,
                                                    websiteUrlValid: true
                                                });
                                                navigate("admin-org-profile")
                                            }}>Cancel</Button>
                                        <Button bsStyle="primary" bsSize="small" onClick={this.saveClickHandler}>Save</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
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
        this.setState({ [propName]: e.target.value });
        if (propName === "websiteUrl") {
            this.setState({ websiteUrlValid: true });
        }
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
            // appConstants.imageUploadDefaultUrl + 
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
        if (validations.zip(this.state.zipcode) === "error" ||
            validations.email(this.state.emailId) === "error" ||
            this.state.websiteUrl === "") {
            if (this.state.websiteUrl === "") {
                this.setState({ websiteUrlValid: false });
            }
        } else {
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
                navigate("admin-org-profile")
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