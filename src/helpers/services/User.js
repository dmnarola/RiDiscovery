
import { ADD_USER, GET_ALL_USER, UPDATE_USER } from "helpers/url_helper";
import { API_URL } from "./Services";

const baseURL = API_URL.USER;

export const USER = {
    addUser: {
        method: 'POST',
        url: ADD_USER,
        baseURL
    },
    editUser: {
        method: 'PUT',
        url: UPDATE_USER,
        baseURL
    },
    listAllUser: {
        method: 'POST',
        url: GET_ALL_USER,
        baseURL
    },
}