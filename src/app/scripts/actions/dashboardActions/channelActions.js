// {
// campaignName: "",
// campaignKpi: "",
// startDate: "",
// targetAudience: "",
// campaignObjective: "",
// campaignTarget: "",
// endDate: ""
// }

export const updateChannelFields = (data) => {
    return {
        type: "CHANNEL_UPDATE_FIELDS",
        data: {
            index: data.index,
            value: data.value,
            prop: data.fieldName
        }
    };
};

export const updateRadioChannelFields = (data) => {
    return {
        type: "RADIO_CHANNEL_UPDATE_FIELDS",
        data: {
            index: data.index,
            value: data.value,
            prop: data.fieldName
        }
    };
};

export const updatePrintChannelFields = (data) => {
    return {
        type: "PRINT_CHANNEL_UPDATE_FIELDS",
        data: {
            index: data.index,
            value: data.value,
            prop: data.fieldName
        }
    };
};

export const updateEventChannelFields = (data) => {
    return {
        type: "EVENT_CHANNEL_UPDATE_FIELDS",
        data: {
            index: data.index,
            value: data.value,
            prop: data.fieldName
        }
    };
};

export const updateOohChannelFields = (data) => {
    return {
        type: "OOH_CHANNEL_UPDATE_FIELDS",
        data: {
            index: data.index,
            value: data.value,
            prop: data.fieldName
        }
    };
};

export const updateTvChannelFields = (data) => {
    return {
        type: "TV_CHANNEL_UPDATE_FIELDS",
        data: {
            index: data.index,
            value: data.value,
            prop: data.fieldName
        }
    };
};

export const updatePrChannelFields = (data) => {

    return {
        type: "PR_CHANNEL_UPDATE_FIELDS",
        data: {
            index: data.index,
            value: data.value,
            prop: data.fieldName
        }
    };
};

export const updateChannelSelected = (id) => {
    return {
        type: "CHANNEL_UPDATE_SELECTED",
        data: {
            id
        }
    };
};

export const addNewChannelRow = () => {
    return {
        type: "CHANNEL_ADD_NEW_ROW"
    };
};

export const updateChannelCommonData = (data) => {
    return {
        type: "CHANNEL_UPDATE_COMMON_DATA",
        data: {
            prop: data.fieldName,
            value: data.value
        }
    };
};

export const activateBulkChannels = () => {
    return {
        type: "CHANNEL_BULK_ACTIVATE"
    };
};

export const deactivateBulkChannels = () => {
    return {
        type: "CHANNEL_BULK_DEACTIVATE"
    };
};

export const selectAllChannel = (value) => {
    return {
        type: "CHANNEL_SELECT_ALL",
        data: {
            value: value
        }
    };
};

export const channelEditClick = (data) => {
    return {
        type: "CHANNEL_ENABLE_EDITABLE",
        data: {
            index: data.index,
            value: data.value,
            prop: data.fieldName
        }
    };
};

export const updateChannelObj = (data) => {
    return {
        type: "CHANNEL_UPDATE_OBJECT_IN_LIST",
        data: {
            index: data.index,
            obj: data.obj
        }
    };
};

export const updateChannelList = (data) => {
    return {
        type: "CHANNEL_UPDATE_LIST",
        data: data
    };
};

export const clearChannelList = () => {
    return {
        type: "CHANNEL_CLEAR_LIST"
    };
};

export const removeChannelFromArray = () => {
    return {
        type: "CHANNEL_REMOVE_FROM_LIST"
    };
};

const channelActions = {
    updateChannelFields,
    updatePrintChannelFields,
    updateEventChannelFields,
    updateRadioChannelFields,
    updateOohChannelFields,
    updateTvChannelFields,
    updatePrChannelFields,
    updateChannelSelected,
    addNewChannelRow,
    updateChannelCommonData,
    activateBulkChannels,
    deactivateBulkChannels,
    selectAllChannel,
    channelEditClick,
    updateChannelObj,
    updateChannelList,
    clearChannelList,
    removeChannelFromArray
};

export default channelActions;