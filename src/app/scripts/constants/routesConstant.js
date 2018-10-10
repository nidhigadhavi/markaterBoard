
import React from "react";

//import { Router, Route, hashHistory, IndexRoute } from "react-router";
import { Router, Route } from 'react-router-dom';

import PrintMedia from "../views/dashboard/plan/printMedia/index.jsx";
import PMCampaignList from "../views/dashboard/plan/printMedia/campaignList/index.jsx";
import PMCampaignDetails from "../views/dashboard/plan/printMedia/campaignDetails/index.jsx";
import PMCreateCampaign from "../views/dashboard/plan/printMedia/createCampaign/index.jsx";
import PMCommercialScreen from "../views/dashboard/plan/printMedia/commercialScreen/index.jsx";



function routeFetcher(id) {
    let route;
    switch (id) {
        case 3:
            route = (
                
                <Route path="print-media">
                    <Route exact path="" component={PrintMedia} />
                    <Route path="campaigns" component={PMCampaignList} />
                    <Route path="campaigns/:campaignId" component={PMCampaignDetails} />
                    <Route path="campaigns/campaign/edit/:campaignId" component={PMCreateCampaign} />
                    <Route path="campaign/create" component={PMCreateCampaign}/>
                    <Route path="campaigns/:campaignId/commercial/edit/:commercialId" component={PMCommercialScreen} />
                    <Route path="campaigns/:campaignId/commercial/create" component={PMCommercialScreen} />
                </Route>
                
            );
            break;
        case 4:
            route = (
                `<Route path="television" onEnter={this._hasModuleAccess.bind(this, 4)}>
                    <Route exact path="" component={Television} />
                    <Route path="campaigns" component={TelevisionCampaignList} />
                    <Route path="campaigns/:campaignId" component={TelevisionCampaignDetails} />
                    <Route path="campaigns/campaign/edit/:campaignId" component={TelevisionCreateCampaign} />
                    <Route path="campaign/create" component={TelevisionCreateCampaign} />
                    <Route path="campaigns/:campaignId/commercial/edit/:commercialId" component={TelevisionCommercialScreen} />
                    <Route path="campaigns/:campaignId/commercial/create" component={TelevisionCommercialScreen} />
                </Route>`
            );
            break;
        case 5:
            route = (
                `<Route path="radio" onEnter={this._hasModuleAccess.bind(this, 5)}>
                    <Route exact path="" component={Radio} />
                    <Route path="campaigns" component={RadioCampaignList} />
                    <Route path="campaigns/:campaignId" component={RadioCampaignDetails} />
                    <Route path="campaigns/campaign/edit/:campaignId" component={RadioCreateCampaign} />
                    <Route path="campaign/create" component={RadioCreateCampaign} />
                    <Route path="campaigns/:campaignId/commercial/edit/:commercialId" component={RadioCommercialScreen} />
                    <Route path="campaigns/:campaignId/commercial/create" component={RadioCommercialScreen} />
                </Route>`
            );
            break;
        case 6:
            route = (
                `<Route path="out-of-home" onEnter={this._hasModuleAccess.bind(this, 6)}>
                    <Route exact path="" component={OutOfHome} />
                    <Route path="campaigns" component={OutOfHomeCampaignList} />
                    <Route path="campaigns/:campaignId" component={OutOfHomeCampaignDetails} />
                    <Route path="campaigns/campaign/edit/:campaignId" component={OutOfHomeCreateCampaign} />
                    <Route path="campaign/create" component={OutOfHomeCreateCampaign} />
                    <Route path="campaigns/:campaignId/commercial/edit/:commercialId" component={OutOfHomeCommercialScreen} />
                    <Route path="campaigns/:campaignId/commercial/create" component={OutOfHomeCommercialScreen} />
                </Route>`
            );
            break;
        case 7:
            route = (
                `<Route path="event" onEnter={this._hasModuleAccess.bind(this, 7)}>
                    <Route exact path="" component={Event} />
                    <Route path="campaigns" component={EventCampaignList} />
                    <Route path="campaigns/:campaignId" component={EventCampaignDetails} />
                    <Route path="campaigns/campaign/edit/:campaignId" component={EventCreateCampaign} />
                    <Route path="campaign/create" component={EventCreateCampaign} />
                    <Route path="campaigns/:campaignId/commercial/edit/:commercialId" component={EventCommercialScreen} />
                    <Route path="campaigns/:campaignId/commercial/create" component={EventCommercialScreen} />
                </Route>`
            );
            break;
        case 8:
            route = (
                `<Route path="content-marketing" onEnter={this._hasModuleAccess.bind(this, 8)} >
                    <Route exact path="" component={ContentMarketing} />
                    <Route path="campaigns" component={ContentMarketingCampaignList} />
                    <Route path="campaigns/:campaignId" component={ContentMarketingCampaignDetails} />
                    <Route path="campaigns/campaign/edit/:campaignId" component={ContentMarketingCreateCampaign} />
                    <Route path="campaign/create" component={ContentMarketingCreateCampaign} />
                    <Route path="campaigns/:campaignId/commercial/edit/:commercialId" component={ContentMarketingCommercialScreen} />
                    <Route path="campaigns/:campaignId/commercial/create" component={ContentMarketingCommercialScreen} />
                </Route>`
            );
            break;
        case 9:
            route = (
                `<Route path="public-relation" onEnter={this._hasModuleAccess.bind(this, 9)} >
                    <Route exact path="" component={PublicRelation} />
                    <Route path="campaigns" component={PublicRelationCampaignList} />
                    <Route path="campaigns/:campaignId" component={PublicRelationCampaignDetails} />
                    <Route path="campaigns/campaign/edit/:campaignId" component={PublicRelationCreateCampaign} />
                    <Route path="campaign/create" component={PublicRelationCreateCampaign} />
                    <Route path="campaigns/:campaignId/commercial/edit/:commercialId" component={PublicRelationCommercialScreen} />
                    <Route path="campaigns/:campaignId/commercial/create" component={PublicRelationCommercialScreen} />
                </Route>`
            );
            break;

    }
    return route;
}

const routerRoutes = {
    routeFetcher

};

export default routerRoutes;