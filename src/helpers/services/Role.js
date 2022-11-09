
import { GET_ROLE, GET_ROLE_PERMISSIONS, } from "helpers/url_helper";
import { API_URL } from "./Services";

const baseURL = API_URL.ROLE;

export const ROLE = {
    getPermissions: {
        method: 'GET',
        url: GET_ROLE_PERMISSIONS,
        baseURL
    },
    getRoles: {
        method: 'GET',
        url: GET_ROLE,
        baseURL
    }

}