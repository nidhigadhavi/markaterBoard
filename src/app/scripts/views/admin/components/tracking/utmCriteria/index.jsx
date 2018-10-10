import React from "react";
import { Panel, Table, FormControl } from "react-bootstrap";
import { ajax } from "../../../../../utils/ajax";
import commonUtils from "../../../../../utils/commonUtils";

class EmailUtmTableDataRow extends React.Component {
    render() {
        return (
            <tr>
                {/* <td className="padding-10">{this.props.id + 1 }</td> */}
                <td className="padding-10">{this.props.data.moduleName}</td>
                <td className="padding-10">{this.props.data.campiagnName}</td>
                <td className="padding-10">{this.props.data.activityName}</td>
                <td className="padding-10">{this.props.data.url}</td>
                <td className="padding-10">{commonUtils.truncText(this.props.data.utm,90)}</td>
            </tr>
        );
    }
}




class SmsUtmTableDataRow extends React.Component {
    render() {
        return (
            <tr>
                {/* <td className="padding-10">{this.props.id + 1 }</td> */}
                <td className="padding-10">{this.props.data.moduleName}</td>
                <td className="padding-10">{this.props.data.campiagnName}</td>
                <td className="padding-10">{this.props.data.activityName}</td>
                <td className="padding-10">{this.props.data.url}</td>
                <td className="padding-10">{commonUtils.truncText(this.props.data.utm,90)}</td>
            </tr>
        );
    }
}




class UtmCriteria extends React.Component {
    constructor() {
        super();
        this.state = {
            smsUtm: [],
            emailUtm: []
        };
    }
    render() {
        const title = (
            <p className="padding-5-10 font-14"><strong>Panel title</strong></p>
        );
        return (
            <div className="margin-top-20 utm-criteria-page">
                <h3 className="font-weight-700 margin-bottom-0">UTM Criteria</h3>
                <p className="grey-text" >Know the UTM parameters on which MarketerBoard is tracking.</p>
                <hr />
                <div className="margin-top-20">
                    <div className="utm-parameter margin-bottom-20">
                        <h4>List of Parameters</h4>
                        <Table >
                            <thead className="thead-light" >
                                <tr>
                                    <th>Default Source</th>
                                    <th>Campaign Name/ID</th>
                                    <th>Activity ID</th>
                                    <th>Primary Source</th>
                                    <th>Second Source</th>
                                    <th>Third Source</th>
                                    <th>Market</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="padding-vertical-10">
                                        Default is noting but a category value under plan section.
                                    </td>
                                    <td className="padding-vertical-10">
                                        When user is creating campaign and ID is generated.
                                    </td>
                                    <td className="padding-vertical-10">
                                        When user is creating activity or plan under campaign an ID is generated.
                                    </td>
                                    <td className="padding-vertical-10">
                                        Primary Source is noting but media activity when it's digital, but for other modules it will be hidden.
                                    </td>
                                    <td className="padding-vertical-10">
                                        Second Source is noting but channel activity when it's digital, but for other modules it will be hidden.
                                    </td>
                                    <td className="padding-vertical-10">
                                        Third Source is noting but web url this could be any url user is pasting in the field.(default-website).
                                    </td>
                                    <td className="padding-vertical-10">
                                        Market
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <h4>List of UTM Created</h4>
                    <div className="utm-created">
                        <Table>
                            <thead className="thead-light" >
                                <tr>
                                    {/* <th>S. No.</th> */}
                                    <th>Module</th>
                                    <th>Campaign</th>
                                    <th>Activity</th>
                                    <th>URL</th>
                                    <th>UTM</th>
                                    {/* <th>Status</th> */}
                                </tr>
                            </thead>
                            <tbody>
                            {
                                    this.state.emailUtm.map((utm, i) => {
                                        return (
                                            <EmailUtmTableDataRow data={utm} id={i}/>
                                        );
                                    })
                                }

                                {
                                     this.state.smsUtm.map((utm, i) => {
                                         return (
                                            <SmsUtmTableDataRow data={utm} id={i}/>
                                         );
                                     })
                                }
                                {/* {this.state.utmList.map((utm, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="padding-10">
                                                {utm.id}
                                            </td>
                                            <td className="padding-10">
                                                {utm.module}
                                            </td>
                                            <td className="padding-10">
                                                {utm.campaign}
                                            </td>
                                            <td className="padding-10">
                                                {utm.activity}
                                            </td>
                                            <td className="padding-10">
                                                {utm.url}
                                            </td>
                                            <td className="padding-10">
                                                {utm.utm}
                                            </td>
                                            <td className="padding-10">
                                                {utm.status ?
                                                    <i className="glyphicon glyphicon-ok-sign font-16 color-green" /> :
                                                    <i className="glyphicon glyphicon-remove-sign font-16 color-red" />}
                                            </td>
                                        </tr>
                                    );
                                })}  */}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.getUtmList();
    }

    getUtmList() {
        let config = {
            method: "get",
            url: "/performance/utmCriteria"
        };
        ajax(config)
            .then((response) => {
                this.setState({
                    emailUtm: response.data.emailModuleUtmCriteria,
                    smsUtm: response.data.smsModuleUtmCriteria
                });
            }).catch(() => {
                //
            });
    }
}
export default UtmCriteria;