import { FORGET_PASSWORD, GENERATE_QR_CODE, RESET_PASSWORD, RIGISTER_NEW_USER, USER_LOGIN, VERIFY_OTP, VERIFY_TANENT, VERIFY_USER_EMAIL } from "helpers/url_helper";
import { API_URL } from "./Services";

const baseURL = API_URL.AUTH;

export const AUTH = {
    registerNewUser: {
        method: 'POST',
        url: RIGISTER_NEW_USER,
        baseURL
    },
    verifyUserEmail: {
        method: 'POST',
        url: VERIFY_USER_EMAIL,
        baseURL
    },
    resetPassword: {
        method: 'POST',
        url: RESET_PASSWORD,
        baseURL
    },
    forgetPassword: {
        method: 'POST',
        url: FORGET_PASSWORD,
        baseURL
    },
    signIn: {
        method: 'POST',
        url: USER_LOGIN,
        baseURL
    },
    verifyTanent: {
        method: 'POST',
        url: VERIFY_TANENT,
        baseURL
    },
    getQRCode: {
        method: 'POST',
        url: GENERATE_QR_CODE,
        baseURL
    },
    verifyOTP: {
        method: 'POST',
        url: VERIFY_OTP,
        baseURL
    }
}