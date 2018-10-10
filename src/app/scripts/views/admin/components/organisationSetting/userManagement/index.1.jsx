import React from "react";
import { ajax } from "../../../../../utils/ajax";
import { connect } from "react-redux";
import loaderAction from "../../../../../actions/loaderAction";

import update from "immutability-helper";

import { Button, Table, Col, Row } from "react-bootstrap";
import UserModal from "./userModal/index.jsx";
import PromptModal from "../../../../common/promptModal.jsx";
import AlertToast from "../../../../common/alertToast.jsx";
class UserDataRow extends React.Component {
    constructor(props) {
        super(props);

        this.editLinkClick = this.editLinkClick.bind(this);
        this.deleteLinkClick = this.deleteLinkClick.bind(this);
    }
    render() {
        const hiddenAction = this.props.data.id === this.props.userId || this.props.data.profileId === 2 ? "hidden" : "";
        // const statusImage = this.props.data.userStatusId === 1 ? <image className="status-image" src={statusGreen} /> : <image className="status-image" src={statusRed} />;
        const statusImage = (this.props.data.status === 1 ? "status-image-green" : "status-image-gray");
        return (
            <tr>
                <td className="text-capitalize">{this.props.data.firstName}  {this.props.data.lastName}</td>
                <td>{this.props.data.emailId}</td>
                <td className="text-capitalize">{this.props.data.profileName}</td>
                <td> <div className={statusImage} /></td>
                <td className="text-capitalize">{this.props.data.city}</td>
                <td>
                    <span className="action-button--display-inline">
                        <i value={this.props.data.id}
                            onClick={this.editLinkClick}
                            className={"glyphicon glyphicon-pencil action-link" + " " + hiddenAction} />
                    </span>
                    <span
                        className="action-button--display-inline">
                        <i value={this.props.data.id} onClick={this.deleteLinkClick}
                            className={"glyphicon glyphicon-trash action-link" + " " + hiddenAction} />
                    </span>
                </td>
            </tr>
        );
    }
    deleteLinkClick() {
        this.props.deleteUserClick(this.props.data.id);
    }
    editLinkClick() {
        this.props.openUserModalEdit(this.props.index);
    }
}


class UserManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userList: [],
            singleUserData: {
                id: "",
                lastName: "",
                firstName: "",
                city: "",
                status: "",
                profileId: "",
                profileName: "",
                emailId: "",
                modulePermissionAccess: []
            },
            userId: parseInt(sessionStorage.getItem("userId")),
            organizationId: parseInt(sessionStorage.getItem("organizationId")),
            userToDelete: "",
            profileList: [],
            userModalShow: false,
            promptModalShow: false,
            userEditForm: false,
            alertShow: false,
            toastList: [],
            permissionList: [],
            moduleList: []
        };

        this.openUserModal = this.openUserModal.bind(this);
        this.openUserModalEdit = this.openUserModalEdit.bind(this);
        this.closeUserModal = this.closeUserModal.bind(this);
        this.deleteUserClick = this.deleteUserClick.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.closePromptModal = this.closePromptModal.bind(this);
        this.deleteUserApi = this.deleteUserApi.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    render() {
        const promptModal = (
            <PromptModal
                message="Are you sure want to delete user"
                keyWord="Deleting..."
                closeModal={this.closePromptModal} delete={this.deleteUserApi} />
        );
        const data = this.state.userList[this.state.singleUserIndex];
        const userModal = (<UserModal
            userEditForm={this.state.userEditForm}
            showModalResponseError={this.showModalResponseError}
            profileList={this.state.profileList}
            data={data}
            updateUserFields={this.updateUserFields.bind(this)}
            closeUserModal={this.closeUserModal}
            userSaveHandler={this.submitHandler}
            headClicked={this.permissionHeadClicked.bind(this)}
            checkBoxClick={this.permissionCheckBoxClick.bind(this)}
            moduleList={this.state.moduleList}
            index={this.state.singleUserIndex}
            permissionList={this.state.permissionList} />);

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
            <div>
                <div className="alert-toast">
                    {renderErrorAlertToasts}
                </div>
                <Col md={12}>
                    <Col md={12}>
                        <Row>
                            <p className="heading">All Users</p>
                            <hr />
                            <Col>
                                <p className="sub-heading">Add an user and assign the suitable role and module to get going with maketerboard.</p>
                            </Col>
                            <br />
                            <Col className="pull-right">
                                <Button bsStyle="primary" bsSize="small" onClick={this.openUserModal}>
                                    <i className="glyphicon glyphicon-plus" /> New User
                                </Button>
                            </Col>
                            <div className="clearfix" />
                        </Row>
                        <br />
                        <Row>
                            {this.getTableTemplate()}
                        </Row>
                    </Col>
                </Col>
                <div>
                    {this.state.promptModalShow ? promptModal : null}
                    {this.state.userModalShow ? userModal : null}
                </div>
            </div>
        );
    }
    getTableTemplate() {
        return (
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>Profile</th>
                        <th className="text-center">Status</th>
                        <th>Location</th>
                        <th className="action-coloumn--width">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.userList.map((user, i) => {
                        if (user.id === "") {
                            return null;
                        }
                        return (<UserDataRow key={i} data={user} index={i}
                            openUserModalEdit={this.openUserModalEdit}
                            deleteUserClick={this.deleteUserClick}
                            userId={this.state.userId} />);
                    })
                    }
                </tbody>
            </Table>);
    }
    componentDidMount() {
        this.getUserList();
        this.getProfileList();
        this.getModuleList();
        this.getPermissionList();
    }
    deleteUserClick(id) {
        this.setState({ promptModalShow: true });
        this.setState({ userToDelete: id });
    }
    updateUserFields(prop, value) {
        let newUserArray;
        newUserArray = update(this.state.userList, {
            [this.state.singleUserIndex]: {
                [prop]: { $set: value }
            }
        });
        this.setState({ userList: newUserArray });
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
    deleteUserApi() {
        let config = {
            method: "delete",
            url: "/performance/user/" + this.state.userToDelete
        };
        this.props.showLoader();

        ajax(config).then(() => {
            this.props.hideLoader();
            this.deleteUser(this.state.userToDelete);
            this.closePromptModal();
        }).catch((error) => {
            this.props.hideLoader();
            this.setState({ errorList: error });
        });
    }
    deleteUser(id) {
        const newList = this.state.userList.filter((d) => {
            return id !== d.id;
        });
        this.setState({ userList: newList });
    }
    getUserList() {
        let config = {
            method: "get",
            url: "/performance/user?organizationId=" + this.state.organizationId
        };
        this.props.showLoader();
        ajax(config).then((response) => {
            this.props.hideLoader();
            let userList = [];
            response.data.map((obj) => {
                userList.push(this.parseResponse(obj));
            });
            this.setState({ userList });
        }).catch((error) => {
            this.props.hideLoader();
            this.errorHandler(error);
        });
    }
    getPermissionList() {
        let config = {
            method: "get",
            url: "/performance/permission"
        };
        this.props.showLoader();
        ajax(config).then((response) => {
            this.props.hideLoader();
            response.data.map((obj) => {
                obj.label = obj.label.toLowerCase();
            });
            this.setState({ permissionList: response.data });
        }).catch((error) => {
            this.props.hideLoader();
            this.errorHandler(error);
        });
    }
    getModuleList() {
        let config = {
            method: "get",
            url: "/performance/module"
        };
        this.props.showLoader();
        ajax(config).then((response) => {
            this.props.hideLoader();
            let permissionData = [];
            response.data.map((obj) => {
                obj.permission = 1;
                permissionData.push({
                    permission: 1,
                    label: obj.label,
                    moduleId: obj.value
                });
            });
            let newUser = this.state.singleUserData;
            newUser.modulePermissionAccess = permissionData;
            this.setState({ singleUserData: newUser });
        }).catch((error) => {
            this.props.hideLoader();
            this.errorHandler(error);
        });
    }
    permissionHeadClicked(accessId) {
        let newAccessArray = this.state.userList.slice();
        newAccessArray[this.state.singleUserIndex].modulePermissionAccess.map((obj) => {
            obj.permission = accessId;
        });
        this.setState({ userList: newAccessArray });
        this.state.userList[this.state.singleUserIndex];
    }
    permissionCheckBoxClick(id, value) {
        let newState;
        newState = update(this.state.userList, {
            [this.state.singleUserIndex]: {
                modulePermissionAccess: {
                    [id]: {
                        permission: { $set: value }
                    }
                }
            }
        });
        this.setState({ userList: newState });
    }
    getProfileList() {
        let config = {
            method: "get",///performance/profile?organizationId=30
            url: "/performance/profile?organizationId=" + this.state.organizationId
        };
        this.props.showLoader();
        ajax(config).then((response) => {
            this.profileListParsing(response.data);
        }).catch((error) => {
            this.props.hideLoader();
            this.errorHandler(error);
        });
    }
    profileListParsing(data) {
        let newList = [];
        data.map((profile) => {
            newList.push({
                value: profile.id,
                label: profile.name
            });
        });
        this.setState({ profileList: newList });
    }
    submitHandler(object) {
        let config = {
            method: "put",///performance/profile?organizationId=30
            url: "/performance/user",
            data: {}
        };
        // const object = this.state.userList[this.state.singleUserIndex];
        let newPermissionArray = [];
        object.modulePermissionAccess.map((obj) => {
            newPermissionArray.push({
                moduleId: obj.moduleId,
                permission: obj.permission
            });
        });

        config.data = {
            emailId: object.emailId,
            firstName: object.firstName,
            lastName: object.lastName,
            organizationId: this.state.organizationId,
            createdBy: this.state.userId,
            updatedBy: this.state.userId,
            profileId: object.profileId,
            modulePermissionAccess: object.modulePermissionAccess
        };
        if (this.state.userEditForm) {
            config.data.id = object.id;
            config.url = "/performance/user/" + object.id;
            this.props.showLoader();
            ajax(config).then((response) => {
                this.props.hideLoader();
                let parsedObj = this.parseResponse(response.data);
                // this.deleteUser(object.id);
                let newState;
                newState = update(this.state.userList, {
                    [this.state.singleUserIndex]: { $set: parsedObj }
                });
                this.setState({ userList: newState }, () => {
                    this.state.userList;
                });
                this.closeUserModal();
            }).catch((error) => {
                this.props.hideLoader();
                this.errorHandler(error);
            });
        } else {
            config.method = "post";
            this.props.showLoader();
            ajax(config).then((response) => {
                this.props.hideLoader();
                let parsedObj = this.parseResponse(response.data);
                this.deleteUser(object.id);
                this.setState({ userList: this.state.userList.concat([parsedObj]) });
                this.state.moduleList;
                this.closeUserModal();
            }).catch((error) => {
                this.props.hideLoader();
                this.errorHandler(error);
            });
        }
    }
    parseResponse(obj) {
        let parsedObj = {};
        parsedObj = {
            id: obj.id || "",
            lastName: obj.lastName || "",
            emailId: obj.emailId || "",
            firstName: obj.firstName || "",
            city: obj.city || "",
            status: obj.status || "",
            profileName: obj.profileName || "",
            profileId: obj.profileId || "",
            modulePermissionAccess: obj.modulePermissionAccess || []
        };
        return parsedObj;
    }
    openUserModal() {
        let newArray = this.state.userList.slice();
        newArray.splice(0, 0, this.state.singleUserData);
        this.setState({
            userList: newArray,
            singleUserIndex: 0,
            userModalShow: true
        });
    }
    openUserModalEdit(index) {
        this.setState({
            userEditForm: true,
            userModalShow: true,
            singleUserIndex: index
        });
    }
    closeUserModal() {
        this.setState({ userModalShow: false });
    }
    closePromptModal() {
        this.setState({ promptModalShow: false });
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



export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
