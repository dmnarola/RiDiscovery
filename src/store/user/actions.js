import {
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,

  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,

  ACTIVE_DEACTIVE_USER,
  ACTIVE_DEACTIVE_USER_SUCCESS,
  ACTIVE_DEACTIVE_USER_FAIL,

  GET_ALL_USER,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAIL,

} from "./actionTypes"

export const addUser = (payload) => {
  return {
    type: ADD_USER,
    payload,
  }
}

export const addUserSuccess = (data) => {
  return {
    type: ADD_USER_SUCCESS,
    payload: data
  }
}

export const addUserFail = (data) => {
  return {
    type: ADD_USER_FAIL,
    payload: data
  }
}

export const updateUser = (payload) => {
  return {
    type: UPDATE_USER,
    payload,
  }
}

export const updateUserSuccess = (data) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: data
  }
}

export const updateUserFail = (data) => {
  return {
    type: UPDATE_USER_FAIL,
    payload: data
  }
}

export const getAllUser = (payload) => {
  return {
    type: GET_ALL_USER,
    payload,
  }
}

export const getAllUserSuccess = (data) => {
  return {
    type: GET_ALL_USER_SUCCESS,
    payload: data
  }
}

export const getAllUserFail = (data) => {
  return {
    type: GET_ALL_USER_FAIL,
    payload: data
  }
}


export const activeDectiveUser = (payload) => {
  return {
    type: ACTIVE_DEACTIVE_USER,
    payload,
  }
}

export const activeDectiveUserSuccess = (data) => {
  return {
    type: ACTIVE_DEACTIVE_USER_SUCCESS,
    payload: data
  }
}

export const activeDectiveUserFail = (data) => {
  return {
    type: ACTIVE_DEACTIVE_USER_FAIL,
    payload: data
  }
}

