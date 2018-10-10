export const showLoader = () => {
    return {
        type: "SHOW_LOADER"
    };
};

export const hideLoader = () => {
    return {
        type: "HIDE_LOADER"
    };
};


const commonActions = {
    showLoader,
    hideLoader
};

export default commonActions;
