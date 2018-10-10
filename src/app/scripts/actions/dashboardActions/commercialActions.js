export const updateCommercialFields = (fieldData) => {
    return {
        type: "COMMERCIAL_UPDATE_COMMERCIAL_FIELD",
        data: {
            prop: fieldData.prop,
            value: fieldData.value
        }
    };
};

export const updateCommercialsData = (commercialData) => {
    return {
        type: "COMMERCIAL_UPDATE_COMMERCIALS_DATA",
        data: commercialData
    };
};

export const addTaxFields = (newField) => {
    return {
        type: "COMMERCIAL_ADD_TAX_FIELDS",
        data: newField
    };
};

export const updateCommercialTaxData = (commercialTaxData) => {
    return {
        type: "COMMERCIAL_UPDATE_TAX_FIELDS",
        data: {
            prop: commercialTaxData.prop,
            value: commercialTaxData.value
        }
    };
};

export const restCommercialTaxFields = () => {
    return {
        type: "COMMERCIAL_RESET_TAX_FIELDS"
    };
};

export const deleteTaxObject = (id) => {
    return {
        type: "COMMERCIAL_DELETE_TAX_OBJECT",
        data: {
            id
        }
    };
};

export const resetCommercialData = (id) => {
    return {
        type: "COMMERCIAL_RESET_DATA",
        data: {
            id
        }
    };
};

const commercialActions = {
    updateCommercialTaxData,
    updateCommercialFields,
    addTaxFields,
    deleteTaxObject,
    restCommercialTaxFields,
    updateCommercialsData,
    resetCommercialData
};

export default commercialActions;