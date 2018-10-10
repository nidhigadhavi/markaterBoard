function truncText(str, n) {
    if (!str) {
        return "";
    }
    return (str.length > n) ? str.substr(0, n - 1) + " ..." : str;
}

const commonUtils = {
    truncText
};

export default commonUtils;