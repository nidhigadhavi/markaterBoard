export const showPromptModal = () => {
    return {
        type: "SHOW_DELETE_MODAL"
    };
};

export const closePromptModal = () => {
    return {
        type: "CLOSE_DELETE_MODAL"
    };
};

export const showPrompt = (data) => {
    return {
        type: "SHOW_PROMPT_MODAL",
        data: data
    };
};

export const closePrompt = (data) => {
    return {
        type: "CLOSE_PROMPT_MODAL",
        data: data
    };
};


export const updateToBeDeletedId = (id) => {
    return {
        type: "UPDATE_TO_BE_DELETED_ID",
        data: {
            id
        }
    };
};

export const updateBreadcrumb = (routeObj) => {
    return {
        type: "PUSH_INTO_BREADCRUMB_ARRAY",
        data: routeObj
    };
};

export const clearBreadcrumb = () => {
    return {
        type: "CLEAR_BREADCRUMB_ARRAY"
    };
};

const commonActions = {
    showPromptModal,
    closePromptModal,
    showPrompt,
    closePrompt,
    updateToBeDeletedId,
    updateBreadcrumb,
    clearBreadcrumb
};

export default commonActions;