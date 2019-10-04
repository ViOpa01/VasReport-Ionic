import { environment } from "../../environments/environment.prod";

const  BASE_URL = environment.production ? "http://197.253.19.76:6200/api/v1" : "http://197.253.19.76:6200/api/v1";
const auth = `${BASE_URL}/auth`;
const summary = `${BASE_URL}/summary`;
const summary_V2 = `${BASE_URL}/transaction/dashboard`;

const top5 = `${BASE_URL}/transaction/top5`;
export const Endpoint = {
    AUTH: {
        login: `${auth}/login`,
        logout: `${auth}/logout`,
    },

    
    SUMMARY: {
        successful:  `${summary}/`,
        failed:  `${summary}/`,
    },

     
    SUMMARY_V2: {
        url:  `${summary_V2}/`,
    },

    
    TOP5: {
        PRODUCT:  `${top5}/product/`,
        CHANNEL:  `${top5}/channel/`,
        PAYMENT:  `${top5}/payment/`,
    },

    BASE_URL: {
        base: `${BASE_URL}/`
    },
    TRANSACTION: {
        transaction: `${BASE_URL}/transaction/details`
    },
    
    REVERSED: {
        REVERSED: `${BASE_URL}/transaction/reversed`
    },
    TRANSACTION_SUMMARY: {
        transaction_summary: `${BASE_URL}/transaction/details/summary`
    },

    SERVICE_STATUS : {
        SWITCH: 'http://197.253.19.75:8029/service/status/'
    }


}