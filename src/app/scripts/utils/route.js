//import { hashHistory } from "react-router";
import history from '../../history';
const DIGITAL_MARKETING_CAMPAIGN = "dashboard/plan/digital-marketing/campaigns";
const PRINT_MEDIA_CAMPAIGN = "dashboard/plan/print-media/campaigns";
const RADIO_CAMPAIGN = "dashboard/plan/radio/campaigns";
const TELEVISION_CAMPAIGN = "dashboard/plan/television/campaigns";
const OUT_OF_HOME_CAMPAIGN = "dashboard/plan/out-of-home/campaigns";
const EVENT_CAMPAIGN = "dashboard/plan/event/campaigns";
const CONTENT_CAMPAIGN = "dashboard/plan/content-marketing/campaigns";
const PUBLIC_RELATION = "dashboard/plan/public-relation/campaigns";
const SMS_MARKETING = "dashboard/plan/sms-marketing/campaigns";
const EMAIL_MARKETING = "dashboard/plan/email-marketing/campaigns";

// const DIGITAL_MARKETING = "dashboard/plan/digital-marketing";
const ADMIN_ORG = "/admin/org";

export const SCREENS = {
    "default": "/",
    "login": "/login",
    "registration": "/registration",
    "thank-you": "/thank-you",
    "reset-password-request":"/reset-password-request",
    "resend-link": "/resend-link",
    "forget-password": "/forget-password",
    "dashboard": "/dashboard",
    "dashboard-profile": "/dashboard/my-profile",
    "dashboard-profile-edit": "/dashboard/my-profile-edit",
    "dashboard-lead": "/dashboard/lead",
    "dashboard-performance": "/dashboard/performance",
    "dashboard-notifications": "/dashboard/notifications",
    "dashboard-media-library": "/dashboard/media-library",
    "dashboard-email-template": "/dashboard/email-template",
    "dashboard-email-template-create-template": "/dashboard/email-template/template/create",
    "dashboard-email-template-edit-template": "/dashboard/email-template/template/edit/__entityId",
    "dashboard-home": "/dashboard/home",
    "dashboard-reset-password": "/dashboard/reset-password",
    "dashboard-master-setting": "/dashboard/master-setting",
    "super-admin-login":"/super-admin/login",
    "super-admin-organizations":"/super-admin/organizations",

    "dashboard-plan-digital-marketing": "dashboard/plan/digital-marketing",
    "digital-marketing-campaign-list": `${DIGITAL_MARKETING_CAMPAIGN}`,
    "digital-marketing-campaign-details": `${DIGITAL_MARKETING_CAMPAIGN}/__entityId`,
    "digital-marketing-campaign-edit": `${DIGITAL_MARKETING_CAMPAIGN}/campaign/edit/__entityId`,
    "digital-marketing-campaign-create": "dashboard/plan/digital-marketing/campaign/create",
    "digital-marketing-commercial-create": `${DIGITAL_MARKETING_CAMPAIGN}/__entityId/commercial/create`,
    "digital-marketing-commercial-edit": `${DIGITAL_MARKETING_CAMPAIGN}/__entityId0/commercial/edit/__entityId1`,

    "dashboard-plan-print-media": "dashboard/plan/print-media",
    "print-media-campaign-list": `${PRINT_MEDIA_CAMPAIGN}`,
    "print-media-campaign-details": `${PRINT_MEDIA_CAMPAIGN}/__entityId`,
    "print-media-campaign-edit": `${PRINT_MEDIA_CAMPAIGN}/campaign/edit/__entityId`,
    "print-media-campaign-create": "dashboard/plan/print-media/campaign/create",
    "print-media-commercial-create": `${PRINT_MEDIA_CAMPAIGN}/__entityId/commercial/create`,
    "print-media-commercial-edit": `${PRINT_MEDIA_CAMPAIGN}/__entityId0/commercial/edit/__entityId1`,

    "dashboard-plan-radio": "dashboard/plan/radio",
    "radio-campaign-list": `${RADIO_CAMPAIGN}`,
    "radio-campaign-details": `${RADIO_CAMPAIGN}/__entityId`,
    "radio-campaign-edit": `${RADIO_CAMPAIGN}/campaign/edit/__entityId`,
    "radio-campaign-create": "dashboard/plan/radio/campaign/create",
    "radio-commercial-create": `${RADIO_CAMPAIGN}/__entityId/commercial/create`,
    "radio-commercial-edit": `${RADIO_CAMPAIGN}/__entityId0/commercial/edit/__entityId1`,

    "dashboard-plan-television": "dashboard/plan/television",
    "television-campaign-list": `${TELEVISION_CAMPAIGN}`,
    "television-campaign-details": `${TELEVISION_CAMPAIGN}/__entityId`,
    "television-campaign-edit": `${TELEVISION_CAMPAIGN}/campaign/edit/__entityId`,
    "television-campaign-create": "dashboard/plan/television/campaign/create",
    "television-commercial-create": `${TELEVISION_CAMPAIGN}/__entityId/commercial/create`,
    "television-commercial-edit": `${TELEVISION_CAMPAIGN}/__entityId0/commercial/edit/__entityId1`,

    "dashboard-plan-out-of-home": "dashboard/plan/out-of-home",
    "out-of-home-campaign-list": `${OUT_OF_HOME_CAMPAIGN}`,
    "out-of-home-campaign-details": `${OUT_OF_HOME_CAMPAIGN}/__entityId`,
    "out-of-home-campaign-edit": `${OUT_OF_HOME_CAMPAIGN}/campaign/edit/__entityId`,
    "out-of-home-campaign-create": "dashboard/plan/out-of-home/campaign/create",
    "out-of-home-commercial-create": `${OUT_OF_HOME_CAMPAIGN}/__entityId/commercial/create`,
    "out-of-home-commercial-edit": `${OUT_OF_HOME_CAMPAIGN}/__entityId0/commercial/edit/__entityId1`,

    "dashboard-plan-event": "dashboard/plan/event",
    "event-campaign-list": `${EVENT_CAMPAIGN}`,
    "event-campaign-details": `${EVENT_CAMPAIGN}/__entityId`,
    "event-campaign-edit": `${EVENT_CAMPAIGN}/campaign/edit/__entityId`,
    "event-campaign-create": "dashboard/plan/event/campaign/create",
    "event-commercial-create": `${EVENT_CAMPAIGN}/__entityId/commercial/create`,
    "event-commercial-edit": `${EVENT_CAMPAIGN}/__entityId0/commercial/edit/__entityId1`,

    "dashboard-plan-content-marketing": "dashboard/plan/content-marketing",
    "content-marketing-campaign-list": `${CONTENT_CAMPAIGN}`,
    "content-marketing-campaign-details": `${CONTENT_CAMPAIGN}/__entityId`,
    "content-marketing-campaign-edit": `${CONTENT_CAMPAIGN}/campaign/edit/__entityId`,
    "content-marketing-campaign-create": "dashboard/plan/content-marketing/campaign/create",
    "content-marketing-commercial-create": `${CONTENT_CAMPAIGN}/__entityId/commercial/create`,
    "content-marketing-commercial-edit": `${CONTENT_CAMPAIGN}/__entityId0/commercial/edit/__entityId1`,

    "dashboard-plan-public-relation": "dashboard/plan/public-relation",
    "public-relation-campaign-list": `${PUBLIC_RELATION}`,
    "public-relation-campaign-details": `${PUBLIC_RELATION}/__entityId`,
    "public-relation-campaign-edit": `${PUBLIC_RELATION}/campaign/edit/__entityId`,
    "public-relation-campaign-create": "dashboard/plan/public-relation/campaign/create",
    "public-relation-commercial-create": `${PUBLIC_RELATION}/__entityId/commercial/create`,
    "public-relation-commercial-edit": `${PUBLIC_RELATION}/__entityId0/commercial/edit/__entityId1`,

    "dashboard-plan-sms-marketing": "dashboard/plan/sms-marketing",
    "sms-marketing-campaign-list": `${SMS_MARKETING}`,
    "sms-marketing-campaign-details": `${SMS_MARKETING}/__entityId`,
    "sms-marketing-campaign-edit": `${SMS_MARKETING}/campaign/edit/__entityId`,
    "sms-marketing-campaign-create": "dashboard/plan/sms-marketing/campaign/create",
    "sms-marketing-commercial-create": `${SMS_MARKETING}/__entityId/commercial/create`,
    "sms-marketing-commercial-edit": `${SMS_MARKETING}/__entityId0/commercial/edit/__entityId1`,

    "sms-marketing-edit-sms": "dashboard/plan/sms-marketing/campaigns/__entityId0/sms/edit/__entityId1",
    "sms-marketing-create-sms": "dashboard/plan/sms-marketing/campaigns/__entityId/sms/create",

    "dashboard-plan-email-marketing": "dashboard/plan/email-marketing",
    "email-marketing-campaign-list": `${EMAIL_MARKETING}`,
    "email-marketing-campaign-details": `${EMAIL_MARKETING}/__entityId`,
    "email-marketing-campaign-edit": `${EMAIL_MARKETING}/campaign/edit/__entityId`,
    "email-marketing-campaign-create": "dashboard/plan/email-marketing/campaign/create",
    "email-marketing-commercial-create": `${EMAIL_MARKETING}/__entityId/commercial/create`,
    "email-marketing-commercial-edit": `${EMAIL_MARKETING}/__entityId0/commercial/edit/__entityId1`,

    "email-marketing-edit-emailer": "dashboard/plan/email-marketing/campaigns/__entityId0/emailer/edit/__entityId1",
    "email-marketing-create-emailer": "dashboard/plan/email-marketing/campaigns/__entityId/emailer/create",

    "dashboard-contact-module-contact-create": "dashboard/contact-module/contact/create",
    "dashboard-contact-module-contact-list": "dashboard/contact-module/contact/list",
    "dashboard-contact-module-contact-details": "dashboard/contact-module/contact/__entityId",
    "dashboard-contact-module-contact-import": "dashboard/contact-module/contact/import",

    "dashboard-contact-module-list-management-create": "dashboard/contact-module/list-management/create",
    "dashboard-contact-module-list-management-list": "dashboard/contact-module/list-management/list",
    "dashboard-contact-module-list-management-details": "dashboard/contact-module/list-management/__entityId",
    "dashboard-contact-module-list-management-add-contact": "dashboard/contact-module/list-management/__entityId/contact/create",
    "dashboard-contact-module-list-management-import-contact": "dashboard/contact-module/list-management/__entityId/contact/import",
    "dashboard-contact-module-list-management-edit": "dashboard/contact-module/list-management/edit/__entityId",


    "admin-org-profile": `${ADMIN_ORG}/profile`,
    "admin-org-profile-edit": `${ADMIN_ORG}/profile-edit`,
    "admin-org-access-control": `${ADMIN_ORG}/access-control`,
    "admin-org-user": `${ADMIN_ORG}/users`,
    "admin-user-mgmt-roles": "/admin/userMgmt/roles",
    "admin-user-mgmt-permission": "/admin/userMgmt/permission",
    "admin-billing-licence": "/admin/billing/licence",
    "admin-billing-upgrade": "/admin/billing/upgrade",
    "admin-billing-payment": "/admin/billing/payment",
    "admin-billing-invoice": "/admin/billing/invoice",
    "admin-customization": "/admin/customization",
    "admin-template": "/admin/template",
    "admin-support": "/admin/support",
    "admin-smtp": "/admin/smtp",
    "admin-general-setting": "/admin/general-setting",
    "admin-tracking-code": "/admin/tracking-code",
    "admin-tracking-tools": "/admin/tracking-tools",
    "admin-tracking-utm-criteria": "/admin/tracking/utm-criteria",
    "admin-senders-set-sender-id": "/admin/senders/set-sender-id",
    "admin-senders-sender-email": "/admin/senders/sender-email",
    "admin-senders-domain": "/admin/senders/domain",

    "optOut": " /opt-out",
    "sms-opt-out": "/sms-opt-out",
    "email-opt-out": "/email-opt-out",
    "email-verification":"/email-verification"

};


function _getRoute(screenName, entityIds) {
    let viewPath = SCREENS[screenName];

    if (viewPath.includes("__entityId")) {
        if (Array.isArray(entityIds)) {
            entityIds.forEach((eId, index) => {
                const entityName = `__entityId${index}`;
                viewPath = viewPath.replace(entityName, eId);
            });
        } else {
            viewPath = viewPath.replace("__entityId", entityIds);
        }
    }
    return viewPath;
}

export function getPath(screenName, entityIds) {
    return _getRoute(screenName, entityIds);
}

export function navigate(screenName, entityId) {
    // let route = SCREENS[screenName];

    // if (route.includes("__entityId") && entityId) {
    //     route = route.replace("__entityId", entityId);
    // }

    const route = _getRoute(screenName, entityId);

    if (route) {
        history.push(route);
    }
}