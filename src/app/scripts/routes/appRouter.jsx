// React
import React from "react";
// Router
//import { Router, Route, hashHistory, IndexRoute } from "react-router";
import history from "../../history";
import { Router, Route, HashRouter, Switch } from 'react-router-dom';

// Redux Provider
import { Provider } from "react-redux";
// Store
import { store } from "../store/appStore";
import Dashboard from "../views/dashboard/index.jsx";
import MasterSetting from "../views/masterSetting/index.jsx";
import Home from "../views/dashboard/home/index.jsx";
import Admin from "../views/admin/index.jsx";
import ResetPassword from "../views/dashboard/resetPassword/index.jsx";
import UserProfile from "../views/dashboard/myProfile/index.jsx";
import UserProfileEdit from "../views/dashboard/myProfile/myProfileEdit.jsx";
import Page404 from "../../scripts/views/page404/page404.jsx";
import Login from "../views/loginModule/components/login/index.jsx";
import { loginModuleRoutes } from "../views/loginModule/routes";
import Registration from "../views/loginModule/components/registration/index1.jsx";
import ThankYou from "../views/loginModule/components/thankYou/index.jsx";
import ResetPasswordRequest from "../views/loginModule/components/resetPasswordRequest/index.jsx";
import ResendLink from "../views/loginModule/components/resendLink/index.jsx";
import ForgetPassword from "../views/loginModule/components/forgetPassword/index.jsx";
// import NewForgetPassword from "./components/forgetPassword/index1.jsx";
import CreatePassword from "../views/loginModule/components/createPassword/index.jsx";
import CreateUserPassword from "../views/loginModule/components/createUserPassword/index.jsx";
//import SuperAdminLogin from "../views/loginModule/superAdmin/login/index.jsx";
//Deshboard

export class AppRouter extends React.Component {
    _isLoggedIn(nextState, replace) {
        if (!sessionStorage.getItem("loggedIn")) {
            replace({
                pathname: `/?return_to=${window.location.href.split("#")[1]}`
            });
        }
    }
    render() {
        console.log(loginModuleRoutes);
        return (

            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/registration" component={Registration} />
                    <Route path="/thank-you" component={ThankYou} />
                    <Route path="/reset-password-request" component={ResetPasswordRequest} />
                    <Route path="/resend-link" component={ResendLink} />
                    <Route path="/forget-password" component={ForgetPassword} />
                    <Route path="/create-password" component={CreatePassword} />
                    <Route path="/create-userpassword" component={CreateUserPassword} />
                    <Route path="/login" component={Login} />
                    <Route path="/dashboard" component={Dashboard} onEnter={this._isLoggedIn}>
                            <Route exact path="/" component={Home} />
                            <Route path="my-profile" component={UserProfile} />
                            <Route path="my-profile-edit" component={UserProfileEdit} />
                            <Route path="reset-password" component={ResetPassword} />
                            <Route path="master-setting" component={MasterSetting} />
                    </Route>
                    {/* <Route path="/admin" component={Admin} onEnter={this._isLoggedIn}>
                            {adminModuleRoutes}
                    </Route> */}
                    </Switch>
                    {/* <Route path="/dashboard" component={Dashboard} onEnter={this._isLoggedIn}>
                            <Route exact path="/" component={Home} />
                            <Route path="my-profile" component={UserProfile} />
                            <Route path="my-profile-edit" component={UserProfileEdit} />
                            <Route path="reset-password" component={ResetPassword} />
                            <Route path="master-setting" component={MasterSetting} />
                        </Route>
                        <Route path="/admin" component={Admin} onEnter={this._isLoggedIn}>
                            {adminModuleRoutes}
                        </Route>
                        <Route path="*" component={Page404} /> */}
                </Router>
            </Provider>
        );
    }
}
