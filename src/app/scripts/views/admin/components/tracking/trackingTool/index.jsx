import React from "react";
import { Jumbotron, FormGroup, FormControl, Panel, Grid, Row, Col, Thumbnail, Button } from "react-bootstrap";
import piwikLogo from "../../../../../../assets/images/piwik.png";
import googleAnalyticLogo from "../../../../../../assets/images/googlr-analytics.png";
import bitlyLogo from "../../../../../../assets/images/bitly.png";

const TRACKING_CODE = `<script>!function(r){function t(n){if(e[n])return e[n].exports;var o=e[n]={exports:{},id:n,loaded:!1};return r[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var e={};return t.m=r,t.c=e,t.p="",t(0)}([function(r,t){!function(){var r=window.location.href.split("?")[1];(new Image).src="${window.location.origin}/performance/track?"+r}()}]);</script>`;

class TrackingTool extends React.Component {
    render() {
        return (
            <div className="other-tracking-tool-page">
                <h3>Other Tracking Tools</h3>
                <Row className="margin-top-30">
                    <div className="margin-horizontal-20 card-container">
                        <Col md={3} className="margin-left-35 card-shadow">
                            <div>
                                <div className="">
                                    <img className="bottom-border-rounded" src={piwikLogo} />
                                </div>
                                <div className="margin-top-20">
                                    <p className="text-center"><strong>Piwik</strong></p>
                                    <p className="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                    <Row className="margin-bottom-20">
                                        <Col md={3} mdOffset={3}>
                                            <Button bsSize="small" bsStyle="default">Enable</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>

                        <Col md={3} mdOffset={1} className="card-shadow">
                            <div>
                                <div>
                                <img className="bottom-border-rounded" src={googleAnalyticLogo} />
                                </div>
                                <div className="margin-top-20">
                                    <p className="text-center"><strong>Google Analytics</strong></p>
                                    <p className="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                    <Row className="margin-bottom-20">
                                        <Col md={3} mdOffset={3}>
                                            <Button bsSize="small" bsStyle="default">Enable</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                        </Col>

                        <Col md={3} mdOffset={1} className="card-shadow">
                            <div>
                                <div>
                                <img className="bottom-border-rounded" src={bitlyLogo} />
                                </div>
                                <div className="margin-top-20">
                                    <p className="text-center"><strong>Bitly</strong></p>
                                    <p className="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                    <Row className="margin-bottom-20">
                                        <Col md={3} mdOffset={3}>
                                            <Button bsSize="small" bsStyle="default">Enable</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                        </Col>
                    </div>
                </Row>
            </div >
        );
    }
}
export default TrackingTool;