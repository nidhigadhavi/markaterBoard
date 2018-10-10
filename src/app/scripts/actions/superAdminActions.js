export const initialUserData = () => {
    return {
        type: "INITIAL_USER_DATA",
        data: {}
    };
};

export const updateSuperUserData = (newUserData) => {
    return {
        type: "UPDATE_SUPER_USER_DATA",
        data: {
            userId: newUserData.id,
            organizationId: "",
            profileId: newUserData.profileId,
            emailId: "",
            addressLine1: "",
            city: "",
            contactNumber: "",
            countryId: "",
            countryName: "",
            dateOfBirth: "",
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            profileImagePath: newUserData.profileImagePath,
            region: "",
            zipcode: "",
            companyName: "",
            companyRole: ""
        }
    };
};

export const updateOrganizationList = (list) => {
    return {
        type: "UPDATE_ORGANIZATION_LIST",
        data: list
    };
};

const superAdminActions = {
    initialUserData,
    updateOrganizationList,
    updateSuperUserData
};

export default superAdminActions;