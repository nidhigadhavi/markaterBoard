import React from "react";
import { Jumbotron, FormGroup, FormControl } from "react-bootstrap";

const TRACKING_CODE = `<script>!function(r){function t(n){if(e[n])return e[n].exports;var o=e[n]={exports:{},id:n,loaded:!1};return r[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var e={};return t.m=r,t.c=e,t.p="",t(0)}([function(r,t){!function(){var r=window.location.href.split("?")[1];(new Image).src="${window.location.origin}/performance/track?"+r}()}]);</script>`;

class TrackingCodeView extends React.Component {
    render() {
        return (
            <div className="margin-top-20 tracking-script-page">
                <h3 className="margin-top-5 font-weight-700 margin-bottom-0" >Tracking Code </h3>
                <p className="grey-text">Install MarketerBoard tracking script for capturing leads.</p>
                <hr />
                <div className="row">
                    <div className="margin-top-10">
                        <div className="col-md-8 padding-left-0">
                            <FormGroup>
                                <FormControl
                                    readOnly
                                    style={{ backgroundColor: "#e9f2fb" }}
                                    className="no-resize tracking-script"
                                    componentClass="textarea"
                                    placeholder="Tracking Code"
                                    rows={6}
                                    value={TRACKING_CODE} />
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <h4 className="no-margin font-16">Installation Instructions.</h4>
                            <ul className="padding-left-10 margin-top-20 margin-left-10 font-12">
                                <li> If you do not have the access of your website then email the tracking script to your IT Department or web developer. 
                                {/* <span
                                    className="action-link active font-14"
                                    onClick={() => {
                                        this.send();
                                    }}>here</span> */}
                                    <a href="mailto:someone@example.com"> Click here</a> to send an email.
                                </li>
                                <li className="margin-top-10"> If you do have access of your website then copy paste this tracking code inside &#60;head&#62; tag
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    send() {
        // 
    }
}
export default TrackingCodeView;