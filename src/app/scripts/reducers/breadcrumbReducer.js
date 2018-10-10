import update from "immutability-helper";
import breadcrumb from "../constants/breadcrumb";

const breadcrumbInitialState = {
    breadcrumb: []
};

function pathGetter(routeObj) {
    var routeArr = [],
        id, i = 0;
    id = routeObj.id;
    // routeArr = breadcrumb[routeObj.routeName];
    routeArr = breadcrumb.pathFetcher(routeObj);
    routeArr.map((route) => {
        // if (route.hasOwnProperty("id")) {
        //     route.id = routeObj.id;
        // }
        if (Array.isArray(id)) {
            if (route.hasOwnProperty("id")) {
                route.id = routeObj.id[i];
                i++;
            }
        } else if (route.hasOwnProperty("id")) {
            route.id = routeObj.id;
        }

    });
    return (routeArr);
}

const BreadcrumbReducer = function(state, actions) {
    let newState = state,
        routeObj;
    if (typeof state === "undefined") {
        return breadcrumbInitialState;
    }

    switch (actions.type) {

        case "PUSH_INTO_BREADCRUMB_ARRAY":
            routeObj = pathGetter(actions.data);
            newState = update(state, {
                breadcrumb: {
                    $set: routeObj
                }
            });
            break;
        case "CLEAR_BREADCRUMB_ARRAY":
            newState = update(state, {
                breadcrumb: {
                    $set: []
                }
            });
            break;
    }
    return newState;
};


export default BreadcrumbReducer;