import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Nav, Navbar, NavDropdown, MenuItem, Image } from "react-bootstrap";

import AlertToast from "../../common/alertToast.jsx";
import loaderAction from "../../../actions/loaderAction";
import alertToastActions from "../../../actions/alertToastActions";
import userProfileActions from "../../../actions/userProfileActions";
import defaultProfileImage from "../../../../assets/images/thumbnail.png";

import { navigate } from "../../../utils/route";
import { ajax } from "../../../utils/ajax";
import appLogo from "../../../../assets/images/logo.png";
import MbInbox from "../../../../assets/images/MbInbox.png";
import mbLogo from "../../../../assets/images/mbLogo.png";
import { getPath } from "../../../utils/route.js";
import appConstants from "../../../constants/constants";
import api from "../../common/api.js";

class AdminHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: sessionStorage.getItem("firstName"),
            lastName: sessionStorage.getItem("lastName"),
            userId: sessionStorage.getItem("userId"),
            toastList: []
        };
        this.logoutUser = this.logoutUser.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    render() {
        // const icon = (
        //     <div>
        //         <i className="glyphicon glyphicon-user icon" />
        //         <span className="user-name">
        //             {this.state.firstName}  {this.state.lastName}
        //         </span>
        //     </div>
        // );
        const imgSrc = (this.props.userData.profileImagePath === "" || this.props.userData.profileImagePath === null) ? defaultProfileImage : (appConstants.imageUploadDefaultUrl + this.props.userData.profileImagePath);
        const icon = (
            <div className="user-details">
                <Image className="user-mini-me" height={"40px"} width={"40px"} src={imgSrc} circle />
                <span className="user-name">
                    {this.props.userData.firstName} {this.props.userData.lastName}
                </span>
            </div>
        );
        const renderErrorAlertToasts = this.state.toastList.map((toast) => {
            return (
                <AlertToast key={toast.id}
                    style={toast.type}
                    message={toast.message}
                    id={toast.id}
                    closeAlert={this.closeToast.bind(this)} />
            );
        });
        return (
            <Navbar className="navbar--no-margin navbar--full-width">
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={this.toDashboard}>
                            <Image className="logo" src={mbLogo} />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight onSelect={this.handleSelect}>
                        <NavDropdown noCaret
                            id="admin-user-dropdown"
                            eventKey={3}
                            title={icon}
                            className="navbar__user-profile--dropdown">
                            <div>{icon}</div>
                            <MenuItem className="sub-menu" eventKey={3.1}>Logout</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <div className="admin-module-alert-toast">
                    {renderErrorAlertToasts}
                </div>
            </Navbar>
            // <nav className="navbar--no-margin navbar navbar--padding-right-20 navbar navbar-default">
            //     <div className="admin-module-alert-toast">
            //         {renderErrorAlertToasts}
            //     </div>
            //     <Navbar.Header>
            //         <Navbar.Brand>
            //             <Link to={getPath("dashboard")}>
            //                 <Image className="logo" src={appLogo} />
            //             </Link>
            //         </Navbar.Brand>
            //     </Navbar.Header>
            //     <Navbar.Collapse>
            //         <div className="pull-right navbar__right-nav --padding-all">
            //             <Nav className="--inline-flex navbar-right" onSelect={this.handleSelect}>
            //                 <NavDropdown eventKey={3} title={icon}
            //                     className="navbar__dropdown menu nav-right-drop-down"
            //                     id="basic-nav-dropdown" noCaret>
            //                     <div className="user-details">{icon}</div>
            //                     <MenuItem className="sub-menu" eventKey={3.1}>
            //                         Logout
            //                     </MenuItem>
            //                 </NavDropdown>
            //             </Nav>
            //         </div>
            //     </Navbar.Collapse>
            // </nav>
        );
    }
    componentDidMount() {
        if (this.props.userData.profileImagePath === "") {
            this.getUserInfo();
        }
    }

    toDashboard() {
        return getPath("dashboard");
    }
    
    handleSelect(selectedKey) {
        if (selectedKey === 3.1) {
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("organizationId");
            sessionStorage.removeItem("profileId");
            sessionStorage.removeItem("lastName");
            sessionStorage.removeItem("firstName");
            sessionStorage.removeItem("emailId");
            this.logoutUser();
            // navigate("login");
        }
    }
    closeToast(id) {
        let filteredToasts;
        filteredToasts = this.state.toastList.filter((t) => {
            return t.id !== id;
        });
        this.setState({ toastList: filteredToasts });
    }
    getUserInfo() {
        let config = {
            method: "get",
            url: api.user.getUserById + sessionStorage.getItem("userId")
        };
        this.props.showLoader();
        ajax(config).then((response) => {
            this.props.hideLoader();
            this.props.updateUserData(response.data);
        }).catch((error) => {
            this.props.hideLoader();
            error.map((error) => {
                this.props.showToast({
                    type: "danger",
                    message: error.errorMessage
                });
            });
        });
    }
    logoutUser() {
        let config = {
            method: "post",
            url: api.logout.logoutUser
        };
        this.props.showLoader();
        ajax(config).then(() => {
            this.props.hideLoader();
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("organizationId");
            sessionStorage.removeItem("profileId");
            sessionStorage.removeItem("lastName");
            sessionStorage.removeItem("firstName");
            sessionStorage.removeItem("emailId");
            navigate("login");
        }).catch((error) => {
            this.props.hideLoader();
            error.map((err) => {
                this.setState({
                    toastList: this.state.toastList.concat([{
                        id: new Date().getTime(),
                        type: "danger",
                        message: err.errorMessage
                    }])
                });
            });
        });
        this.showAlertMessage();
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showToast: (data) => {
            dispatch(alertToastActions.showToast(data));
        },
        showLoader: (data) => {
            dispatch(loaderAction.showLoader(data));
        },
        hideLoader: (data) => {
            dispatch(loaderAction.hideLoader(data));
        },
        updateUserData: (userData) => {
            dispatch(userProfileActions.updateUserData(userData));
        }
    };
};

const mapStateToProps = (store) => {
    return {
        userData: store.adminState.userData
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);