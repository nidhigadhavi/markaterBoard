import React from "react";
import { ajax } from "../../../../../utils/ajax";
import { connect } from "react-redux";
import loaderAction from "../../../../../actions/loaderAction";
import AlertToast from "../../../../common/alertToast.jsx";
import { Button, Table, Col, Row, DropdownButton, MenuItem } from "react-bootstrap";
import ProfileModal from "./profilePopup/index.jsx";
import PromptModal from "../../../../common/promptModal.jsx";
import alertToastActions from "../../../../../actions/alertToastActions";
import api from "../../../../common/api.js";

class ProfileDataRow extends React.Component {
    constructor(props) {
        super(props);

        this.editLinkClick = this.editLinkClick.bind(this);
        this.deleteLinkClick = this.deleteLinkClick.bind(this);
    }
    render() {
       
        const gearIcon = <i className="fa fa-ellipsis-h" />;
        const Show = this.actionShow(this.props.data.profileId) ? "action-button--display-inline" : "hidden";
        const defaultProfileName = (this.props.data.organizationId === 1) ? "System" : this.props.data.createdBy;
        return (
            <tr>
                <td className="text-capitalize">{this.props.data.profileName}</td>
                <td>
                    <div className="profile-description ellipsis">{this.props.data.description}</div>
                </td>
                <td className="text-capitalize">{defaultProfileName}</td>
                <td>{(new Date(this.props.data.createdOn)).toISOString().substring(0, 10)}</td>
                <td>
                    {/* <span className={Show}>
                        <i value={this.props.data.profileId}
                            onClick={this.editLinkClick}
                            className="glyphicon glyphicon-pencil action-link" />
                    </span>
                    <span className={Show}>
                        <i value={this.props.data.profileId}
                            onClick={this.deleteLinkClick}
                            className="glyphicon glyphicon-trash action-link" />
                    </span> */}
                    <div className={Show}>
                        <DropdownButton className="min-width-20 font-12 action-dropdown all-user-dropdown user-edit-delete-button"
                            bsSize="small" id="dropdown-size-small" title={gearIcon}>
                            <MenuItem eventKey="1"
                                value={this.props.data.profileId}
                                onClick={this.editLinkClick}
                            >
                                Edit</MenuItem>
                            <MenuItem eventKey="2"
                                value={this.props.data.profileId}
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
        this.props.deleteProfileClick(this.props.data.profileId);
    }
    editLinkClick() {
        this.props.openProfileModalEdit(this.props.data);
    }
    actionShow(id) {
        if (id === 3) {
            return false;
        }
        if (id === 4) {
            return false;
        }
        return true;
    }
}

class ProfileManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profilesData: [],
            singleProfileData: {
                firstName: "",
                lastName: "",
                emailId: ""
            },
            profileToDelete: "",
            profileModalShow: false,
            promptModalShow: false,
            profileEditForm: false,
            toastList: []
        };

        this.openProfileModal = this.openProfileModal.bind(this);
        this.openProfileModalEdit = this.openProfileModalEdit.bind(this);
        this.closeProfileModal = this.closeProfileModal.bind(this);
        this.deleteProfileClick = this.deleteProfileClick.bind(this);
        this.deleteProfile = this.deleteProfile.bind(this);
        this.closePromptModal = this.closePromptModal.bind(this);
        this.deleteProfileApi = this.deleteProfileApi.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.getProfileList = this.getProfileList.bind(this);
    }
    render() {
        const promptModal = <PromptModal message="Are you sure want to delete profile"
            keyWord="Deleting..."
            closeModal={this.closePromptModal}
            delete={this.deleteProfileApi} />;

        const createModal = <ProfileModal
            data={this.state.singleProfileData}
            closeProfileModal={this.closeProfileModal}
            profileSaveHandler={this.submitHandler} />;
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
            <div className="profile-management__page">
                <div className="alert-toast">
                    {renderErrorAlertToasts}
                </div>
                <div>
                    <h3 className="margin-top-5">All Profiles</h3>
                    <h5 className="color-grey">You can create multiple profile based on your organization and can provide the access and permission of various module to your users</h5>
                    <hr />
                    <div className="pull-right">
                        <Button bsStyle="primary" bsSize="small"
                        className="button-primary"
                        onClick={this.openProfileModal}>New Profile</Button>
                    </div>
                    <div className="clearfix" />
                </div>
                <div className="margin-top-10">
                    {this.getTableTemplate()}
                </div>
                <div className="clearfix" />
                <div>
                    {this.state.promptModalShow ? promptModal : null}
                    {this.state.profileModalShow ? createModal : null}
                </div>
            </div>
        );
    }
    getTableTemplate() {
        return (
            <Table   className="table" >
                <thead className="thead-light">
                    <tr>
                        <th>Profile Name</th>
                        <th className="profile-description-heading">Profile Description</th>
                        <th>Created By</th>
                        <th>Modified On</th>
                        <th className="action-coloumn--width">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.profilesData.map((profile, i) => {
                        return (<ProfileDataRow key={i} data={profile}
                            openProfileModalEdit={this.openProfileModalEdit}
                            deleteProfileClick={this.deleteProfileClick} />);
                    })
                    }
                </tbody>
            </Table>);
    }
    componentDidMount() {
        this.setState({
            userId: sessionStorage.getItem("userId"),
            organizationId: sessionStorage.getItem("organizationId")
        }, () => {
            this.getProfileList();
        });
    }
    deleteProfileClick(id) {
        this.setState({ promptModalShow: true });
        this.setState({ profileToDelete: id });
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
    deleteProfileApi() {
        this.props.showLoader();
        let config = {
            method: "delete",//performance/profile?organizationId=30
            url: api.profile.deleteProfile + this.state.profileToDelete
        };
        this.props.showLoader();

        ajax(config).then(() => {
            this.props.hideLoader();
            this.deleteProfile(this.state.profileToDelete);
            this.getProfileList();
            this.closePromptModal();
        }).catch((error) => {
            this.props.hideLoader();
            this.errorHandler(error);
        });
    }
    deleteProfile(id) {
        const newList = this.state.profilesData.filter((d) => {
            return id !== d.id;
        });
        this.setState({ profilesData: newList });
    }
    getProfileList() {
        this.props.showLoader();
        let config = {
            method: "get",//performance/profile?organizationId=30
            url: api.profile.getDefaultOrCustomProfileListByOrganization + sessionStorage.getItem("organizationId")
        };
        this.props.showLoader();

        ajax(config).then((response) => {
            this.props.hideLoader();
            this.setState({ profilesData: response.data });
        }).catch((error) => {
            this.props.hideLoader();
            this.errorHandler(error);
        });
    }
    submitHandler(data) {
        let config = {
            method: "put",///performance/profile?organizationId=30
            url: api.profile.createProfile,
            data: {
                profileId: data.profileId,
                profileName: data.profileName,
                description: data.description,
                // organizationId: this.state.organizationId,
                organizationId: sessionStorage.getItem("organizationId"),
                // updatedByUser: this.state.userId,
                // createdByUser: this.state.userId
                updatedByUser: sessionStorage.getItem("userId"),
                createdByUser: sessionStorage.getItem("userId")
            }
        };
        if (this.state.profileEditForm) {
            config.data = {
                profileId: data.profileId,
                profileName: data.profileName,
                description: data.description,
                // organizationId: this.state.organizationId,
                // updatedByUser:this.state.userId,
                // createdByUser: this.state.userId
                organizationId: sessionStorage.getItem("organizationId"),
                // updatedByUser: this.state.userId,
                // createdByUser: this.state.userId
                updatedByUser: sessionStorage.getItem("userId"),
                createdByUser: sessionStorage.getItem("userId")
            };
            config.url = api.profile.updateProfile + data.profileId;

            this.props.showLoader();
            ajax(config).then((response) => {
                this.props.hideLoader();
                this.closeProfileModal();
                this.deleteProfile(data.id);
                this.getProfileList();
                this.setState({ profilesData: this.state.profilesData.concat([response.data]) });

            }).catch((error) => {
                this.props.hideLoader();
                this.errorHandler(error);
            });
        } else {
            config.data = {
                profileName: data.profileName,
                description: data.description,
                // organizationId: this.state.organizationId,
                // updatedByUser: this.state.userId,
                // createdByUser: this.state.userId
                organizationId: sessionStorage.getItem("organizationId"),
                // updatedByUser: this.state.userId,
                // createdByUser: this.state.userId
                updatedByUser: sessionStorage.getItem("userId"),
                createdByUser: sessionStorage.getItem("userId")
            };
            config.method = "post";
            this.props.showLoader();
            ajax(config).then((response) => {
                this.props.hideLoader();
                this.closeProfileModal();
                this.getProfileList();
                this.setState({ profilesData: this.state.profilesData.concat([response.data]) });
            }).catch((error) => {
                this.props.hideLoader();
                this.errorHandler(error);
            });
        }
    }
    openProfileModal() {
        this.setState({ profileEditForm: false });
        this.setState({
            profileModalShow: true,
            response: "",
            responseError: false
        });

    }
    openProfileModalEdit(data) {
        this.setState({ singleProfileData: data });
        this.setState({
            profileEditForm: true
        });
        this.setState({ profileModalShow: true });
    }
    closeProfileModal() {
        this.setState({ profileModalShow: false });
        this.state.singleProfileData = {
            firstName: "",
            lastName: "",
            emailId: "",
            profileEditForm: true
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
        },
        showToast: (data) => {
            dispatch(alertToastActions.showToast(data));
        }
    };
};

const mapStateToProps = () => {
    return {};
};



export default connect(mapStateToProps, mapDispatchToProps)(ProfileManagement);