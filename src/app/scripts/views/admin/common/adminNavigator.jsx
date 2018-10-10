import React from "react";
import AdminSidebar from "./adminSidebar.jsx";
class AdminNavigator extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <div className="side-bar">
                    <AdminSidebar />
                </div>
                <div className="view-wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default AdminNavigator;
