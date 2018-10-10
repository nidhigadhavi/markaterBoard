import update from "immutability-helper";

const loaderInitialState = {
    loader: false
};

export default (state, action) => {
    let newState;

    if (typeof state === "undefined") {
        return loaderInitialState;
    }
    switch (action.type) {
        case "SHOW_LOADER":
            newState = update(state, {
                loader: {
                    $set: true
                }
            });
            // newState = R.merge(state, {
            //     loader: true
            // });
            break;
        case "HIDE_LOADER":
            newState = update(state, {
                loader: {
                    $set: false
                }
            });
            // newState = R.merge(state, {
            //     loader: false
            // });
            break;
        default:
            newState = update(state, {
                loader: {
                    $set: false
                }
            });
            break;
    }

    return newState;
};