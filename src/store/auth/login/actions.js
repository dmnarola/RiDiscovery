import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  SOCIAL_LOGIN,
  LOGIN_FAIL,
  LOGOUT_USER_FAIL,
  VERIFY_TANENT,
  VERIFY_TANENT_SUCCESS,
  VERIFY_TANENT_FAIL
} from "./actionTypes"

export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history },
  }
}

export const loginSuccess = resp => {
  return {
    type: LOGIN_SUCCESS,
    payload: resp,
  }
}

export const loginFail = resp => {
  return {
    type: LOGIN_FAIL,
    payload: resp,
  }
}

export const logoutUser = history => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  }
}

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  }
}

export const logoutUserFail = () => {
  return {
    type: LOGOUT_USER_FAIL,
    payload: {},
  }
}

export const verifyTanent = (data) => {
  return {
    type: VERIFY_TANENT,
    payload: data,
  }
}

export const verifyTanentSuccess = resp => {
  return {
    type: VERIFY_TANENT_SUCCESS,
    payload: resp,
  }
}

export const verifyTanentFail = resp => {
  return {
    type: VERIFY_TANENT_FAIL,
    payload: resp,
  }
}

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  }
}

export const socialLogin = (data, history, type) => {
  return {
    type: SOCIAL_LOGIN,
    payload: { data, history, type },
  }
}
