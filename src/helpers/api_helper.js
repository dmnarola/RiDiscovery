import axios from "axios"
import { Toast } from "components/Common/Toaster"
import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
// const token = accessToken

//apply base url for axios

// const API_URL = ""
const API_URL = "http://192.168.1.235:5001/";


// const API_URL = "http://192.168.1.235:5002/";

// Front-End Port
const PORT1 = "3000"; // app.ridiscovery.com // global tenenat
const PORT2 = "3001"; // nisl.ridiscovery.com // main tenenat
const DEFAULT_TANANT = 'nisl';


const axiosApi = axios.create({
  baseURL: API_URL,
})


const token = localStorage.getItem('authUser');

if (token) {
  axiosApi.defaults.headers.common["x-access-token"] = token
}


const successHandler = (response) => {
  console.log('API Success ->', response);
  if (response?.data?.message) {
    Toast.success(response?.data?.message)
  }
  return response;
};

const errorHandler = (error) => {
  console.log("API Error -> Error", error)
  Toast.error(error?.response?.data?.message)
  // return Promise.reject(error?.response);
  return error?.response
};

axiosApi.interceptors.request.use(function (config) {

  const tenantName = location?.host?.split('.')[0];
  const tanant = location?.port === PORT2 ? DEFAULT_TANANT : tenantName

  if (location?.port === PORT2 || (tenantName !== 'app' && location?.port !== PORT1)) {
    config.headers["tenant_id"] = tanant;
  }

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

  // temp
  let finalUrl = url;
  if (['/company/register', '/company/add', '/company/list'].includes(url)) {
    finalUrl = `http://192.168.1.235:5002${url}`
  }

  return axiosApi
    .post(finalUrl, { ...data }, { ...config })
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
