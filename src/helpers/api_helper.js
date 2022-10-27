import axios from "axios"
import { Toast } from "components/Common/Toaster"
import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
// const token = accessToken

//apply base url for axios

// const API_URL = ""
const API_URL = "http://192.168.1.235:5001/"

const axiosApi = axios.create({
  baseURL: API_URL,
})


// axiosApi.defaults.headers.common["Authorization"] = token


const token = localStorage.getItem('authUser');

if (token) {
  axiosApi.defaults.headers.common["Authorization"] = token
}


const successHandler = (response) => {
  console.log('API Success ->', response);
  Toast.success(response?.data?.message)
  return response;
};

const errorHandler = (error) => {
  console.log("API Error -> Error", error)
  Toast.error(error?.response?.data?.message)
  // return Promise.reject(error?.response);
  return error?.response
};

axiosApi.interceptors.request.use(function (config) {
  config.headers["tenant_id"] = 1;
  return config;
});

axiosApi.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
)

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
