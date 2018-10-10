export const updateSmsCampaignFieldsData = (campaignData) => {
    return {
        type: "SMS_CAMPAIGN_UPDATE_CAMPAIGN_FIELDS",
        data: {
            prop: campaignData.prop,
            value: campaignData.value
        }
    };
};

export const updateSmsChannelFieldsData = (data) => {
    return {
        type: "SMS_UPDATE_CHANNEL_FIELDS",
        data: {
            prop: data.prop,
            value: data.value
        }
    };
};

export const updateSmsChannelListFieldsData = (data) => {
    return {
        type: "SMS_UPDATE_CHANNEL_LIST_FIELDS",
        data: {
            index: data.index,
            prop: data.prop,
            value: data.value
        }
    };
};

export const updateSmsChannelData = (data) => {
    return {
        type: "SMS_UPDATE_CHANNEL_DATA",
        data: data
    };
};

export const updateSmsCampaignData = (campaignData) => {
    return {
        type: "SMS_CAMPAIGN_UPDATE_CAMPAIGN_DATA",
        data: campaignData
    };
};

export const resetSmsCampaignData = () => {
    return {
        type: "SMS_CAMPAIGN_RESET_CAMPAIGN_DATA"
    };
};

export const updateSmsCampaignList = (campaignListData) => {
    return {
        type: "SMS_CAMPAIGN_UPDATE_CAMPAIGN_LIST",
        data: campaignListData
    };
};

export const updateSmsChannelList = (data) => {
    return {
        type: "SMS_UPDATE_CHANNEL_LIST",
        data: data
    };
};

export const deleteFromCampaignList = (index) => {
    return {
        type: "SMS_CAMPAIGN_DELETE_FROM_CAMPAIGN_LIST",
        data: {
            index
        }
    };
};

export const updateSmsCampaignCommonData = (data) => {
    return {
        type: "SMS_CAMPAIGN_UPDATE_COMMON_DATA",
        data: data
    };
};

export const updateSmsChannelCommonData = (data) => {
    return {
        type: "SMS_CHANNEL_UPDATE_COMMON_DATA",
        data: {
            prop: data.prop,
            value: data.value
        }
    };
};

export const updateSmsChannelFields = (data) => {
    return {
        type: "SMS_CAMPAIGN_UPDATE_CHANNEL_FIELDS",
        data: data
    };
};

export const resetChannelData = () => {
    return {
        type: "SMS_CHANNEL_RESET_FIELDS"
    };
};

export const resetSelectedChannelList = () => {
    return {
        type: "SMS_CHANNEL_LIST_RESET_SELECTED"
    };
};

export const removeSelectedChannel = () => {
    return {
        type: "SMS_CHANNEL_LIST_REMOVE_SELECTED"
    };
};

export const updateSmsChannelListSelectAll = (value) => {
    return {
        type: "SMS_CHANNEL_LIST_UPDATE_SELECT_ALL",
        data: {
            value
        }
    };
};

export const updateSmsChannelListSelectAllAlt = (data) => {
    return {
        type: "SMS_CHANNEL_LIST_UPDATE_SELECT_ALL_ALT",
        data: data
    };
};


const smsActions = {
    updateSmsCampaignData,
    updateSmsCampaignFieldsData,
    updateSmsChannelFieldsData,
    updateSmsChannelListFieldsData,
    updateSmsChannelData,
    updateSmsCampaignList,
    updateSmsChannelList,
    resetSmsCampaignData,
    deleteFromCampaignList,
    updateSmsCampaignCommonData,
    updateSmsChannelCommonData,
    resetChannelData,
    resetSelectedChannelList,
    updateSmsChannelListSelectAll,
    removeSelectedChannel,
    updateSmsChannelListSelectAllAlt
};

export default smsActions;