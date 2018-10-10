export const updateSingleTemplateFields = (data) => {
    return {
        type: "EMAIL_TEMPLATE_SINGLE_UPDATE_FIELDS",
        data: {
            prop: data.prop,
            value: data.value
        }
    };
};

export const updateEmailTemplateList = (list) => {
    return {
        type: "EMAIL_TEMPLATE_UPDATE_TEMPLATE_LIST",
        data: {
            value: list
        }
    };
};

export const updateEmailTemplateListFields = (data) => {
    return {
        type: "EMAIL_TEMPLATE_UPDATE_TEMPLATE_LIST_FIELDS",
        data: {
            index: data.index,
            value: data.value,
            prop: data.prop
        }
    };
};

export const deSelectAllTemplate = () => {
    return {
        type: "EMAIL_TEMPLATE_DESELECT_ALL"
    };
};

export const updateTemplateCommonData = (data) => {
    return {
        type: "UPDATE_TEMPLATE_COMMON_DATA",
        data: {
            value: data.value,
            prop: data.prop
        }
    };
};

export const selectTemplate = (index) => {
    return {
        type: "SELECT_TEMPLATE",
        data: {
            index: index
        }
    };
};

export const updateSingleTemplate = (data) => {
    return {
        type: "UPDATE_SINGLE_TEMPLATE",
        data: data
    };
};

export const resetSingleTemplate = () => {
    return {
        type: "RESET_SINGLE_TEMPLATE"
    };
};

export const deleteTemplateFromList = (id) => {
    return {
        type: "DELETE_TEMPLATE_FROM_LIST",
        data: {
            id
        }
    };
};

const emailTemplateActions = {
    updateSingleTemplateFields,
    updateEmailTemplateList,
    updateEmailTemplateListFields,
    deSelectAllTemplate,
    updateTemplateCommonData,
    selectTemplate,
    updateSingleTemplate,
    resetSingleTemplate,
    deleteTemplateFromList
};

export default emailTemplateActions;