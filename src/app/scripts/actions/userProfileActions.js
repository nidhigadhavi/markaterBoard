export const initialUserData = () => {
    return {
        type: "INITIAL_USER_DATA",
        data: {}
    };
};

export const updateUserData = (newUserData) => {
    return {
        type: "UPDATE_USER_DATA",
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
            country:{label:"",value:""},
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

const userProfileActions = {
    initialUserData,
    updateUserData
};

export default userProfileActions;