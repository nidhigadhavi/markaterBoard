import update from "immutability-helper";

const adminInitialState = {
    commonData: {
        promptModalShow: false,
        cancelPromptModalShow: false,
        editPromptModalShow: false,
        tobeDeletedId: "",
        modulePermissionList: []
    },
    userData: {
        addressLine1: "",
        city: "",
        companyName: "",
        companyRole: "",
        contactNumber: "",
        countryId: "",
        countryName: "",
        country: { value: "", label: "" },
        dateOfBirth: "",
        emailId: "",
        firstName: sessionStorage.getItem("firstName"),
        lastName: sessionStorage.getItem("lastName"),
        organizationId: sessionStorage.getItem("organizationId"),
        profileId: sessionStorage.getItem("profileId"),
        profileImagePath: "",
        region: "",
        userId: "",
        zipcode: ""
    }
};

const adminReducer = function (state, actions) {
    let newState = state;
    if (typeof state === "undefined") {
        return adminInitialState;
    }

    switch (actions.type) {
        // -------------------------common operations ---------------------------------//
        case "SHOW_DELETE_MODAL":
            newState = update(state, {
                commonData: {
                    promptModalShow: { $set: true }
                }
            });
            break;
        case "UPDATE_MODULE_PERMISSION_LIST":
            newState = update(state, {
                commonData: {
                    modulePermissionList: { $set: actions.data }
                }
            });
            break;

        case "CLOSE_DELETE_MODAL":
            newState = update(state, {
                commonData: {
                    promptModalShow: { $set: false }
                }
            });
            break;

        case "SHOW_PROMPT_MODAL":
            newState = update(state, {
                commonData: {
                    [actions.data.prop]: { $set: true }
                }
            });
            break;

        case "CLOSE_PROMPT_MODAL":
            newState = update(state, {
                commonData: {
                    [actions.data.prop]: { $set: false }
                }
            });
            break;

        case "UPDATE_TO_BE_DELETED_ID":
            newState = update(state, {
                commonData: {
                    tobeDeletedId: { $set: actions.data.id }
                }
            });
            break;

        // -------------------------user operations ---------------------------------//
        case "UPDATE_USER_DATA":
            newState = update(state, {
                userData: { $set: actions.data }
            });
            break;

        case "INITIAL_USER_DATA":
            newState = update(state, {
                userData: {
                    organizationId: { $set: sessionStorage.getItem("organizationId") },
                    profileId: { $set: sessionStorage.getItem("profileId") },
                    firstName: { $set: sessionStorage.getItem("firstName") },
                    lastName: { $set: sessionStorage.getItem("lastName") }
                }
            });
            break;
    }
    return newState;
};


export default adminReducer;