import {
    createStore,
    combineReducers
} from "redux";

// The Admin Reducer
import adminReducer from "../reducers/adminReducer";
// The Super Admin Reducer
import superAdminReducer from "../reducers/superAdminReducer";
// The Loader Reducer
import loaderReducer from "../reducers/loaderReducer";
// The Alert Toast Reducer
import alertToastReducer from "../reducers/alertToastReducer";
// The Breadcrumb Reducer
import breadcrumbReducer from "../reducers/breadcrumbReducer";


// Combine Reducers
const reducers = combineReducers({
    adminState: adminReducer,
    superAdminState: superAdminReducer,
    commonState: loaderReducer,
    breadcrumbState: breadcrumbReducer,
    alertToastState: alertToastReducer
});

export const store = createStore(reducers);