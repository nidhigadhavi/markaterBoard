import update from "immutability-helper";

const initialState = {
    toasts: []
};

export default (state, action) => {

    let newState = state;

    if (typeof state === "undefined") {
        return initialState;
    }


    let toast = {};
    let filteredToasts;

    switch (action.type) {
        case "SHOW_TOAST":
            toast = {
                id: new Date().getTime(),
                type: action.data.type,
                message: action.data.message
            };
            newState = update(state, {
                toasts: {
                    $push: [toast]
                }
            });
            break;
        case "HIDE_TOAST":
            filteredToasts = state.toasts.filter((t) => {
                return t.id !== action.data.id;
            });
            newState = update(state, {
                toasts: {
                    $set: filteredToasts
                }
            });
            break;
    }

    return newState;
};