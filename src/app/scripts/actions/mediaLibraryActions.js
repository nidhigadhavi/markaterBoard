export const updateFolderFieldsData = (data) => {
    return {
        type: "MEDIA_LIBRARY_UPDATE_FOLDER_FIELDS",
        data: {
            prop: data.prop,
            value: data.value
        }
    };
};

export const updateFolderList = (data) => {
    return {
        type: "MEDIA_LIBRARY_UPDATE_FOLDER_LIST",
        data: data
    };
};

export const updateFolderListFields = (data) => {
    return {
        type: "MEDIA_LIBRARY_UPDATE_FOLDER_LIST_FIELDS",
        data: {
            prop: data.prop,
            value: data.value,
            index: data.index
        }
    };
};

export const updateMediaFieldsData = (data) => {
    return {
        type: "MEDIA_LIBRARY_UPDATE_MEDIA_FIELDS",
        data: {
            prop: data.prop,
            value: data.value
        }
    };
};

export const updateMediaListFields = (data) => {
    return {
        type: "MEDIA_LIBRARY_UPDATE_MEDIA_LIST_FIELDS",
        data: {
            prop: data.prop,
            value: data.value,
            index: data.index
        }
    };
};

export const updateMediaList = (data) => {
    return {
        type: "MEDIA_LIBRARY_UPDATE_MEDIA_LIST",
        data: data
    };
};

export const pushToFolderList = (data) => {
    return {
        type: "MEDIA_LIBRARY_PUSH_IN_FOLDER_LIST",
        data: data
    };
};

export const resetSingleFolder = () => {
    return {
        type: "MEDIA_LIBRARY_RESET_SINGLE_FOLDER"
    };
};

export const updateSingleFolderData = (data) => {
    return {
        type: "MEDIA_LIBRARY_UPDATE_SINGLE_FOLDER_DATA",
        data: data
    };
};

export const updateCommonData = (data) => {
    return {
        type: "MEDIA_LIBRARY_UPDATE_COMMON_DATA",
        data: data
    };
};

export const pushToIndexFolderList = (data) => {
    return {
        type: "MEDIA_LIBRARY_PUSH_INDEX_IN_FOLDER_LIST",
        data: data
    };
};

export const deleteFromFolderList = (index) => {
    return {
        type: "MEDIA_LIBRARY_DELETE_FROM_FOLDER_LIST",
        data: {
            index
        }
    };
};

export const deleteFromMediaList = (index) => {
    return {
        type: "MEDIA_LIBRARY_DELETE_FROM_MEDIA_LIST",
        data: {
            index
        }
    };
};

export const deSelectAllMedia = () => {
    return {
        type: "MEDIA_LIBRARY_DESELECT_ALL_MEDIA_LIST"
    };
};

export const deleteSelected = () => {
    return {
        type: "MEDIA_LIBRARY_REMOVE_SELECTED_FROM_MEDIA_LIST"
    };
};

const mediaLibraryActions = {
    updateFolderFieldsData,
    updateFolderList,
    updateMediaFieldsData,
    updateMediaList,
    pushToFolderList,
    updateFolderListFields,
    updateMediaListFields,
    resetSingleFolder,
    updateSingleFolderData,
    pushToIndexFolderList,
    updateCommonData,
    deleteFromFolderList,
    deleteFromMediaList,
    deSelectAllMedia,
    deleteSelected
};

export default mediaLibraryActions;