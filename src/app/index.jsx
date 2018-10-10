import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import  "bootstrap";
import  "react-bootstrap";
import "./assets/css/app.scss";
// import js files
import React from "react";
import { render } from "react-dom";
// Redux Provider
import { Provider } from "react-redux";
// Store
import { store } from "../app/scripts/store/appStore";
import { AppRouter } from "../app/scripts/routes/appRouter.jsx";
render(
    <Provider store={store}>
        <AppRouter /> 
    </Provider>
, document.getElementById("app"));
