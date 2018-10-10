import "../../../assets/css/admin/admin.scss";
import { connect } from "react-redux";
import React from "react";
import { Col, Row } from "react-bootstrap";
import AdminSidebar from "./common/adminSidebar.jsx";
import AdminHeader from "./common/adminHeader.jsx";
import AdminViewWrapper from "./common/adminViewWrapper.jsx";

import Loader from "../common/loader.jsx";

class Admin extends React.Component {
    render() {
        return (
            <div className="admin">
                <div className="admin__header">
                    <AdminHeader />
                </div>
                <Row className="admin__content">
                    <Col md={2} className="admin__side-bar inline-block">
                        <AdminSidebar />
                    </Col>
                    <Col md={10} className="admin__view-wrapper inline-block">
                        <AdminViewWrapper viewContents={this.props.children} />
                    </Col>
                    <Loader show={this.props.loaderVisible} />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loaderVisible: state.commonState.loader
    };
};


export default connect(mapStateToProps)(Admin);
