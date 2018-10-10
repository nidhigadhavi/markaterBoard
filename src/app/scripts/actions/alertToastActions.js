export const showToast = (data) => {
    return {
        type: "SHOW_TOAST",
        data: data
    };
};

export const hideToast = (data) => {
    return {
        type: "HIDE_TOAST",
        data: data
    };
};

const alertToastActions = {
    showToast,
    hideToast
};

export default alertToastActions;
