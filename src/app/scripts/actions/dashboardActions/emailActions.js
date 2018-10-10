export const updateEmailCampaignFieldsData = (data) => {
    return {
        type: "EMAIL_CAMPAIGN_UPDATE_CAMPAIGN_FIELDS",
        data: {
            prop: data.prop,
            value: data.value
        }
    };
};

export const updateEmailChannelFieldsData = (data) => {
    return {
        type: "EMAIL_UPDATE_CHANNEL_FIELDS",
        data: {
            prop: data.prop,
            value: data.value
        }
    };
};

export const updateEmailChannelListFieldsData = (data) => {
    return {
        type: "EMAIL_UPDATE_CHANNEL_LIST_FIELDS",
        data: {
            index: data.index,
            prop: data.prop,
            value: data.value
        }
    };
};

export const updateEmailChannelData = (data) => {
    return {
        type: "EMAIL_UPDATE_CHANNEL_DATA",
        data: data
    };
};

export const updateEmailCampaignData = (data) => {
    return {
        type: "EMAIL_CAMPAIGN_UPDATE_CAMPAIGN_DATA",
        data: data
    };
};

export const resetEmailCampaignData = () => {
    return {
        type: "EMAIL_CAMPAIGN_RESET_CAMPAIGN_DATA"
    };
};

export const updateEmailCampaignList = (list) => {
    return {
        type: "EMAIL_CAMPAIGN_UPDATE_CAMPAIGN_LIST",
        data: list
    };
};

export const updateEmailChannelList = (data) => {
    return {
        type: "EMAIL_UPDATE_CHANNEL_LIST",
        data: data
    };
};

export const deleteFromCampaignList = (index) => {
    return {
        type: "EMAIL_CAMPAIGN_DELETE_FROM_CAMPAIGN_LIST",
        data: {
            index
        }
    };
};

export const updateEmailCampaignCommonData = (data) => {
    return {
        type: "EMAIL_CAMPAIGN_UPDATE_COMMON_DATA",
        data: data
    };
};

export const updateEmailChannelCommonData = (data) => {
    return {
        type: "EMAIL_CHANNEL_UPDATE_COMMON_DATA",
        data: {
            prop: data.prop,
            value: data.value
        }
    };
};

export const updateEmailChannelFields = (data) => {
    return {
        type: "EMAIL_CAMPAIGN_UPDATE_CHANNEL_FIELDS",
        data: data
    };
};

export const resetChannelData = () => {
    return {
        type: "EMAIL_CHANNEL_RESET_FIELDS"
    };
};

export const resetSelectedChannelList = () => {
    return {
        type: "EMAIL_CHANNEL_LIST_RESET_SELECTED"
    };
};

export const removeSelectedChannel = () => {
    return {
        type: "EMAIL_CHANNEL_LIST_REMOVE_SELECTED"
    };
};

export const updateEmailChannelListSelectAll = (value) => {
    return {
        type: "EMAIL_CHANNEL_LIST_UPDATE_SELECT_ALL",
        data: {
            value
        }
    };
};

export const updateEmailChannelListSelectAllAlt = (data) => {
    return {
        type: "EMAIL_CHANNEL_LIST_UPDATE_SELECT_ALL_ALT",
        data: data
    };
};

export const selectTemplate = (index) => {
    return {
        type: "SELECT_TEMPLATE",
        data: {
            index
        }
    };
};

export const deselectTemplate = () => {
    return {
        type: "DESELECT_TEMPLATE"
    };
};


const emailActions = {
    selectTemplate,
    deselectTemplate,
    updateEmailCampaignData,
    updateEmailCampaignFieldsData,
    updateEmailChannelFieldsData,
    updateEmailChannelListFieldsData,
    updateEmailChannelData,
    updateEmailCampaignList,
    updateEmailChannelList,
    resetEmailCampaignData,
    deleteFromCampaignList,
    updateEmailCampaignCommonData,
    updateEmailChannelCommonData,
    resetChannelData,
    resetSelectedChannelList,
    updateEmailChannelListSelectAll,
    removeSelectedChannel,
    updateEmailChannelListSelectAllAlt
};

export default emailActions;