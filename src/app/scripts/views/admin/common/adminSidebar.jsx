import React from "react";
import { Link } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import OrglogoGreen from "../../../../assets/images/organizationGreen.png";
import OrglogoWhite from "../../../../assets/images/organizationWhite.png";
import { getPath } from "../../../utils/route.js";

class AdminSidebar extends React.Component {
    constructor() {
        super();
        this.state = {
            orgOpen: true,
            billingOpen: false,
            sendersOpen: false,
            trackingOpen: false,
            profileId: sessionStorage.getItem("profileId")

        };
    }
    render() {
        let profileId = parseInt(sessionStorage.getItem("profileId"));
        const showGearIcon = (this.state.profileId === 4 ? "hide" : "");
        const openOrg = () => {
            this.setState({ orgOpen: !this.state.orgOpen });
        };
        const openBilling = () => {
            this.setState({ billingOpen: !this.state.billingOpen });
        };
        const openSenders = () => {
            this.setState({ sendersOpen: !this.state.sendersOpen });
        };
        const openTracking = () => {
            this.setState({ trackingOpen: !this.state.trackingOpen });
        };
        return (
            <ul className="nav">
                <li className="menu-top">
                    <Link>
                        <p className="menu-heading"><strong>Setup</strong></p>
                    </Link>
                </li>

                {
                    profileId === 1 || profileId === 2 || profileId === 3 ?
                        <li>

                            <Link className={this.state.orgOpen ? "active parent-menu" : "parent-menu"} onClick={openOrg}>
                                <div className="position-relative top-2 margin-right-5 display-inline-block">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill={this.state.orgOpen ? "#3fbfbb" : "#eee"} width="15" height="15" viewBox="0 0 15 15">
                                        <path d="M14 9.75v2.5q0 0.312-0.219 0.531t-0.531 0.219h-2.5q-0.312 0-0.531-0.219t-0.219-0.531v-2.5q0-0.312 0.219-0.531t0.531-0.219h0.75v-1.5h-4v1.5h0.75q0.312 0 0.531 0.219t0.219 0.531v2.5q0 0.312-0.219 0.531t-0.531 0.219h-2.5q-0.312 0-0.531-0.219t-0.219-0.531v-2.5q0-0.312 0.219-0.531t0.531-0.219h0.75v-1.5h-4v1.5h0.75q0.312 0 0.531 0.219t0.219 0.531v2.5q0 0.312-0.219 0.531t-0.531 0.219h-2.5q-0.312 0-0.531-0.219t-0.219-0.531v-2.5q0-0.312 0.219-0.531t0.531-0.219h0.75v-1.5q0-0.406 0.297-0.703t0.703-0.297h4v-1.5h-0.75q-0.312 0-0.531-0.219t-0.219-0.531v-2.5q0-0.312 0.219-0.531t0.531-0.219h2.5q0.312 0 0.531 0.219t0.219 0.531v2.5q0 0.312-0.219 0.531t-0.531 0.219h-0.75v1.5h4q0.406 0 0.703 0.297t0.297 0.703v1.5h0.75q0.312 0 0.531 0.219t0.219 0.531z" />
                                    </svg>
                                </div>
                                <span className="menu">Organization Settings</span>
                                <i className={this.state.orgOpen ? "pull-right glyphicon glyphicon-chevron-down line-height-20" : "glyphicon glyphicon-chevron-right  pull-right line-height-20"} />
                            </Link>
                            <Collapse in={this.state.orgOpen}>
                                <div>
                                    <ul className="nav nav--padded collapse-menu" role="menu">
                                        <li className="sub-menu">
                                            <Link to={getPath("admin-org-profile")} activeClassName="active">
                                                <i className="glyphicon glyphicon-record" />
                                                <span>Company Profile</span>
                                            </Link>
                                        </li>
                                        <li className="sub-menu">
                                            <Link to={getPath("admin-org-user")} activeClassName="active">
                                                <i className="glyphicon glyphicon-record" />
                                                <span>User Management</span>
                                            </Link>
                                        </li>
                                        <li className={this.state.profileId === "4" ? "hide" : "sub-menu"}>
                                            <Link to={getPath("admin-org-access-control")} activeClassName="active"><i className="glyphicon glyphicon-record" /><span className="sub-menu">Manage User Profiles</span></Link>
                                        </li>
                                    </ul>
                                </div>
                            </Collapse>
                        </li>
                        : null
                }



                {/* <li>
                    <Link className="parent-menu" to={getPath("admin-general-setting")} activeClassName="active"><i className="glyphicon glyphicon-cog" /><span className="menu">General Setting</span></Link>
                </li> */}
                <li>
                    <Link onClick={openSenders} className={this.state.sendersOpen ? "active parent-menu" : "parent-menu"}>
                        <i className="glyphicon glyphicon-send" />
                        <span className="menu">Senders
                            <i className={this.state.sendersOpen ? "pull-right glyphicon glyphicon-chevron-down line-height-20" : "pull-right glyphicon glyphicon-chevron-right line-height-20"} />
                        </span>
                    </Link>
                    <Collapse in={this.state.sendersOpen}>
                        <div>
                            <ul className="nav nav--padded collapse-menu" role="menu">
                                <li className="sub-menu">
                                    <Link to={getPath("admin-senders-set-sender-id")} activeClassName="active">
                                        <i className="glyphicon glyphicon-record" />
                                        <span>SMS Sender ID</span></Link>
                                </li>
                                <li className="sub-menu">
                                    <Link to={getPath("admin-senders-sender-email")} activeClassName="active">
                                        <i className="glyphicon glyphicon-record" />
                                        <span>Sender Email</span>
                                    </Link>
                                </li>
                                <li className="sub-menu">
                                    <Link to={getPath("admin-senders-domain")} activeClassName="active">
                                        <i className="glyphicon glyphicon-record" />
                                        <span>Domain</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Collapse>
                </li>
                <li>
                    <Link onClick={openTracking} className={this.state.trackingOpen ? "active parent-menu" : "parent-menu"}>
                        <div className="position-relative top-2 margin-right-15 display-inline-block">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14">
                                <path d="M6 5q0-0.828-0.586-1.414t-1.414-0.586-1.414 0.586-0.586 1.414 0.586 1.414 1.414 0.586 1.414-0.586 0.586-1.414zM8 5q0 0.852-0.258 1.398l-2.844 6.047q-0.125 0.258-0.371 0.406t-0.527 0.148-0.527-0.148-0.363-0.406l-2.852-6.047q-0.258-0.547-0.258-1.398 0-1.656 1.172-2.828t2.828-1.172 2.828 1.172 1.172 2.828z" />
                            </svg>
                        </div>
                        <span className="menu">Tracking
                            <i className={this.state.trackingOpen ? "pull-right glyphicon glyphicon-chevron-down line-height-20" : "pull-right glyphicon glyphicon-chevron-right line-height-20"} />
                        </span>
                    </Link>
                    <Collapse in={this.state.trackingOpen}>
                        <div>
                            <ul className="nav nav--padded collapse-menu" role="menu">
                                <li className="sub-menu">
                                    <Link to={getPath("admin-tracking-code")} activeClassName="active">
                                        <i className="glyphicon glyphicon-record" />
                                        <span>Tracking Code</span></Link>
                                </li>
                                <li className="sub-menu">
                                    <Link to={getPath("admin-tracking-utm-criteria")} activeClassName="active">
                                        <i className="glyphicon glyphicon-record" />
                                        <span>UTM Criteria</span>
                                    </Link>
                                </li>
                                {/* <li className="sub-menu">
                                    <Link to={getPath("admin-tracking-tools")} activeClassName="active">
                                        <i className="glyphicon glyphicon-record" />
                                        <span>Other Tracking Tool</span>
                                    </Link>
                                </li> */}
                            </ul>
                        </div>
                    </Collapse>
                </li>
                <li>
                    <Link onClick={openBilling} className={this.state.billingOpen ? "active parent-menu" : "parent-menu"}>
                        <i className="glyphicon glyphicon-credit-card" />
                        <span className="menu">Billing and Usage
                            <i className={this.state.billingOpen ? "pull-right glyphicon glyphicon-chevron-down line-height-20" : "pull-right glyphicon glyphicon-chevron-right line-height-20"} />
                        </span>
                    </Link>
                    <Collapse in={this.state.billingOpen}>
                        <div>
                            <ul className="nav nav--padded collapse-menu" role="menu">
                                <li className="sub-menu">
                                    <Link to={getPath("admin-billing-upgrade")} activeClassName="active">
                                        <i className="glyphicon glyphicon-record" />
                                        <span>Upgrade</span></Link>
                                </li>
                                <li className="sub-menu">
                                    <Link to={getPath("admin-billing-invoice")} activeClassName="active">
                                        <i className="glyphicon glyphicon-record" />
                                        <span>Invoice</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Collapse>
                </li>
            </ul >
        );
    }
}
export default AdminSidebar;
