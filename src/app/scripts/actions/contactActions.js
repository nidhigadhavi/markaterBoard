export const updatelistManagementCommonData = (data) => {
    return {
        type: "UPDATE_CONTACT_GROUP_COMMON_DATA",
        data: {
            value: data.value,
            prop: data.fieldName
        }
    };
};

export const updateContactGroupList = (data) => {
    return {
        type: "UPDATE_CONTACT_GROUP_LIST",
        data: {
            value: data
        }
    };
};

export const updateContactGroupContactList = (data) => {
    return {
        type: "UPDATE_CONTACT_GROUP_CONTACT_LIST",
        data: {
            value: data
        }
    };
};

export const deleteFromContactGroupList = (index) => {
    return {
        type: "CONTACT_GROUP_DELETE_FROM_LIST",
        data: {
            index
        }
    };
};

export const updateContactFields = (data) => {
    return {
        type: "UPDATE_CONTACT_FIELDS",
        data: {
            value: data.value,
            prop: data.prop
        }
    };
};

export const updateContactGroupFields = (data) => {
    return {
        type: "UPDATE_CONTACT_GROUP_FIELDS",
        data: {
            value: data.value,
            prop: data.prop
        }
    };
};

export const updateContactCommonData = (data) => {
    return {
        type: "UPDATE_CONTACT_COMMON_DATA",
        data: {
            value: data.value,
            prop: data.prop
        }
    };
};

export const updateContactGroupData = (data) => {
    return {
        type: "UPDATE_CONTACT_GROUP_DATA",
        data: {
            value: data
        }
    };
};

export const updateContactCommonList = (commonData) => {
    return {
        type: "UPDATE_CONTACT_COMMON_LIST",
        data: {
            value: commonData.value,
            prop: commonData.prop
        }
    };
};

export const updateContactList = (contactsList) => {
    return {
        type: "UPDATE_CONTACT_LIST",
        data: contactsList
    };
};

export const updateContactListFields = (data) => {
    return {
        type: "UPDATE_CONTACT_LIST_FIELDS",
        data: {
            index: data.index,
            prop: data.prop,
            value: data.value
        }
    };
};

export const deleteFromContactsList = (index) => {
    return {
        type: "CONTACT_DELETE_FROM_CONTACT_LIST",
        data: {
            index
        }
    };
};

export const deleteSelectedFromContactsList = () => {
    return {
        type: "CONTACT_DELETE_SELECTED_FROM_CONTACT_LIST"
    };
};

export const updateAllContactsListFields = (data) => {
    return {
        type: "UPDATE_ALL_CONTACT_LIST_FIELDS",
        data: {
            value: data.value,
            prop: data.fieldName,
            index: data.index
        }
    };
};

export const updateContactGroupListFields = (data) => {
    return {
        type: "UPDATE_CONTACT_GROUP_LIST_FIELDS",
        data: {
            value: data.value,
            prop: data.fieldName,
            index: data.index
        }
    };
};

export const updateContactData = (data) => {
    return {
        type: "CONTACT_UPDATE_CONTACT_DATA",
        data: data
    };
};

export const resetContactData = () => {
    return {
        type: "RESET_CONTACT_DATA"
    };
};

export const resetContactGroupData = () => {
    return {
        type: "RESET_CONTACT_GROUP_DATA"
    };
};

export const deleteContactGroupContactList = () => {
    return {
        type: "DELETE_CONTACT_GROUP_CONTACT_LIST"
    };
};

export const selectAllContact = (data) => {
    return {
        type: "SELECT_ALL_CONTACT",
        data: data
    };
};

export const selectAllContactInContactGroup = (data) => {
    return {
        type: "SELECT_ALL_CONTACT_IN_CONTACT_GROUP",
        data: data
    };
};

export const resetContactListInContactGroup = () => {
    return {
        type: "RESET_CONTACT_LIST_IN_CONTACT_GROUP"
    };
};

const contactActions = {
    updatelistManagementCommonData,
    updateContactGroupList,
    deleteFromContactGroupList,
    updateContactFields,
    updateContactCommonData,
    updateContactGroupFields,
    updateContactGroupData,
    updateContactList,
    updateContactListFields,
    deleteFromContactsList,
    deleteSelectedFromContactsList,
    updateContactData,
    resetContactData,
    resetContactGroupData,
    updateContactCommonList,
    updateAllContactsListFields,
    updateContactGroupListFields,
    updateContactGroupContactList,
    deleteContactGroupContactList,
    selectAllContact,
    selectAllContactInContactGroup,
    resetContactListInContactGroup
};

export default contactActions;