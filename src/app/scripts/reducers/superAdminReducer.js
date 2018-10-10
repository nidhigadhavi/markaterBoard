import update from "immutability-helper";

const superAdminInitialState = {

    superUserData: {
        addressLine1: "",
        city: "",
        companyName: "",
        companyRole: "",
        contactNumber: "",
        countryId: "",
        countryName: "",
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
    },
    commonData: {
        organizationsList: []
    }
};

const superAdminReducer = function (state, actions) {
    let newState = state;
    if (typeof state === "undefined") {
        return superAdminInitialState;
    }

    switch (actions.type) {

        // -------------------------user operations ---------------------------------//
        case "UPDATE_SUPER_USER_DATA":
            newState = update(state, {
                superUserData: { $set: actions.data }
            });
            break;

        case "UPDATE_ORGANIZATION_LIST":
            newState = update(state, {
                commonData: {
                    organizationsList: { $set: actions.data }
                }
            });
            break;

        case "INITIAL_USER_DATA":
            newState = update(state, {
                superUserData: {
                    organizationId: { $set: sessionStorage.getItem("organizationId") },
                    profileId: { $set: sessionStorage.getItem("profileId") },
                    firstName: { $set: sessionStorage.getItem("firstName") },
                    lastName: { $set: sessionStorage.getItem("lastName") }
                },
                commonData: {
                    organizationsList: { $set: [] }
                }
            });
            break;
    }
    return newState;
};


export default superAdminReducer;