// function campaignsList(parentRoute) {
//     return {
//         path: `${parentRoute}-campaign-list`,
//         label: "Campaigns List",
//         active: false
//     };
// }

function pathObjectBuilder(path, label, active, id) {
    return {
        path: path,
        label: label,
        active: active,
        [id]: null
    };
}



function pathFetcher(routeObj) {
    let pathArray = null;
    const parentModuleName = routeObj.routeParentName,
        pathName = routeObj.routeName;
    const DM = "digital-marketing",
        PM = "print-media",
        RADIO = "radio",
        OH = "out-of-home",
        TV = "television",
        EV = "event",
        CM = "content-marketing",
        PR = "public-relation",
        SM = "sms-marketing",
        EM = "email-marketing",
        ET = "email-template";

    switch (parentModuleName) {
        case "digitalMarketing":
            switch (pathName) {
                case "digitalMarketingPath":
                    pathArray = [
                        pathObjectBuilder("", "Digital Advertising", true, "")
                    ];
                    break;
                case "campaignsListPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${DM}`, "Digital Advertising", false, ""),
                        pathObjectBuilder("", "Campaigns List", true, "")
                    ];
                    break;
                case "campaignDetailsPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${DM}`, "Digital Advertising", false, ""),
                        pathObjectBuilder(`${DM}-campaign-list`, "Campaigns List", false, ""),
                        pathObjectBuilder("", "Campaign Details", true, "id")
                    ];
                    break;
                case "campaignCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${DM}`, "Digital Advertising", false, ""),
                        pathObjectBuilder("", "Create Campaign", true, "")
                    ];
                    break;
                case "campaignEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${DM}`, "Digital Advertising", false, ""),
                        pathObjectBuilder("", "Edit Campaign", true, "id")
                    ];
                    break;
                case "commercialEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${DM}`, "Digital Advertising", false, ""),
                        pathObjectBuilder(`${DM}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${DM}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Edit Commercial", true, "id")
                    ];
                    break;
                case "commercialCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${DM}`, "Digital Advertising", false, ""),
                        pathObjectBuilder(`${DM}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${DM}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Create Commercial", true, "")
                    ];
                    break;
            }
            break;
        case "printMedia":
            switch (pathName) {
                case "printMediaPath":
                    pathArray = [
                        pathObjectBuilder("", "Print Media", true, "")
                    ];
                    break;
                case "campaignsListPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${PM}`, "Print Media", false, ""),
                        pathObjectBuilder("", "Campaigns List", true, "")
                    ];
                    break;
                case "campaignDetailsPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${PM}`, "Print Media", false, ""),
                        pathObjectBuilder(`${PM}-campaign-list`, "Campaigns List", false, ""),
                        pathObjectBuilder("", "Campaign Details", true, "id")
                    ];
                    break;
                case "campaignCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${PM}`, "Print Media", false, ""),
                        pathObjectBuilder("", "Create Campaign", true, "")
                    ];
                    break;
                case "campaignEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${PM}`, "Print Media", false, ""),
                        pathObjectBuilder("", "Edit Campaign", true, "id")
                    ];
                    break;
                case "commercialEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${PM}`, "Print Media", false, ""),
                        pathObjectBuilder(`${PM}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${PM}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Edit Commercial", true, "id")
                    ];
                    break;
                case "commercialCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${PM}`, "Print Media", false, ""),
                        pathObjectBuilder(`${PM}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${PM}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Create Commercial", true, "")
                    ];
                    break;
            }
            break;

        case "radio":
            switch (pathName) {
                case "radioPath":
                    pathArray = [
                        pathObjectBuilder("", "Radio", true, "")
                    ];
                    break;
                case "campaignsListPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${RADIO}`, "Radio", false, ""),
                        pathObjectBuilder("", "Campaigns List", true, "")
                    ];
                    break;
                case "campaignDetailsPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${RADIO}`, "Radio", false, ""),
                        pathObjectBuilder(`${RADIO}-campaign-list`, "Campaigns List", false, ""),
                        pathObjectBuilder("", "Campaign Details", true, "id")
                    ];
                    break;
                case "campaignCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${RADIO}`, "Radio", false, ""),
                        pathObjectBuilder("", "Create Campaign", true, "")
                    ];
                    break;
                case "campaignEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${RADIO}`, "Radio", false, ""),
                        pathObjectBuilder("", "Edit Campaign", true, "id")
                    ];
                    break;
                case "commercialEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${RADIO}`, "Radio", false, ""),
                        pathObjectBuilder(`${RADIO}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${RADIO}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Edit Commercial", true, "id")
                    ];
                    break;
                case "commercialCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${RADIO}`, "Radio", false, ""),
                        pathObjectBuilder(`${RADIO}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${RADIO}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Create Commercial", true, "")
                    ];
                    break;
            }
            break;

        case "television":
            switch (pathName) {
                case "televisionPath":
                    pathArray = [
                        pathObjectBuilder("", "Tv", true, "")
                    ];
                    break;
                case "campaignsListPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${TV}`, "Tv", false, ""),
                        pathObjectBuilder("", "Campaigns List", true, "")
                    ];
                    break;
                case "campaignDetailsPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${TV}`, "Tv", false, ""),
                        pathObjectBuilder(`${TV}-campaign-list`, "Campaigns List", false, ""),
                        pathObjectBuilder("", "Campaign Details", true, "id")
                    ];
                    break;
                case "campaignCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${TV}`, "Tv", false, ""),
                        pathObjectBuilder("", "Create Campaign", true, "")
                    ];
                    break;
                case "campaignEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${TV}`, "Tv", false, ""),
                        pathObjectBuilder("", "Edit Campaign", true, "id")
                    ];
                    break;
                case "commercialEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${TV}`, "Tv", false, ""),
                        pathObjectBuilder(`${TV}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${TV}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Edit Commercial", true, "id")
                    ];
                    break;
                case "commercialCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${TV}`, "Tv", false, ""),
                        pathObjectBuilder(`${TV}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${TV}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Create Commercial", true, "")
                    ];
                    break;
            }
            break;

        case "outOfHome":
            switch (pathName) {
                case "outOfHomePath":
                    pathArray = [
                        pathObjectBuilder("", "OOH", true, "")
                    ];
                    break;
                case "campaignsListPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${OH}`, "OOH", false, ""),
                        pathObjectBuilder("", "Campaigns List", true, "")
                    ];
                    break;
                case "campaignDetailsPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${OH}`, "OOH", false, ""),
                        pathObjectBuilder(`${OH}-campaign-list`, "Campaigns List", false, ""),
                        pathObjectBuilder("", "Campaign Details", true, "id")
                    ];
                    break;
                case "campaignCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${OH}`, "OOH", false, ""),
                        pathObjectBuilder("", "Create Campaign", true, "")
                    ];
                    break;
                case "campaignEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${OH}`, "OOH", false, ""),
                        pathObjectBuilder("", "Edit Campaign", true, "id")
                    ];
                    break;
                case "commercialEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${OH}`, "OOH", false, ""),
                        pathObjectBuilder(`${OH}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${OH}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Edit Commercial", true, "id")
                    ];
                    break;
                case "commercialCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${OH}`, "OOH", false, ""),
                        pathObjectBuilder(`${OH}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${OH}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Create Commercial", true, "")
                    ];
                    break;
            }
            break;
        case "event":
            switch (pathName) {
                case "eventPath":
                    pathArray = [
                        pathObjectBuilder("", "Event", true, "")
                    ];
                    break;
                case "campaignsListPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${EV}`, "Event", false, ""),
                        pathObjectBuilder("", "Campaigns List", true, "")
                    ];
                    break;
                case "campaignDetailsPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${EV}`, "Event", false, ""),
                        pathObjectBuilder(`${EV}-campaign-list`, "Campaigns List", false, ""),
                        pathObjectBuilder("", "Campaign Details", true, "id")
                    ];
                    break;
                case "campaignCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${EV}`, "Event", false, ""),
                        pathObjectBuilder("", "Create Campaign", true, "")
                    ];
                    break;
                case "campaignEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${EV}`, "Event", false, ""),
                        pathObjectBuilder("", "Edit Campaign", true, "id")
                    ];
                    break;
                case "commercialEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${EV}`, "Event", false, ""),
                        pathObjectBuilder(`${EV}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${EV}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Edit Commercial", true, "id")
                    ];
                    break;
                case "commercialCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${EV}`, "Event", false, ""),
                        pathObjectBuilder(`${EV}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${EV}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Create Commercial", true, "")
                    ];
                    break;
            }
            break;
        case "contentMarketing":
            switch (pathName) {
                case "contentMarketingPath":
                    pathArray = [
                        pathObjectBuilder("", "Content Marketing", true, "")
                    ];
                    break;
                case "campaignsListPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${CM}`, "Content Marketing", false, ""),
                        pathObjectBuilder("", "Campaigns List", true, "")
                    ];
                    break;
                case "campaignDetailsPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${CM}`, "Content Marketing", false, ""),
                        pathObjectBuilder(`${CM}-campaign-list`, "Campaigns List", false, ""),
                        pathObjectBuilder("", "Campaign Details", true, "id")
                    ];
                    break;
                case "campaignCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${CM}`, "Content Marketing", false, ""),
                        pathObjectBuilder("", "Create Campaign", true, "")
                    ];
                    break;
                case "campaignEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${CM}`, "Content Marketing", false, ""),
                        pathObjectBuilder("", "Edit Campaign", true, "id")
                    ];
                    break;
                case "commercialEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${CM}`, "Content Marketing", false, ""),
                        pathObjectBuilder(`${CM}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${CM}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Edit Commercial", true, "id")
                    ];
                    break;
                case "commercialCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${CM}`, "Content Marketing", false, ""),
                        pathObjectBuilder(`${CM}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${CM}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Create Commercial", true, "")
                    ];
                    break;
            }
            break;
        case "publicRelation":
            switch (pathName) {
                case "publicRelationPath":
                    pathArray = [
                        pathObjectBuilder("", "PR", true, "")
                    ];
                    break;
                case "campaignsListPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${PR}`, "PR", false, ""),
                        pathObjectBuilder("", "Campaigns List", true, "")
                    ];
                    break;
                case "campaignDetailsPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${PR}`, "PR", false, ""),
                        pathObjectBuilder(`${PR}-campaign-list`, "Campaigns List", false, ""),
                        pathObjectBuilder("", "Campaign Details", true, "id")
                    ];
                    break;
                case "campaignCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${PR}`, "PR", false, ""),
                        pathObjectBuilder("", "Create Campaign", true, "")
                    ];
                    break;
                case "campaignEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${PR}`, "PR", false, ""),
                        pathObjectBuilder("", "Edit Campaign", true, "id")
                    ];
                    break;
                case "commercialEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${PR}`, "PR", false, ""),
                        pathObjectBuilder(`${PR}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${PR}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Edit Commercial", true, "id")
                    ];
                    break;
                case "commercialCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${PR}`, "PR", false, ""),
                        pathObjectBuilder(`${PR}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${PR}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Create Commercial", true, "")
                    ];
                    break;
            }
            break;
        case "smsMarketing":
            switch (pathName) {
                case "smsMarketingPath":
                    pathArray = [
                        pathObjectBuilder("", "SMS Marketing", true, "")
                    ];
                    break;
                case "campaignsListPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${SM}`, "SMS Marketing", false, ""),
                        pathObjectBuilder("", "Campaigns List", true, "")
                    ];
                    break;
                case "campaignDetailsPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${SM}`, "SMS Marketing", false, ""),
                        pathObjectBuilder(`${SM}-campaign-list`, "Campaigns List", false, ""),
                        pathObjectBuilder("", "Campaign Details", true, "id")
                    ];
                    break;
                case "campaignCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${SM}`, "SMS Marketing", false, ""),
                        pathObjectBuilder("", "Create Campaign", true, "")
                    ];
                    break;
                case "campaignEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${SM}`, "SMS Marketing", false, ""),
                        pathObjectBuilder("", "Edit Campaign", true, "id")
                    ];
                    break;
                case "commercialEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${SM}`, "SMS Marketing", false, ""),
                        pathObjectBuilder(`${SM}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${SM}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Edit Commercial", true, "id")
                    ];
                    break;
                case "commercialCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${SM}`, "SMS Marketing", false, ""),
                        pathObjectBuilder(`${SM}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${SM}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Create Commercial", true, "")
                    ];
                    break;
                case "messageCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${SM}`, "SMS Marketing", false, ""),
                        pathObjectBuilder(`${SM}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${SM}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Create Message", true, "")
                    ];
                    break;
                case "messageEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${SM}`, "SMS Marketing", false, ""),
                        pathObjectBuilder(`${SM}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${SM}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Edit Message", true, "id")
                    ];
                    break;
            }
            break;

        case "emailMarketing":
            switch (pathName) {
                case "emailMarketingPath":
                    pathArray = [
                        pathObjectBuilder("", "Email Marketing", true, "")
                    ];
                    break;
                case "campaignsListPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${EM}`, "Email Marketing", false, ""),
                        pathObjectBuilder("", "Campaigns List", true, "")
                    ];
                    break;
                case "campaignDetailsPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${EM}`, "Email Marketing", false, ""),
                        pathObjectBuilder(`${EM}-campaign-list`, "Campaigns List", false, ""),
                        pathObjectBuilder("", "Campaign Details", true, "id")
                    ];
                    break;
                case "campaignCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${EM}`, "Email Marketing", false, ""),
                        pathObjectBuilder("", "Create Campaign", true, "")
                    ];
                    break;
                case "campaignEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${EM}`, "Email Marketing", false, ""),
                        pathObjectBuilder("", "Edit Campaign", true, "id")
                    ];
                    break;
                case "commercialEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${EM}`, "Email Marketing", false, ""),
                        pathObjectBuilder(`${EM}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${EM}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Edit Commercial", true, "id")
                    ];
                    break;
                case "commercialCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${EM}`, "Email Marketing", false, ""),
                        pathObjectBuilder(`${EM}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${EM}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Create Commercial", true, "")
                    ];
                    break;
                case "emailerCreatePath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${EM}`, "Email Marketing", false, ""),
                        pathObjectBuilder(`${EM}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${EM}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Create Emailer", true, "")
                    ];
                    break;
                case "emailerEditPath":
                    pathArray = [
                        pathObjectBuilder(`dashboard-plan-${EM}`, "Email Marketing", false, ""),
                        pathObjectBuilder(`${EM}-campaign-list`, "Campaign List", false, ""),
                        pathObjectBuilder(`${EM}-campaign-details`, "Campaign Details", false, "id"),
                        pathObjectBuilder("", "Edit Emailer", true, "id")
                    ];
                    break;
            }
            break;

        case "contactModule":
            switch (pathName) {
                case "contactModulePath":
                    pathArray = [
                        pathObjectBuilder("", "Contacts", true, "")
                    ];
                    break;
                case "contactCreatePath":
                    pathArray = [
                        pathObjectBuilder("dashboard-contact-module-contact-list", "Contacts", false, ""),
                        pathObjectBuilder("", "Create Contact", true, "")
                    ];
                    break;
                case "contactDetailsPath":
                    pathArray = [
                        pathObjectBuilder("dashboard-contact-module-contact-list", "Contacts", false, ""),
                        pathObjectBuilder("", "Contact Details", true, "")
                    ];
                    break;
                case "importContactPath":
                    pathArray = [
                        pathObjectBuilder("dashboard-contact-module-contact-list", "Contacts", false, ""),
                        pathObjectBuilder("", "Import Contact", true, "")
                    ];
                    break;
            }
            break;

        case "contactGroupModule":
            switch (pathName) {
                case "contactGroupModulePath":
                    pathArray = [
                        pathObjectBuilder("", "List Management", true, "")
                    ];
                    break;
                case "contactGroupDetailsPath":
                    pathArray = [
                        pathObjectBuilder("dashboard-contact-module-list-management-list", "List Management", false, ""),
                        pathObjectBuilder("", "List Detail", true, "")
                    ];
                    break;
                case "contactGroupAddContactPath":
                    pathArray = [
                        pathObjectBuilder("dashboard-contact-module-list-management-list", "List Management", false, ""),
                        pathObjectBuilder("dashboard-contact-module-list-management-details", "List Details", false, "id"),
                        pathObjectBuilder("", "Add Contact", true, "")
                    ];
                    break;
                case "importContactInContactGroupPath":
                    pathArray = [
                        pathObjectBuilder("dashboard-contact-module-list-management-list", "List Management", false, ""),
                        pathObjectBuilder("dashboard-contact-module-list-management-details", "List Details", false, "id"),
                        pathObjectBuilder("", "Import Contact", true, "")
                    ];
                    break;
            }
            break;

        case "emailTemplate":
            switch (pathName) {
                case "emailTemplateModulePath":
                    pathArray = [
                        pathObjectBuilder("", "Email Template", true, "")
                    ];
                    break;
                case "emailTemplateCreateTemplatePath":
                    pathArray = [
                        pathObjectBuilder("dashboard-email-template", "Email Template", false, ""),
                        pathObjectBuilder("", "Create Email Template", true, "")
                    ];
                    break;
                case "emailTemplateEditTemplatePath":
                    pathArray = [
                        pathObjectBuilder("dashboard-email-template", "Email Template", false, ""),
                        pathObjectBuilder("", "Edit Email Template", true, "")
                    ];
                    break;
            }
            break;
    }
    return pathArray;
}


// const digitalMarketingPath = [{
//     label: "Digital Advertising",
//     active: true
// }];

// const campaignsListPath = [{
//     path: "dashboard-plan-digital-marketing",
//     label: "Digital Advertising",
//     active: false
// }, {
//     label: "Campaigns List",
//     active: true
// }];

// const campaignDetailsPath = [{
//     path: "dashboard-plan-digital-marketing",
//     label: "Digital Advertising",
//     active: false
// }, {
//     path: "digital-marketing-campaign-list",
//     label: "Campaigns List",
//     active: false
// }, {
//     active: true,
//     label: "Campaign Details",
//     id: null
// }];

// const campaignCreatePath = [{
//     path: "dashboard-plan-digital-marketing",
//     label: "Digital Advertising",
//     active: false
// }, {
//     label: "Create Campaign",
//     active: true
// }];

// const campaignEditPath = [{
//     path: "dashboard-plan-digital-marketing",
//     label: "Digital Advertising",
//     active: false
// }, {
//     label: "Edit Campaign",
//     id: null,
//     active: true
// }];

// const commercialEditPath = [{
//     path: "dashboard-plan-digital-marketing",
//     label: "Digital Advertising",
//     active: false
// }, {
//     path: "digital-marketing-campaign-list",
//     label: "Campaigns List",
//     active: false
// }, {
//     path: "digital-marketing-campaign-details",
//     label: "Campaign Details",
//     id: null,
//     active: false
// }, {
//     active: true,
//     label: "Commercial"
// }];

// const commercialCreatePath = [{
//     path: "dashboard-plan-digital-marketing",
//     label: "Digital Advertising",
//     active: false
// }, {
//     path: "digital-marketing-campaign-list",
//     label: "Campaigns List",
//     active: false
// }, {
//     path: "digital-marketing-campaign-details",
//     label: "Campaign Details",
//     id: null,
//     active: false
// }, {
//     active: true,
//     label: "Commercial"
// }];



const breadcrumb = {
    // digitalMarketingPath,
    // campaignsListPath,
    // campaignDetailsPath,
    // campaignEditPath,
    // commercialEditPath,
    // commercialCreatePath,
    // campaignCreatePath,
    pathFetcher

};

export default breadcrumb;