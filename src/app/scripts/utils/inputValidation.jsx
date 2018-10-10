
const websiteRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
const numberRegex = /[0-9]\d/;
const phonenumberRegex = /^[0-9]*$/;
const zipcodeRegex = /^[0-9]*$/;
const textRegex = /[a-z A-z]/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailNewRegex = /^([\w-\.]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)([\w-]+\.)+[\w-]{2,4})?$/;
const passwordRegex = /^(?=.*[!@#$&*])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{4,16}$/;
const onlyCharaRegx = /^[a-zA-Z]*$/;
const countryCodeRegax = /^(\+)([1-9]{2})/;
const  addressRegax = /^([a-zA-Z0-9., _])*$/;
const  stateRegax = /^([a-zA-Z ])*$/;

function numericValidation(value) {
    if (value === "") return null;
    else if (numberRegex.test(value)) return "success";
    else if (!(numberRegex.test(value))) return "error";
}

function phoneValidation(value) {
    if (value === "") return null;
    else if (phonenumberRegex.test(value)) return "success";
    else if (!(phonenumberRegex.test(value))) return "error";
}

function zipValidation(value) {
    if (value === "") return null;
    else if (zipcodeRegex.test(value)) return "success";
    else if (!(zipcodeRegex.test(value))) return "error";
}
function countryCodeValidation(value) {
    if (countryCodeRegax.test(value))
        return true;
    else
        return false;
}
function stateValidation(value) {
    if (stateRegax.test(value))
        return true;
    else
        return false;
}

function alphaNumericValidation(value) {
    if (value === "") return null;
    else if (textRegex.test(value)) return "success";
    else if (!(textRegex.test(value))) return "error";
}
function passwordValidation(value) {
    if (value === "") {
        return null;
    } else if (passwordRegex.test(value)) {
        // if ((value) <= 12) {
        //     this.tipElement = "Weak";
        // } else {
        //     this.tipElement = "Strong";
        // }
        return "success";
    } else if (!(passwordRegex.test(value))) {
        return "error";
    }
}
function emailValidation(value) {
    if (value === "") {
        return null;
    } else if (emailRegex.test(value)) {
        return "success";
    } else if (!(emailRegex.test(value))) {
        return "error";
    }
}
function compareValidation(value1, value2) {
    if (value1 === "") {
        return null;
    } else if (value1 === value2) {
        return "success";
    } else if (value1 !== value2) {
        return "error";
    }
}
function websiteValidation(value) {
    if (value === "") return null;
    else if (websiteRegex.test(value)) return "success";
    else if (!(websiteRegex.test(value))) return "error";
}
function charaterValidation(char) {
    if (onlyCharaRegx.test(char))
        return true;
    else
        return false;

}
function addressValidation(char) {
    if (addressRegax.test(char))
        return true;
    else
        return false;

}
function zipCodeValidation(value) {
    if (zipcodeRegex.test(value))
        return true;
    else
        return false;

}
function emailValidationNew(value) {
    if (emailNewRegex.test(value))
        return true;
    else
        return false;

}
function phoneNumberValidationNew(value) {
    if (phonenumberRegex.test(value))
    return true;
else
    return false;
}
const validations = {
    number: numericValidation,
    website: websiteValidation,
    zip: zipValidation,
    zipCode: zipCodeValidation,
    phone: phoneValidation,
    phoneNumber: phoneNumberValidationNew,
    text: alphaNumericValidation,
    email: emailValidation,
    emailNew: emailValidationNew,
    password: passwordValidation,
    compare: compareValidation,
    character: charaterValidation,
    countryCode: countryCodeValidation,
    address: addressValidation,
    state: stateValidation

};

export default validations;