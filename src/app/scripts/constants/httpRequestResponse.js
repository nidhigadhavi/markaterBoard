const serverSideError = "The server encountered an unexpected condition please try refreshing the page !!";

const clientSideError = "Bad Request";

function compareResponseErrorCode(code) {
    if (code >= 400 || code <= 499) {
        return clientSideError;
    }
    if (code >= 500 || code <= 599) {
        return serverSideError;
    }
}

const httpRequestResponse = {
    compareResponseErrorCode
};

export default httpRequestResponse;