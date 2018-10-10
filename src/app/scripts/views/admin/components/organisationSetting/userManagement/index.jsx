import React from "react";
import { ajax } from "../../../../../utils/ajax";
import { connect } from "react-redux";
import loaderAction from "../../../../../actions/loaderAction";
import alertToastActions from "../../../../../actions/alertToastActions";

import { Button, Table, Col, Row, DropdownButton, MenuItem } from "react-bootstrap";
import UserModal from "./userModal/index.jsx";
import PromptModal from "../../../../common/promptModal.jsx";
import AlertToast from "../../../../common/alertToast.jsx";
import api from "../../../../common/api.js";
import defaultProfileImage from "../../../../../../assets/images/thumbnail.png";
//import { connect } from "react-redux";

class UserDataRow extends React.Component {
    constructor(props) {
        super(props);
        this.editLinkClick = this.editLinkClick.bind(this);
        this.deleteLinkClick = this.deleteLinkClick.bind(this);
    }
    render() {
        const gearIcon = <i className="fa fa-ellipsis-h" />;
        const hiddenAction = this.props.data.userId === this.props.userId || this.props.data.profileId === 2 ? "hidden" : "";
        // const statusImage = this.props.data.userStatusId === 1 ? <image className="status-image" src={statusGreen} /> : <image className="status-image" src={statusRed} />;
        const statusImage = (this.props.data.userStatus.value === 1 ? "status-image-green" : "status-image-gray");
        return (
            <tr>
                <td className="width-30" >
                    {this.props.data.profileImagePath === null || "" ?
                        <img className="all-user-list-img" src={defaultProfileImage} alt="path not found" />
                        :
                        <img className="all-user-list-img" src={this.props.data.profileImagePath} alt="path not found" />
                    }
                </td>

                <td className="text-capitalize">



                    {this.props.data.firstName}  {this.props.data.lastName}

                </td>
                <td>
                    {this.props.data.emailId}
                </td>

                <td className="text-capitalize">{this.props.data.profile.profileName}</td>
                <td> All Module</td>
                <td>
                    {/* <div className={statusImage} /> */}
                    <span className={"badge badge-" + this.props.data.userStatus.label.toLowerCase()}> {this.props.data.userStatus.label} </span>
                </td>
                {/* <td className="text-capitalize">{this.props.data.city}</td> */}
                <td>
                    {/* <span className={(parseInt(sessionStorage.getItem("profileId")) === 2) || (parseInt(sessionStorage.getItem("profileId")) === 3) ? "pull-right" : "hidden"}>
                        <span className="action-button--display-inline">
                            <i value={this.props.data.userId}
                                onClick={this.editLinkClick}
                                className={"glyphicon glyphicon-pencil action-link" + " " + hiddenAction} />
                        </span>
                        <span
                            className="action-button--display-inline">
                            <i value={this.props.data.userId} onClick={this.deleteLinkClick}
                                className={"glyphicon glyphicon-trash action-link" + " " + hiddenAction} />
                        </span>
                    </span> */}
                    <div className={
                        //     parseInt(this.props.data.userId) === parseInt(sessionStorage.getItem("userId")) 
                        // // && 

                        (parseInt(sessionStorage.getItem("profileId")) === 2)
                            ?
                            " "
                            :
                            (parseInt(sessionStorage.getItem("profileId")) === 3)
                                ?
                                (parseInt(this.props.data.profile.profileId) !== 2)
                                    ?
                                    " "
                                    :
                                    "hidden"
                                :
                                parseInt(this.props.data.userId) === parseInt(sessionStorage.getItem("userId")) ?
                                    "" : "hidden"



                    }>


                        <DropdownButton className="min-width-20 font-12 action-dropdown all-user-dropdown user-edit-delete-button"
                            bsSize="small" id="dropdown-size-small" title={gearIcon}>

                            {
                                this.props.data.userStatus.label.toUpperCase() === "ACTIVE"
                                    ?
                                   null
                                    :
                                    <MenuItem eventKey="3"
                                    value={this.props.data.userId}
                                    onClick={this.props.resendLinkClick.bind(this,this.props.data.userId)}
                                >
                                    Resend</MenuItem>
                            }

                            <MenuItem eventKey="1"
                                value={this.props.data.userId}
                                onClick={this.editLinkClick}
                            >
                                Edit</MenuItem>
                            <MenuItem eventKey="2"
                                value={this.props.data.userId}
                                onClick={this.deleteLinkClick}
                            // onClick={this.deleteClick.bind(this)}
                            >
                                Delete</MenuItem>

                        </DropdownButton>
                    </div>

                </td>
            </tr>
        );
    }
    deleteLinkClick() {
        this.props.deleteUserClick(this.props.data.userId);
    }
    editLinkClick() {
        this.props.openUserModalEdit(this.props.data);
    }
   
}


class UserManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usersData: [],
            singleUserData: {
                firstName: "",
                lastName: "",
                emailId: "",
                profileId: ""
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
            userPermissionToModuleName:{}
        };

        this.openUserModal = this.openUserModal.bind(this);
        this.openUserModalEdit = this.openUserModalEdit.bind(this);
        this.closeUserModal = this.closeUserModal.bind(this);
        this.deleteUserClick = this.deleteUserClick.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.closePromptModal = this.closePromptModal.bind(this);
        this.deleteUserApi = this.deleteUserApi.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.profileListConcat = this.profileListConcat.bind(this);
        this.filterResponse = this.filterResponse.bind(this);
    }
    render() {
        const promptModal = (
            <PromptModal
                message="Are you sure want to delete user"
                keyWord="Deleting..."
                closeModal={this.closePromptModal} delete={this.deleteUserApi} />
        );
        const userModal = (<UserModal userEditForm={this.state.userEditForm}
            showModalResponseError={this.showModalResponseError}
            profileList={this.state.profileList}
            data={this.state.singleUserData}
            closeUserModal={this.closeUserModal}
            userSaveHandler={this.submitHandler} />);

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
            <div className="user-management__page">
                <div className="alert-toast">
                    {renderErrorAlertToasts}
                </div>
                <div>
                    <h3 className="margin-top-5">All Users</h3>
                    <h5 className="color-grey">Add an user and assign the suitable role and module to get going with MarketerBoard.</h5>
                    <hr />
                    <div className={parseInt(sessionStorage.getItem("profileId")) === 2 ? "pull-right" : "hidden"}>
                        <Button bsStyle="primary" bsSize="small"
                            className="button-primary"
                            onClick={this.openUserModal}>
                            Add New User
                        </Button>
                        <div className="clearfix" />
                    </div>
                    <div className="clearfix" />
                </div>
                <div className="margin-top-10">
                    {this.getTableTemplate()}
                </div>
                <div>
                    {this.state.promptModalShow ? promptModal : null}
                    {this.state.userModalShow ? userModal : null}
                </div>
            </div>
        );
    }
    getTableTemplate() {
        return (
            <Table className="table" >
                <thead className="thead-light">
                    <tr>
                        <th className="text-center">  <i className="fa fa-user-circle font-18"></i></th>
                        <th>Username</th>
                        <th>Email ID</th>
                        <th>Profile</th>
                        <th>Module Access</th>
                        <th>Status</th>
                        {/* <th>Location</th> */}
                        <th className="action-coloumn--width">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.usersData.map((user, i) => {
                        return (<UserDataRow key={i} data={user}
                            openUserModalEdit={this.openUserModalEdit}
                            deleteUserClick={this.deleteUserClick}
                            userId={this.state.userId}
                            resendLinkClick={this.resendLinkClick.bind(this)}
                            userdata = {this.state.usersData}
                            
                        />);
                    })
                    }
                </tbody>
            </Table>);

    }
    componentDidMount() {
        this.getUserList();
        this.getProfileList();
    }
    deleteUserClick(id) {
        this.setState({ promptModalShow: true });
        this.setState({ userToDelete: id });
    }
    resendLinkClick(id) {
        // alert(id)
        let user ={}
        this.state.usersData.map((singlUser,key)=>{
            if(singlUser.userId===id){
                user.createdBy = singlUser.createdBy
                user.emailId = singlUser.emailId
                user.firstName = singlUser.firstName
                user.lastName = singlUser.lastName
                user.organizationId = singlUser.organization.organizationId
                user.profileId =  singlUser.profile.profileId
                user.updatedBy = singlUser.updatedBy
            }
        })

        let config = {
            method: "PUT",
            url: api.user.resendEmail,
            data:user
        };
        this.props.showLoader();

        ajax(config).then(() => {
            this.props.hideLoader();
            this.toastHandler({               
                type: "success",
                message: "Resend Email"
            });            
        }).catch((error) => {
            this.props.hideLoader();
            this.setState({ errorList: error });
        });
        
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
            url: api.user.deleteUser + this.state.userToDelete
        };
        this.props.showLoader();

        ajax(config).then(() => {
            this.props.hideLoader();
            this.toastHandler({
                id: new Date().getTime(),
                type: "success",
                message: "User deleted !!"
            });
            this.deleteUser(this.state.userToDelete);
            this.closePromptModal();
            this.getUserList();
        }).catch((error) => {
            this.props.hideLoader();
            this.setState({ errorList: error });
        });
    }
    deleteUser(id) {
        const newList = this.state.usersData.filter((d) => {
            return id !== d.id;
        });
        this.setState({ usersData: newList });
    }
    getUserList() {
        let config = {
            method: "get",
            url: api.user.getUserListByOrganizationId + parseInt(sessionStorage.getItem("organizationId"))
        };
        this.props.showLoader();

        ajax(config).then((response) => {
            this.props.hideLoader();
            this.setState({ usersData: response.data });
            // this.filterResponse(response.data);            
            this.getUserToModulePermission(JSON.parse(sessionStorage.getItem("userModulePermission")));
        }).catch((error) => {
            this.props.hideLoader();
            this.errorHandler(error);
        });
    }

    getUserToModulePermission(array){
        let newState=this.state.userPermissionToModuleName;
        array.map((obj)=>{
            if(obj.moduleName==="Admin Module"){
                newState.admin={
                    "moduleName":obj.moduleName,
                    "moduleId":obj.moduleId
                }
            }
            if(obj.moduleName==="Digital Advertising"){
                newState.digital={
                    "moduleName":obj.moduleName,
                    "moduleId":obj.moduleId
                }
            }
        });
        this.setState({userPermissionToModuleName:newState});
    }

    filterResponse(data) {
        let orgAdmin = 2;
        const newList = data.filter((d) => {
            if (orgAdmin === d.profileId) {
                return null;
            } else if (parseInt(this.state.userId) === d.id) {
                return null;
            }
            return d;
        });
        this.setState({ usersData: newList });
    }
    getProfileList() {
        let config = {
            method: "get",///performance/profile?organizationId=30
            url: api.profile.getDefaultOrCustomProfileListByOrganization + parseInt(sessionStorage.getItem("organizationId"))
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
                value: profile.profileId,
                label: profile.profileName
            });
        });
        this.setState({ profileList: newList });
    }
    profileListConcat(data) {
        var id = 1;
        const newList = data.filter((d) => {
            return id !== d.id;
        });
        id = 2;
        const newList1 = newList.filter((d) => {
            return id !== d.id;
        });
        this.setState({ profileList: newList1 });
        // this.setState({profileList: this.state.profileList.concat(newList1) });
    }
    submitHandler(object,userModulePermission) {
        let config = {
            method: "put",///performance/profile?organizationId=30
            url: api.user.createUser,
            data: {}
        };
        if (this.state.userEditForm) {
            config.data = {
                profileId: parseInt(object.profileId),
                emailId: object.emailId,
                firstName: object.firstName,
                lastName: object.lastName,
                // organizationId: this.state.organizationId,
                // createdBy: this.state.userId,
                // updatedBy: this.state.userId,
                organizationId: parseInt(sessionStorage.getItem("organizationId")),
                createdBy: 3,
                updatedBy: 3,
                userId: object.userId,
                userToModulePermission:userModulePermission
                // profileId: object.profileId
            };
            config.url = api.user.updateUser + object.userId;
            this.props.showLoader();
            ajax(config).then((response) => {
                this.closeUserModal();
                this.props.hideLoader();
                this.deleteUser(object.id);
                this.getUserList();
                this.setState({ usersData: this.state.usersData.concat([response.data]) });
                this.toastHandler({
                    id: new Date().getTime(),
                    type: "success",
                    message: "User is successfully updated."
                });
            }).catch((error) => {
                this.props.hideLoader();
                this.errorHandler(error);
            });
        } else {
            config.data = {
                emailId: object.emailId,
                firstName: object.firstName,
                lastName: object.lastName,
                // organizationId: this.state.organizationId,
                // createdBy: this.state.userId,
                // updatedBy: this.state.userId,
                organizationId: parseInt(sessionStorage.getItem("organizationId")),
                createdBy: 3,
                updatedBy: 3,
                userToModulePermission:userModulePermission,
                profileId: parseInt(object.profileId)
            };
            config.method = "post";
            this.props.showLoader();
            ajax(config).then((response) => {
                this.closeUserModal();
                this.props.hideLoader();
                this.getUserList();
                this.setState({ usersData: this.state.usersData.concat([response.data]) });
                this.toastHandler({
                    id: new Date().getTime(),
                    type: "success",
                    message: "An invitation is successfully sent to " + response.data.firstName + " " + response.data.lastName
                });
            }).catch((error) => {
                this.props.hideLoader();
                this.errorHandler(error);
            });
        }
    }
    openUserModal() {
        this.setState({
            status: "",
            userEditForm: false,
            userModalShow: true,
            response: ""
        });
    }
    openUserModalEdit(data) {
        this.setState({
            singleUserData: data,
            userEditForm: true,
            userModalShow: true,
            status: "",
            response: ""
        });
    }
    closeUserModal() {
        this.setState({ userModalShow: false });
        this.state.singleUserData = {
            firstName: "",
            lastName: "",
            emailId: "",
            userEditForm: false
        };
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

const mapStateToProps = (store) => {
    return {
        userData: store.adminState.userData
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);