import {
  ADD_AGENCY,
  ADD_AGENCY_SUCCESS,
  ADD_AGENCY_FAIL,
  UPDATE_AGENCY,
  UPDATE_AGENCY_SUCCESS,
  UPDATE_AGENCY_FAIL,
  GET_ALL_AGENCY,
  GET_ALL_AGENCY_SUCCESS,
  GET_ALL_AGENCY_FAIL,
  GET_ALL_DEV_AGENCY,
  GET_ALL_DEV_AGENCY_SUCCESS,
  GET_ALL_DEV_AGENCY_FAIL,
  GET_ALL_SECURITY_AGENCY,
  GET_ALL_SECURITY_AGENCY_SUCCESS,
  GET_ALL_SECURITY_AGENCY_FAIL,
} from "./actionTypes"

export const addAgency = (payload) => {
  return {
    type: ADD_AGENCY,
    payload,
  }
}

export const addAgencySuccess = (data) => {
  return {
    type: ADD_AGENCY_SUCCESS,
    payload: data
  }
}

export const addAgencyFail = (data) => {
  return {
    type: ADD_AGENCY_FAIL,
    payload: data
  }
}


export const updateAgency = (payload) => {
  return {
    type: UPDATE_AGENCY,
    payload,
  }
}

export const updateAgencySuccess = (data) => {
  return {
    type: UPDATE_AGENCY_SUCCESS,
    payload: data
  }
}

export const updateAgencyFail = (data) => {
  return {
    type: UPDATE_AGENCY_FAIL,
    payload: data
  }
}

export const getAllAgency = (payload) => {
  return {
    type: GET_ALL_AGENCY,
    payload,
  }
}

export const getAllAgencySuccess = (data) => {
  return {
    type: GET_ALL_AGENCY_SUCCESS,
    payload: data
  }
}

export const getAllAgencyFail = (data) => {
  return {
    type: GET_ALL_AGENCY_FAIL,
    payload: data
  }
}

export const getAllDevAgency = (payload) => {
  return {
    type: GET_ALL_DEV_AGENCY,
    payload,
  }
}

export const getAllDevAgencySuccess = (data) => {
  return {
    type: GET_ALL_DEV_AGENCY_SUCCESS,
    payload: data
  }
}

export const getAllDevAgencyFail = (data) => {
  return {
    type: GET_ALL_DEV_AGENCY_FAIL,
    payload: data
  }
}

export const getAllSecurityAgency = (payload) => {
  return {
    type: GET_ALL_SECURITY_AGENCY,
    payload,
  }
}

export const getAllSecurityAgencySuccess = (data) => {
  return {
    type: GET_ALL_SECURITY_AGENCY_SUCCESS,
    payload: data
  }
}

export const getAllSecurityAgencyFail = (data) => {
  return {
    type: GET_ALL_SECURITY_AGENCY_FAIL,
    payload: data
  }
}
