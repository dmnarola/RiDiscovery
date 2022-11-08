import { ADD_COMPANY, COMPANY_ON_BOARDING, EDIT_COMPANY, GET_ALL_COMPANY } from "helpers/url_helper";
import { API_URL } from "./Services";

const baseURL = API_URL.COMPANY;

export const COMPANY = {
    addCompany: {
        method: 'POST',
        url: ADD_COMPANY,
        baseURL
    },
    editCompany: {
        method: 'PUT',
        url: EDIT_COMPANY,
        baseURL
    },
    listAllCompany: {
        method: 'POST',
        url: GET_ALL_COMPANY,
        baseURL
    },
    onBoardCompany: {
        method: 'POST',
        url: COMPANY_ON_BOARDING,
        baseURL
    }
}