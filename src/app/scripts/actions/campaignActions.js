// {
// campaignName: "",
// campaignKpi: "",
// startDate: "",
// targetAudience: "",
// campaignObjective: "",
// campaignTarget: "",
// endDate: ""
// }

export const updateCampaignFieldsData = (campaignData) => {
    return {
        type: "CAMPAIGN_UPDATE_CAMPAIGN_FIELDS",
        data: {
            prop: campaignData.prop,
            value: campaignData.value
        }
    };
};

export const updateCampaignData = (campaignData) => {
    return {
        type: "CAMPAIGN_UPDATE_CAMPAIGN_DATA",
        data: campaignData
    };
};

export const resetCampaignData = () => {
    return {
        type: "CAMPAIGN_RESET_CAMPAIGN_DATA"
    };
};

export const updateCampaignList = (campaignListData) => {
    return {
        type: "CAMPAIGN_UPDATE_CAMPAIGN_LIST",
        data: campaignListData
    };
};

export const updateActiveToggle = (value) => {
    return {
        type: "CAMPAIGN_TOGGLE_CAMPAIGN_ACTIVE",
        data: {
            value
        }
    };
};

export const updateCommonData = (commonData) => {
    return {
        type: "CAMPAIGN_UPDATE_COMMON_DATA_LIST",
        data: commonData
    };
};

export const deleteFromCampaignList = (index) => {
    return {
        type: "CAMPAIGN_DELETE_FROM_CAMPAIGN_LIST",
        data: {
            index
        }
    };
};

export const clearCampaignData = () => {
    return {
        type: "CAMPAIGN_CLEAR_OBJECT"
    };
};

export const updateCampaignCommonFields = (data) => {
    return {
        type: "CAMPAIGN_UPDATE_COMMON_DATA",
        data: data
    };
};

const campaignActions = {
    updateCampaignData,
    updateActiveToggle,
    updateCampaignFieldsData,
    updateCampaignList,
    resetCampaignData,
    updateCommonData,
    deleteFromCampaignList,
    clearCampaignData,
    updateCampaignCommonFields
};

export default campaignActions;