import axios from "axios";
import httpRequestResponse from "../constants/httpRequestResponse";
import { navigate } from "./route";

const SOMETHING_WENT_WRONG = "SOMETHING_WENT_WRONG";
const DEFAULT_HEADERS = {
    // Add default application type / content type if required
};

const _processError = function(error) {
    let processedErrors = [];
    if (error.response) {
        if (Array.isArray(error.response.data)) {
            processedErrors = error.response.data.map((error) => {
                return ({
                    errorCode: error.errorCode,
                    errorMessage: error.error
                });
            });
        } else if (typeof(error.response.data) === "object") {
            processedErrors.push({
                errorCode: error.response.data.errorCode,
                errorMessage: error.response.data.error||error.response.data.errorMessage
            });
        } else if (error.response.status) {
            if (error.response.status === 401) {
                navigate("login");
            } else {
                processedErrors.push({
                    errorCode: error.response.status,
                    errorMessage: httpRequestResponse.compareResponseErrorCode(error.response.status)
                });
            }
        }
    } else {
        processedErrors.push({
            errorCode: SOMETHING_WENT_WRONG,
            errorMessage: "Something went wrong. Please try refreshing the page again !"
        });
    }
    return processedErrors;
};

const ajax = function(config) {
    let finalConfig = {
        headers: {
            "x-auth-token": sessionStorage.getItem("userAuthToken")
        }
    };

    Object.assign(finalConfig, config);

    Object.assign(finalConfig.headers, DEFAULT_HEADERS, config.headers || {});

    return new Promise((resolve, reject) => {
        axios(finalConfig).then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(_processError(error));
        });
    });
};

export {
    ajax
};

// import axios from "axios";
// export { axios as ajax };